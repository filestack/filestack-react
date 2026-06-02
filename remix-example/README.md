# filestack-react Remix example

SSR smoke-test app for verifying `filestack-react` works under Remix + Vite.
The sibling [example/](../example/) uses Create React App and
[vite-example/](../vite-example/) uses Vite SPA.

## Setup

Build the library first so the `file:..` dependency resolves to the latest `dist/`:

```bash
# from the repo root
npm install
npm run build

# then in this directory
cd remix-example
npm install
npm run dev
```

Open the URL Remix prints (defaults to http://localhost:3002).

## What this verifies

- Remix's SSR pass renders the route without crashing, even though the
  underlying `filestack-js` module is browser-only and currently fails to
  evaluate under Node (it `require()`s the now-ESM-only `file-type` package,
  producing `ERR_REQUIRE_ESM`).
- The `'use client'` directives shipped in `dist/` are tolerated by Remix's
  Vite plugin.
- The `useId()`-based container ids in `usePicker` produce no hydration
  mismatch warnings on the client.

## The SSR-safe import pattern

A static `import { PickerInline } from 'filestack-react'` at the top of a Remix
route will crash SSR — see [app/routes/_index.jsx](app/routes/_index.jsx). The
working pattern is a dynamic `import()` inside `useEffect`, which only fires on
the client:

```jsx
const [pickers, setPickers] = useState(null);

useEffect(() => {
  import('filestack-react').then(setPickers);
}, []);

return pickers ? <pickers.PickerInline apikey={APIKEY} /> : null;
```

This keeps `filestack-js` out of the server module graph entirely. Remix users
who want a cleaner ergonomic can wrap the pickers in a `*.client.jsx`-style
component or `remix-utils`' `<ClientOnly>` and keep the same constraint.
