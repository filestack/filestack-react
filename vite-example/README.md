# filestack-react Vite example

Smoke-test app for verifying `filestack-react` works under a Vite + ESM toolchain
(the sibling [example/](../example/) app uses Create React App).

## Setup

Build the library first so the `file:..` dependency resolves to the latest `dist/`:

```bash
# from the repo root
npm install
npm run build

# then in this directory
cd vite-example
npm install
npm run dev
```

Open the URL Vite prints (defaults to http://localhost:3001). The buttons
mount each picker against the public demo API key.

## What this verifies

- ESM consumption of `dist/filestack-react.modern.js` via Vite's dev server.
- `'use client'` directives don't trip Vite's React plugin.
- `useId()`-based picker container ids hydrate cleanly under Vite's HMR.
