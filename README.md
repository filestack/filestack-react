[![NPM Version](https://img.shields.io/badge/npm-1.3.8-red.svg)](https://www.npmjs.com/package/filestack-react)
[![coverage](https://img.shields.io/badge/coverage-100%25-red.svg)](https://www.npmjs.com/package/filestack-react)
[![Package Quality](http://npm.packagequality.com/shield/react-filestack.svg)](http://packagequality.com/#?package=react-filestack)

# Filestack React
<a href="https://www.filestack.com"><img src="https://filestack.com/themes/filestack/assets/images/press-articles/color.svg" align="left" hspace="10" vspace="6"></a> This is the official React component for Filestack API and content management system that makes it easy to add powerful file uploading and transformation capabilities to any web or mobile application.

## Resources

* [Filestack](https://www.filestack.com)
* [Documentation](https://www.filestack.com/docs)
* [Live Demo](https://www.zerocho.com/portfolio/ReactFilestack)
* [NPM](https://npmjs.com/package/filestack-react)
* [Tutorial](https://blog.filestack.com/product-updates/react-package/)

## Installing

Install ``filestack-react`` through npm

```shell
npm install filestack-react
```
or
```shell
yarn add filestack-react
```
## Import
```javascript
var ReactFilestack = require('filestack-react');
```
In ES2015
```javascript
import ReactFilestack from 'filestack-react';
```

## Import with filestack-js client
```javascript
import ReactFilestack, { client } from 'filestack-react';
```
*client is available from version 1.3.4*

## Usage
You should register [Filestack](https://www.filestack.com) website and get an **API key** first!

**1. Custom Designed button**
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  buttonText="Click me"
  buttonClass="classname"
  options={options}
  onSuccess={this.yourCallbackFunction}
/>
```

**2. Custom render**
```jsx
<ReactFilestack
  apikey={apikey}
  options={options}
  onSuccess={onSuccess}
  onError={onError}
  render={({ onPick }) => (
    <div>
      <strong>Find an avatar</strong>
      <button onClick={onPick}>Pick</button>
    </div>
  )}
/>
```

**3. Other modes**
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  mode="upload"
  options={options}
  onSuccess={onSuccess}
/>
```

Available modes:
* [upload](https://www.filestack.com/docs/javascript-api/upload-v3)
* [transform](https://www.filestack.com/docs/javascript-api/transform-v3)
* [retrieve](https://www.filestack.com/docs/javascript-api/retrieve-v3)
* [storeUrl](https://www.filestack.com/docs/javascript-api/store-url-v3)
* [metadata](https://www.filestack.com/docs/javascript-api/metadata-v3)
* [remove](https://www.filestack.com/docs/javascript-api/remove-v3)

Define your own options object and callback function, connect them to the component and get the result from Filestack:


```javascript
const options = {
  accept: 'image/*',
  maxFiles: 5,
  storeTo: {
    location: 's3',
  },
};

onSuccess(result) {
  // handle result here
}
```

**Do you prefer a link instead of a button?**

You can pass a custom prop **link**.
```jsx
<ReactFilestack
  apikey={YOUR_API_KEY}
  options={options}
  onSuccess={this.yourCallbackFunction}
  link
/>
```

**Filestack-js client**

You can also import the official client and decouple its React component ReactFilestack.
However, you will need to initialize it with the API key and optional security options.

```javascript
import { client } from 'filestack-react';
const filestack = client.init('YOUR_API_KEY', security);
```

## Examples

You can find the examples of using Pick in ``/examples/demo``.

Run

```javascript
yarn start
```

and connect to localhost:8080.

To try different functions go to ``/examples/demo2`` and follow the same steps to run it.

![filestack](https://cloud.githubusercontent.com/assets/10962668/23750309/ac3e1080-050f-11e7-922d-ee9deb8251a3.png)


## Available Props
[Official Filestack Documentation](https://filestack.com/docs)

> ### apikey
> **required**, string. An API key for Filestack.

> ### mode
> **optional**, string. **default** 'pick'. Can be one of pick, upload, transform, retrieve, metadata, remove.

> ### file
> **optional** object. use it to insert a file object in upload mode.

> ### onSuccess
> **optional** function. Handle the results after a successful response.

> ### onError
> **optional** function. Handle errors.

> ### options
> **optional** object. Detailed options to customize the mode behavior.
>
> See Javascript API from  the[official documentation](https://filestack.com/docs).

> ### security
> **optional** object. If you have security enabled, you will need to initialize
the client with a valid Filestack policy and signature in order to perform the requested call.

> ### buttonText
> **optional** string. When using a custom button, you can set the text.

> ### buttonClass
> **optional** string. When using custom button, you can set className to style it.

> ### cname
> **optional** Custom domain to use for all URLs. This requires the custom CNAME feature on your Filestack app.

## Versioning
Filestack React follows the [Semantic Versioning](http://semver.org/).

## Issues
If you have problems, please create a [Github Issue](https://github.com/filestack/filestack-react/issues).

## Wanna Contribute?
Please see [CONTRIBUTING.md](https://github.com/filestack/filestack-react/blob/master/CONTRIBUTING.md) for details.

## Contributors
- Zero Cho
- [Samuele Zaza](https://github.com/samuxyz)
