# filestack-react Next.js 14 example

App Router smoke-test app for verifying `filestack-react` works under Next.js
14 + React Server Components. Sibling examples: [example/](../example/) (CRA),
[vite-example/](../vite-example/) (Vite SPA),
[remix-example/](../remix-example/) (Remix SSR).

## Setup

Build the library first so the `file:..` dependency resolves to the latest `dist/`:

```bash
# from the repo root
npm install
npm run build

# then in this directory
cd nextjs-14-example
npm install
npm run dev
```

Open http://localhost:3003/.

## What this verifies

- The `'use client'` directive on each picker file (`picker-overlay.jsx`,
  `picker-inline.jsx`, `picker-drop-pane.jsx`, `use-picker.jsx`,
  `filestack-provider.jsx`) is honored by Next.js' RSC compiler — the
  pickers cross the server/client boundary without manual annotation in
  consumer code.
- `next/dynamic` with `ssr: false` keeps the browser-only `filestack-js`
  module out of the server bundle, avoiding the `ERR_REQUIRE_ESM` crash
  that bare imports trigger (see [../remix-example/README.md](../remix-example/README.md)
  for the same issue surfaced in Remix).
- `useId()`-based picker container ids produce no hydration mismatch
  warnings.

## The recommended import pattern

A Server Component (`app/page.jsx`) can import a Client Component
(`app/pickers.jsx`) that owns the picker imports. Inside the client
component, wrap each picker in `next/dynamic` with `ssr: false`:

```jsx
'use client';
import dynamic from 'next/dynamic';

const PickerInline = dynamic(
  () => import('filestack-react').then((m) => m.PickerInline),
  { ssr: false }
);
```

This keeps `filestack-js` out of *both* the server bundle and the SSR
prerender pass, so the page streams from the server cleanly and the
picker mounts only on the client.
