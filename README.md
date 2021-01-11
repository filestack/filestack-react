<p align="center"><img src="logo.svg" align="center" width="80"/></p>
<h1 align="center">
  filestack-react
</h1>
<p align="center">
  React component which allow you to easily integrate powerful filestack-api into your app.
</p>
<p align="center">
  <a href="https://travis-ci.org/filestack/filestack-react">
    <img src="https://travis-ci.org/filestack/filestack-react.svg?branch=master" />
  </a>
  <a href="https://npmjs.com/package/filestack-react">
    <img src="https://img.shields.io/npm/v/filestack-react.svg" />
  </a>
  <img src="https://img.shields.io/bundlephobia/min/filestack-react.svg" />
  <br>
  <img src="https://badges.herokuapp.com/browsers?labels=none&googlechrome=latest&firefox=latest&microsoftedge=latest&iexplore=11&safari=latest&iphone=latest" />
</p>
<hr>

**Table of Contents**
- [Overview](#overview)
- [Usage](#usage)
  - [Props](#props)
  - [Examples](#examples)
  - [filestack-js Client](#filestack-js-client)
  - [SSR](#ssr)
  - [Migration from 3.x.x and 4.x.x](#migration-from-3xx-and-4xx)
  - [Migration from 1.x.x and 2.x.x](#migration-from-1xx-and-2xx)
- [Live demo](#live-demo)
- [Development](#development)
- [Documentation](#documentation)
- [Contribution](#contribution)
- [Future](#future)

## Overview
filestack-react is a wrapper on [filestack-js](https://github.com/filestack/filestack-js) sdk which allow you to integrate with Filestack service in just a few lines of code. Almost all you can do with [filestack-js](https://filestack.github.io/filestack-js/index.html) you can do with this component.

## Usage
Install it through NPM
```bash
npm install filestack-react
```
then just insert into your app
```jsx
import { PickerOverlay } from 'filestack-react';

<PickerOverlay
  apikey={YOUR_API_KEY}
  onSuccess={(res) => console.log(res)}
  onUploadDone={(res) => console.log(res)}
/>
```
### Props
| Key                              | Type          | Required | Default                       | Description                                                                                                                                                                                                |
|----------------------------------|---------------|----------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apikey                           | String        |  true    |                               | Filestack api key                                                                                                                                                                                          |
| clientOptions                    | Object        |  false   |                               | https://filestack.github.io/filestack-js/interfaces/clientoptions.html                                                                                                                                                          |
| pickerOptions                    | Object        |  false   |                               | https://filestack.github.io/filestack-js/interfaces/pickeroptions.html                                                                                                                                                          |
| @deprecated onSuccess            | Function      |  false   | result => console.log(result) |  A function to be called after successful completed action                                                                                                                                                  |
| onUploadDone                     | Function      |  false   | result => console.log(result) | Called when all files have been uploaded                                                                                                                                                  |
| onError                          | Function      |  false   | error => console.error(error) | A function to be called when error occurs                                                                                                                                                                  |
| onError                          | Function      |  false   | error => console.error(error) | A function to be called when error occurs                                                                                                                                                                  |

### Examples
**Render basic Overlay Picker**
```jsx
<PickerOverlay apikey='YOUR_APIKEY'/>
```
**Render basic Inline Picker**
```jsx
<PickerInline apikey='YOUR_APIKEY'/>
```
**Render basic Drop Pane Picker**
```jsx
<PickerDropPane apikey='YOUR_APIKEY'/>
```

**Show picker directly and embed it inside specific container**
```jsx
<PickerInline apikey='YOUR_APIKEY'><div className="your-container"></div></PickerInline>
```

### filestack-js Client
If you need to use Client just try
```jsx
import { client } from 'filestack-react';
```

### SSR
If you need to use filestack-react with SSR project or site generators like Gatsby check some workarounds in this issues
<br>
[issue57](https://github.com/filestack/filestack-react/issues/57)
<br>
[issue65](https://github.com/filestack/filestack-react/issues/65)

### Migration from 3.x.x and 4.x.x

| 3.x.x          | 4.0.0                            | Comment                                                                       |
|----------------|----------------------------------|-------------------------------------------------------------------------------|
| apikey         | apikey                           |                                                                               |
| actionOptions  | pickerOptions                    | We want to be consistent with other filestack libs                            |
| clientOptions  | clientOptions                    |                                                                               |
| onSuccess      | onSuccess                        |                                                                               |
| onError        | onError                          |                                                                               |
| N/A            | children                         | Children prop will be used now in case you'll want to use specific container  |
| action         | N/A                              | Default picker action will be 'pick' always                                   |
| file           | N/A                              | Removed                                                                       |
| source         | N/A                              | Removed                                                                       |
| customRender   | N/A                              | Removed, from now on clients will be responsible for rendering                |
| componentDisplayMode   | N/A                      | Removed, from now on clients will be responsible for rendering                |

### Migration from 1.x.x and 2.x.x
One of the changes introduced in the new version are rethinked props that the component accepts, so that the use of the component is as straightforward as possible.
Below you will find information about what happened to each of the options available in 2.x.x :

| 2.x.x          | 3.0.0                            | Comment                                                                       |
|----------------|----------------------------------|-------------------------------------------------------------------------------|
| apikey         | apikey                           |                                                                               |
| mode           | action                           |                                                                               |
| options        | actionOptions                    | We want to emphasize that this option is associated with 'action'             |
| preload        | N/A                              | Now, component is at default preloading necessary js assets, styles, images  |
| file           | file                             |                                                                               |
| onSuccess      | onSuccess                        |                                                                               |
| onError        | onError                          |                                                                               |
| options.handle | source                           | Handle or url used by specific action is now stored in separate prop           |
| options.url    | source                           | Handle or url used by specific action is now stored in separate prop           |
| security       | clientOptions.security           | Options used to initialize filestack client are now grouped in ‘clientOptions’ |
| buttonText     | componentDisplayMode.customText  | Use componentDisplayMode option (see examples)                                |
| buttonClass    | componentDisplayMode.customClass | Use componentDisplayMode option (see examples)                                |
| cname          | clientOptions.cname              | Options used to initialize filestack client are now grouped in ‘clientOptions’ |
| sessionCache   | clientOptions.sessionCache       | Options used to initialize filestack client are now grouped in ‘clientOptions’ |
| render         | customRender                     |                                                                               |
| children       | N/A                              | Use customRender instead                                                      |


## Live demo
Check demo at codepen
https://codepen.io/Filestack/pen/KEpVdR - needs to be updated for 4.0 version

## Development
All components are located inside src/picker/

After you add some changes just type

```
npm run build
```

Be sure that your change doesn't break existing tests and are compatible with linter

```
npm run test
```

## Documentation
You can find info about available options for actions (Client class methods) in
[https://filestack.github.io/filestack-js/](https://filestack.github.io/filestack-js/)

## Contribution
Any your contributions or ideas are more than welcome.
Please consider that we follow the conventional commits specification to ensure consistent commit messages and changelog formatting.

## Future

Current ideas:
- Better support for SSR, static site generator and isomorphic apps
