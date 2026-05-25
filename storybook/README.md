# filestack-react Storybook

Self-contained Storybook subproject for the `filestack-react` library. Stories
import the library via the package name `filestack-react`, but a Vite alias in
[`.storybook/main.js`](./.storybook/main.js) redirects that import to
`../src/index.js` — so edits to the library source hot-reload here without
needing to rebuild `dist/` in the parent.

## Requirements

Storybook 10 requires Node `20 || >=22`. The parent repo's `.nvmrc` pins
`v20.10.0`, which satisfies that — use `nvm use` at the repo root before
running anything in here.

## Install & run

```bash
cd storybook
npm install
npm run storybook           # dev server on http://localhost:6006
npm run build-storybook     # static build → storybook-static/
```

## What's inside

```
storybook/
  .storybook/
    main.js        # Storybook config + Vite alias to ../src
    preview.js     # global parameters (background backgrounds, controls)
  stories/
    Introduction.mdx
    PickerOverlay.stories.jsx
    PickerInline.stories.jsx
    PickerDropPane.stories.jsx
    usePicker.stories.jsx           # hook demo (internal API)
    FilestackProvider.stories.jsx   # context demo
```

## Using the demos

All stories default `apikey` to `YOUR_APIKEY`. The picker will fail to
initialise with the placeholder and fire `onError` — paste a real key from
your [Filestack dashboard](https://dev.filestack.com/) into the Controls panel
to make the picker actually run.

`onUploadDone` and `onError` are wired to the **Actions** panel; the toolbar
**backgrounds** toggle switches the canvas between light and dark page
backgrounds.

## Deploy to GitHub Pages

Not wired up in this repo yet. When ready, the static output from
`npm run build-storybook` (under `storybook-static/`) is what you'd publish.
