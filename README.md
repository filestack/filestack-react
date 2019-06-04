<h1 align="center">
  filestack-react
</h1>
<p align="center">
  React component which allow you to easily integrate powerful filestack-api into your app.
</p>
<p align="center">
  <a href="https://npmjs.com/package/filestack-react">
    <img src="https://img.shields.io/npm/v/filestack-react.svg" />
  </a>
  <img src="https://img.shields.io/bundlephobia/min/filestack-react.svg" />
</p>
<hr>

**Table of Contents**
- [Overview](#overview)
- [Usage](#usage)
  - [Props](#props)
  - [Examples](#examples)
  - [filestack-js Client](#filestack-js-client)
  - [SSR](#ssr)
  - [Migration from 1.x.x and 2.x.x](#migration-from-1.x.x-and-2.x.x)
- [Live demo](#live-demo)
- [Development](#development)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Future](#future)

## Overview
filestack-react is a kind of wrapper on [filestack-js](https://github.com/filestack/filestack-js) sdk which allow you to integrate with filestack service in just a few lines of code. Almost all you can do with [filestack-js](https://filestack.github.io/filestack-js/index.html) you can do with this component.

## Usage
Install it through NPM
```bash
npm install filestack-react
```
then just insert into your app
```jsx
import ReactFilestack from 'filestack-react';

<ReactFilestack
  apikey={YOUR_API_KEY}
  onSuccess={(res) => console.log(res)}
/>
```
### Props
| Key                              | Type          | Required | Default                       | Description                                                                                                                                                                                                |
|----------------------------------|---------------|----------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apikey                           | String        | true     |                               | Filestack api key                                                                                                                                                                                          |
| action                           | String        | false    | 'pick'                        | A method from [Client](https://filestack.github.io/filestack-js/classes/client.html) class. One of 'transform','retrieve','metadata','storeUrl','upload','remove','pick','removeMetadata','preview','logout' |
| actionOptions                    | Object        | false    |                               | An action (client method) specific options object eg. PickerOptions, TransformOptions etc.                                                                                                                  |
| componentDisplayMode             | Object        |          |                               | Determines how will be wrapper component displayed                                                                                                                                                         |
| componentDisplayMode.type        | String        | false    | 'button'                      | It can be 'button', 'link' or 'immediate'                                                                                                                                                                  |
| componentDisplayMode.customText  | String        | false    | 'Pick file'                    | If type is 'button' or 'link' you can set text for it                                                                                                                                                      |
| componentDisplayMode.customClass | String        | false    | 'filestack-react'              | If type is 'button' or 'link' you can set class for it                                                                                                                                                     |
| onSuccess                        | Function      | false    | result => console.log(result) | A function to be called after successful completed action                                                                                                                                                  |
| onError                          | Function      | false    | error => console.error(error) | A function to be called when error occurs                                                                                                                                                                  |
| clientOptions                    | Object        |          |                               | Filestack client options used for an every action                                                                                                                                                          |
| clientOptions.cname              | String        | false    |                               | Check [cname](https://filestack.github.io/filestack-js/interfaces/clientoptions.html#cname)                                                                                                                  |
| clientOptions.security           | [Security](https://filestack.github.io/filestack-js/interfaces/security.html) | false    |                               | Check [security](https://filestack.github.io/filestack-js/interfaces/clientoptions.html#security)                                                                                                            |
| clientOptions.sessionCache       | Boolean       | false    |                               | Check [sessionCache](https://filestack.github.io/filestack-js/interfaces/clientoptions.html#sessioncache)                                                                                                    |
| file                              | Object        | false    |                               | Use it to insert a file object for 'upload' action                                                                                                                                                          |
| source                           | String        | false    |                               | Use it to pass for some actions handle or external url                                                                                                                                                     |
| customRender                     | Function      | false    |                               | Use it if you need custom html structure                                                                                                                                                                   |

### Examples
**Picker with custom designed button**
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  actionOptions={PickerOptions}
  componentDisplayMode={{
      type: 'button',
      customText: 'Click here to open picker',
      customClass: 'some-custom-class'
  }}
  onSuccess={this.yourCallbackFunction}
/>
```

**Picker with custom wrapper**
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  actionOptions={PickerOptions}
  customRender={({ onPick }) => (
    <div>
      <strong>Find an avatar</strong>
      <button onClick={onPick}>Pick</button>
    </div>
  )}
  onSuccess={this.yourCallbackFunction}
/>
```

**Show picker directly after component is mounted**
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  componentDisplayMode={{
    type: 'immediate'
  }}/>
```

**Show picker directly and embed it inside specific container**
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  componentDisplayMode={{
    type: 'immediate'
  }}
  actionOptions={{
    displayMode: "inline",
    container: "embedded"
  }}/>
```

**Transformation of external url with security**
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  componentDisplayMode={{
    type: 'immediate'
  }}
  action='transform'
  actionOptions= {{
    resize: {
      width: 250
    },
    flip: true
  }}
  clientOptions={{
    security: {
      policy: 'YOUR_POLICY',
      signature: 'YOUR_SIGNATURE'
    }
  }}
  source='https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg'
  onSuccess={(res) => console.log(res)}/>
```

### filestack-js Client
If you need to use Client just try
```jsx
import ReactFilestack, { client } from 'filestack-react';
```

### SSR
If you need to use filestack-react with SSR project or site generators like Gatsby check some workarounds in this issues
<br>
[issue57](https://github.com/filestack/filestack-react/issues/57)
<br>
[issue65](https://github.com/filestack/filestack-react/issues/65)

### Migration from 1.x.x and 2.x.x
One of the changes introduced in the new version are  rethinked props that the component accepts, so that the use of the component is as straightforward as possible.
Below you will find information about what happened to each of the options available in 2.x.x :

| 2.x.x          | 3.0.0                            | Comment                                                                       |
|----------------|----------------------------------|-------------------------------------------------------------------------------|
| apikey         | apikey                           |                                                                               |
| mode           | action                           |                                                                               |
| options        | actionOptions                    | We want to emphasize that this option is associated with 'action'             |
| preload        | N/A                              | Now, component is at default preloading neccessary js assets, styles, images  |
| file            | file                              |                                                                               |
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
https://codepen.io/Filestack/pen/KEpVdR

## Development
The whole componenst is located inside src/ReactFilestack.jsx

After you add some changes just type
```
npm run build
```

Be sure that your change doesn't break existing tests and are compatible with linter
```
npm run test

npm run lint
```

## Documentation
You can find info about avalaible options for actions (Client class methods) in
[https://filestack.github.io/filestack-js/](https://filestack.github.io/filestack-js/)

## Contribution
Any your contributions or ideas are more than welcome.
Please consider that we follow the conventional commits specification to ensure consistent commit messages and changelog formatting.

## Future

Current ideas:
- Better support for SSR, static site generator and isomorphic apps
