import React, { Component } from 'react';
import * as filestack from 'filestack-js';
import PropTypes from 'prop-types';

class ReactFilestack extends Component {
  // static defaultProps = {
  //   file: null,
  //   link: false,
  //   buttonText: 'Pick file',
  //   buttonClass: '',
  //   onSuccess: result => console.log(result),
  //   onError: error => console.error(error),
  //   mode: 'pick',
  //   options: {},
  //   security: null,
  //   children: null,
  //   render: null,
  //   cname: null,
  //   sessionCache: false,
  //   preload: false,
  // };

  static defaultProps = {
    action: 'pick',
    pickerDisplayMode: 'direct',
    pickerOptions: {},
    onUploadSuccess: result => console.log(result),
    onUploadError: error => console.error(error),
    clientOptions: {},
    file: null,
    customRender: null,
    children: null,
  };

  static propTypes = {
    apikey: PropTypes.string.isRequired,
    action: PropTypes.oneOf(['transform', 'retrieve', 'metadata', 'storeUrl', 'upload', 'remove', 'pick']),
    // FIXME
    pickerDisplayMode: PropTypes.oneOf(['direct', {
      type: PropTypes.oneOf(['button', 'link']),
      text: PropTypes.string,
      class: PropTypes.string,
      preload: PropTypes.bool,
    }]),
    pickerOptions: PropTypes.objectOf(PropTypes.any),
    onUploadSuccess: PropTypes.func,
    onUploadError: PropTypes.func,
    // FIXME
    clientOptions: PropTypes.shape({
      cname: PropTypes.string,
      security: PropTypes.objectOf(PropTypes.any),
      sessionCache: PropTypes.bool,
    }),
    file: PropTypes.objectOf(PropTypes.any),
    customRender: PropTypes.func,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    const {
      apikey,
      security,
      cname,
      sessionCache,
      preload,
      pickerOptions,
    } = this.props;
    const client = filestack.init(apikey, {
      security,
      cname,
      sessionCache,
    });
    this.state = {
      client,
      picker: preload ? client.picker({ ...pickerOptions, onUploadDone: this.onFinished }) : null,
    };

    this.onFinished = this.onFinished.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  onClickPick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const {
      client,
      picker,
    } = this.state;

    const {
      pickerOptions,
      action,
      file,
      security,
      preload,
    } = this.props;

    this.callPicker(action, pickerOptions, file, security, preload, client, picker)
      .then(this.onFinished)
      .catch(this.onFail);
  };

  onFinished = (result) => {
    const { onUploadSuccess } = this.props;
    if (typeof onUploadSuccess === 'function' && result) {
      onUploadSuccess(result);
    }
  };

  onFail = (error) => {
    const { onUploadError } = this.props;
    if (typeof onUploadError === 'function') {
      onUploadError(error);
    } else {
      console.error(error);
    }
  };

  callPicker = (action, pickerOptions, file, security, preload, client, picker) => {
    const { url, handle } = pickerOptions;
    delete pickerOptions.handle;
    delete pickerOptions.url;

    if (action === 'transform') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.transform(handle, pickerOptions));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'retrieve') {
      return client.retrieve(handle, pickerOptions);
    } else if (action === 'metadata') {
      return client.metadata(handle, pickerOptions);
    } else if (action === 'storeUrl') {
      return client.storeURL(url, pickerOptions);
    } else if (action === 'upload') {
      return client.upload(file, pickerOptions);
    } else if (action === 'remove') {
      return client.remove(handle, security);
    }

    return new Promise((resolve) => {
      if (preload) {
        picker.open();
        resolve();
      } else {
        client.picker({ ...pickerOptions, onUploadDone: resolve }).open();
      }
    });
  };

  render () {
    const {
      buttonClass, buttonText, link, children, customRender,
    } = this.props;
    if (customRender) {
      return (
        <customRender onPick={this.onClickPick} />
      );
    }
    const Tag = link ? 'a' : 'button';
    return (
      <Tag
        name="filestack"
        onClick={this.onClickPick}
        className={buttonClass}
      >
        {children || buttonText}
      </Tag>
    );
  }
}

export default ReactFilestack;
