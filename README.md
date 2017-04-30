# React Filestack
react component for **filestack**

## How to install

**This is for v3 filestack api. If you want to use previous v2 filepicker api, go [here](https://npmjs.com/package/react-filepicker)**

[Live Demo](https://www.zerocho.com/portfolio/ReactFilestack)
[NPM](https://npmjs.com/package/react-filestack)
[Github](https://github.com/filestack/react-filestack)
```shell
npm install react-filestack
```
or
```shell
yarn add react-filestack
```
## Import
```javascript
var ReactFilestack = require('react-filestack');
```
In ES2015
```javascript
import ReactFilestack from 'react-filestack';
```
## Usage
You should register for [Filestack](https://www.filestack.com) and get an **API key** first!

**Custom Designed button**
```jsx
<ReactFilestack apikey={YOUR_API_KEY} buttonText="Click me" buttonClass="classname" options={options} onSuccess={this.yourCallbackFunction} />
```

**Other mode than 'pick'**
```jsx
<ReactFilestack apikey={YOUR_API_KEY} mode="upload" options={options} onSuccess={this.yourCallbackFunction} />
```
Available modes:
* upload
* transform
* retrieve
* storeUrl
* metadata
* remove

make your own options and callback function, connect it to the component and get the results(either fpfiles or blob object)
```javascript
const options = {
  accept: 'image/*',
  fromSources: ['local_file_system', 'defaultfacebook', 'clouddrive']
};
yourCallbackFunction(result) {
  // handle result here
}
```

**Link instead of button**
if you want a custom button to be a link, just put **link** props
```jsx
<ReactFilestack apikey={YOUR_API_KEY} link options={options} onSuccess={this.yourCallbackFunction} />
```

## Result
![filestack](https://cloud.githubusercontent.com/assets/10962668/23750309/ac3e1080-050f-11e7-922d-ee9deb8251a3.png)
Works well with IE...

## Props
[Official Filestack Documentation](https://filestack.com/docs)

> ### apikey
> **required** string. An API key for filestack

> ### mode
> **optional** string. **default** 'pick'. Look supported modes above.

> ### file
> **optional** object. use if you need to insert file object for upload mode.

> ### log
> **optional** object. **default** false. choose whether to console.log filestack process

> ### onSuccess
> **optional** function. get result(fpfiles or blob object) after upload is done.

> ### onError
> **optional** function. send error object as callback parameter

> ### options
> **optional** object. **Detailed options for button. See Javascript API of [official documentation](https://filestack.com/docs). Put everything in it if you think you have to**

> ### security
> **optional** object. If you have security enabled, you will need to initialize
the client with a valid Filestack policy and signature in order to perform the requested call.

> ### buttonText
> **optional** string. When using custom button, you can set your own text.

> ### buttonClass
> **optional** string. When using custom button, you can set className to style it.

## Wanna Contribute?
Please contribute to this package via **Pull Request**, or you can open **Issues**!
```shell
npm install
```
or
```shell
yarn
```
run index.html

## Contributors
- Zero Cho
- [Samuele Zaza](https://github.com/samuxyz)

## License
MIT
