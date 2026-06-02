#!/usr/bin/env node
/**
 * Prepend the `'use client'` directive to the bundled entry files.
 *
 * microbundle/Rollup strips module-level directives when it merges the
 * `src/*.tsx` modules into a single bundle (the "Module level directives
 * cause errors when bundled, 'use client' was ignored" warning). Without the
 * directive in `dist/`, the published components can only be imported from
 * within a consumer's own client component — importing them directly into a
 * Next.js App Router Server Component would fail. Re-adding it here restores
 * that boundary so the bundle is usable from either context.
 *
 * Targets are read from package.json `main`/`module` so this stays in sync
 * with the build output. Safe to run repeatedly (skips files that already
 * start with the directive).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const DIRECTIVE = "'use client';";

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

const targets = [pkg.main, pkg.module].filter(Boolean);

for (const rel of targets) {
  const file = resolve(root, rel);
  const code = readFileSync(file, 'utf8');

  // Already present (allowing an optional leading BOM / whitespace)?
  if (/^\s*['"]use client['"];?/.test(code)) {
    console.log(`use-client: already present in ${rel}`);
    continue;
  }

  writeFileSync(file, `${DIRECTIVE}\n${code}`);
  console.log(`use-client: prepended to ${rel}`);
}
