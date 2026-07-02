<p align="center"><img src="logo.svg" align="center" width="80"/></p>
<h1 align="center">filestack-react</h1>
<p align="center">
  Official React components for <a href="https://www.filestack.com">Filestack</a> — upload, transform, and deliver files with a few lines of JSX.
</p>
<p align="center">
  <a href="https://github.com/filestack/filestack-react/actions/workflows/test.yml">
    <img src="https://github.com/filestack/filestack-react/actions/workflows/test.yml/badge.svg" alt="Tests" />
  </a>
  <a href="https://npmjs.com/package/filestack-react">
    <img src="https://img.shields.io/npm/v/filestack-react.svg" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/types-included-blue.svg" alt="TypeScript types included" />
  <img src="https://img.shields.io/bundlephobia/min/filestack-react.svg" alt="bundle size" />
</p>
<hr>

**Contents**
- [Overview](#overview)
- [Requirements](#requirements)
- [Install](#install)
- [Quick start](#quick-start)
- [Components](#components)
- [Props](#props)
- [FilestackProvider](#filestackprovider)
- [TypeScript](#typescript)
- [The filestack-js client](#the-filestack-js-client)
- [Server-side rendering & frameworks](#server-side-rendering--frameworks)
- [Migrating from v6](#migrating-from-v6)
- [Older migrations](#older-migrations)
- [Development](#development)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Overview

`filestack-react` is a thin wrapper around [filestack-js](https://github.com/filestack/filestack-js). It gives you three picker components — overlay, inline, and drop pane — plus an optional context provider, and re-exports the full filestack-js client if you need the lower-level API. Anything you can do with filestack-js, you can do here.

The library is written in TypeScript and ships its own `.d.ts` files, so there's no `@types/filestack-react` to install.

## Requirements

| | Version |
|---|---|
| React / React DOM | `18.3+` or `19` |
| filestack-js | `4.x` — installed by you as a peer dependency (see below) |
| Node (to build/develop) | `18+` |

## Install

filestack-js is a **peer dependency** as of v7, so install both packages:

```bash
npm install filestack-react filestack-js
```

If you skip `filestack-js`, npm will warn about an unmet peer dependency and the picker won't initialize.

## Quick start

```jsx
import { PickerOverlay } from 'filestack-react';

<PickerOverlay
  apikey={YOUR_API_KEY}
  onUploadDone={(res) => console.log(res.filesUploaded)}
/>
```

That's a working uploader. `apikey` is the only thing you have to pass (or set it once on a [`FilestackProvider`](#filestackprovider)).

## Components

All three components take the same props. The only difference is how the picker is presented.

**Overlay** — opens the picker in a modal over your page:

```jsx
<PickerOverlay apikey="YOUR_APIKEY" onUploadDone={handleUploadDone} />
```

**Inline** — renders the picker inside the page. Without a child container it draws a 500px-tall `<div>`:

```jsx
<PickerInline apikey="YOUR_APIKEY" onUploadDone={handleUploadDone} />
```

**Drop pane** — a drag-and-drop target:

```jsx
<PickerDropPane apikey="YOUR_APIKEY" onUploadDone={handleUploadDone} />
```

**Bring your own container.** Pass a single child element and the picker mounts into it (the component clones your element and gives it the id it needs):

```jsx
<PickerInline apikey="YOUR_APIKEY">
  <div className="my-container" style={{ height: 400 }} />
</PickerInline>
```

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `apikey` | `string` | Yes\* | — | Your Filestack API key. \*Optional on the component if a [`FilestackProvider`](#filestackprovider) supplies it. |
| `pickerOptions` | `object` | No | `{}` | Passed to `client.picker(...)`. See [PickerOptions](https://filestack.github.io/filestack-js/interfaces/pickeroptions.html). `displayMode` is set for you per component. |
| `clientOptions` | `object` | No | `{}` | Passed to `Filestack(apikey, ...)`. See [ClientOptions](https://filestack.github.io/filestack-js/interfaces/clientoptions.html). |
| `onUploadDone` | `(res: PickerResponse) => void` | No | no-op | Called when all files finish uploading. |
| `onError` | `(err) => void` | No | no-op | Called if `picker.open()` rejects. |
| `onSuccess` | `(res: PickerResponse) => void` | No | no-op | **Deprecated** — use `onUploadDone`. Still works; if both are set, `onUploadDone` is the one that fires. |
| `children` | `ReactElement` | No | — | Optional custom container. Cloned with the generated id so the picker mounts inside it. |

Callbacks are silent by default in v7 — nothing is logged unless you pass a handler.

## FilestackProvider

New in v7. If you use pickers in more than one place, set the shared values once instead of repeating them:

```tsx
import { FilestackProvider, PickerOverlay, PickerInline } from 'filestack-react';

<FilestackProvider apikey={process.env.REACT_APP_FILESTACK_KEY}>
  <PickerOverlay onUploadDone={handleUploadDone} />
  <PickerInline pickerOptions={{ maxFiles: 3 }} />
</FilestackProvider>
```

How values resolve:

- **Scalars** (`apikey`, `onUploadDone`, `onError`, `onSuccess`) — a prop set directly on a picker wins; otherwise the provider's value is used.
- **`pickerOptions` / `clientOptions`** — shallow-merged, with the provider as the base and the component's options on top.

It's entirely opt-in. If you'd rather pass `apikey` to each picker, keep doing that — you don't need the provider.

## TypeScript

The package bundles its own declarations — install it and import, no `@types/*` needed.

```tsx
import {
  PickerOverlay,
  FilestackProvider,
  type PickerOverlayProps,
  type PickerResponse,
  type PickerOptions,
  type ClientOptions
} from 'filestack-react';

const pickerOptions: PickerOptions = { maxFiles: 5, accept: ['image/*'] };
const clientOptions: ClientOptions = { cname: 'cdn.example.com' };

const handleUploadDone = (res: PickerResponse) => {
  res.filesUploaded.forEach((file) => console.log(file.url));
};

const App = () => (
  <FilestackProvider apikey={process.env.REACT_APP_FILESTACK_KEY!}>
    <PickerOverlay
      pickerOptions={pickerOptions}
      clientOptions={clientOptions}
      onUploadDone={handleUploadDone}
      onError={(err) => console.error(err)}
    />
  </FilestackProvider>
);
```

Because `PickerOptions`, `ClientOptions`, and `PickerResponse` come from filestack-js, you get autocomplete on every nested option (`maxFiles`, `accept`, `fromSources`, `transformations`, and the rest).

Every public type is exported from the package root: `PickerBaseProps`, `PickerOverlayProps`, `PickerInlineProps`, `PickerDropPaneProps`, `FilestackProviderProps`, `FilestackContextValue`, and `UsePickerResult`, alongside the upstream filestack-js types.

## The filestack-js client

Need the lower-level SDK? It's re-exported:

```jsx
import { client } from 'filestack-react';

const fsClient = client.init('YOUR_APIKEY');
fsClient.upload(file);
```

## Server-side rendering & frameworks

The picker runs in the browser — it initializes inside `useEffect`, so it never executes during a server render.

**Next.js App Router.** Every component ships with a `'use client'` directive, so you can import them straight into your App Router files without wrapping them yourself:

```tsx
// app/upload/page.tsx
import { PickerOverlay } from 'filestack-react';

export default function UploadPage() {
  return <PickerOverlay apikey={process.env.NEXT_PUBLIC_FILESTACK_KEY!} />;
}
```

**Next.js Pages Router, Gatsby, and other SSG setups.** These generally work as-is. If a build step tries to evaluate the picker on the server, load it client-side only:

```tsx
import dynamic from 'next/dynamic';

const PickerOverlay = dynamic(
  () => import('filestack-react').then((m) => m.PickerOverlay),
  { ssr: false }
);
```

## Migrating from v6

Most v6 apps need two changes: install filestack-js, and (eventually) rename one callback.

1. **Install filestack-js yourself.** It's a peer dependency now:
   ```bash
   npm install filestack-react@7 filestack-js@^4
   ```
2. **Check your React and Node versions** — React 18.3+ or 19, Node 18+. React 16/17 are no longer supported.
3. **Remove `@types/filestack-react`** if you had it — types ship in the package now.
4. **Move off `onSuccess`** when convenient. It still works but is deprecated; `onUploadDone` is the replacement.

| v6 | v7 | Notes |
|---|---|---|
| `apikey`, `pickerOptions`, `clientOptions` | same | Unchanged |
| `onUploadDone`, `onError` | same | Unchanged |
| `onSuccess` | `onUploadDone` | `onSuccess` still works but is deprecated |
| filestack-js bundled as a dependency | filestack-js `^4` peer dependency | Install it in your app |
| React 16/17/18 | React 18.3+ / 19 | |
| plain JavaScript | TypeScript types included | Drop `@types/filestack-react` |

The picker UI itself now comes from filestack-js 4. If you relied on specific 3.x picker behavior, skim the [filestack-js changelog](https://github.com/filestack/filestack-js/blob/master/CHANGELOG.md).

## Older migrations

<details>
<summary>Migrating from 3.x / 4.x</summary>

| 3.x | 4.0.0 | Comment |
|---|---|---|
| apikey | apikey | |
| actionOptions | pickerOptions | Consistent with other Filestack libs |
| clientOptions | clientOptions | |
| onSuccess | onSuccess | |
| onError | onError | |
| N/A | children | Used for a custom container |
| action | N/A | Picker action is always `pick` |
| file | N/A | Removed |
| source | N/A | Removed |
| customRender | N/A | Removed — you render the container |
| componentDisplayMode | N/A | Removed — you render the container |

</details>

<details>
<summary>Migrating from 1.x / 2.x</summary>

| 2.x | 3.0.0 | Comment |
|---|---|---|
| apikey | apikey | |
| mode | action | |
| options | actionOptions | |
| preload | N/A | Assets are preloaded by default |
| onSuccess | onSuccess | |
| onError | onError | |
| security | clientOptions.security | Grouped under `clientOptions` |
| cname | clientOptions.cname | Grouped under `clientOptions` |
| sessionCache | clientOptions.sessionCache | Grouped under `clientOptions` |

</details>

## Development

Components live in `src/picker/`. After making a change:

```bash
npm run build   # bundle
npm run test    # unit tests, lint, and a build check
npm run test:types   # tsc --noEmit
```

## Documentation

Full option reference (client methods, picker options) lives in the filestack-js docs:
[https://filestack.github.io/filestack-js/](https://filestack.github.io/filestack-js/)

## Contributing

Contributions and ideas are welcome. We follow the [Conventional Commits](https://www.conventionalcommits.org/) spec so the changelog stays consistent — please match it in your commit messages.
