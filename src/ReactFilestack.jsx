import React, { Component } from 'react';
import * as filestack from 'filestack-js';
import PropTypes from 'prop-types';

class ReactFilestack extends Component {
  static defaultProps = {
    file: null,
    link: false,
    buttonText: 'Pick file',
    buttonClass: '',
    onSuccess: result => console.log(result),
    onError: error => console.error(error),
    mode: 'pick',
    options: {},
    security: null,
    children: null,
    render: null,
    cname: null,
    sessionCache: false,
    preload: false,
  };

  static propTypes = {
    file: PropTypes.objectOf(PropTypes.any),
    apikey: PropTypes.string.isRequired,
    link: PropTypes.bool,
    mode: PropTypes.string,
    buttonText: PropTypes.string,
    buttonClass: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    options: PropTypes.objectOf(PropTypes.any),
    security: PropTypes.objectOf(PropTypes.any),
    children: PropTypes.node,
    render: PropTypes.func,
    cname: PropTypes.string,
    sessionCache: PropTypes.bool,
    preload: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const {
      apikey,
      security,
      cname,
      sessionCache,
      preload,
      options,
    } = this.props;
    const client = filestack.init(apikey, {
      security,
      cname,
      sessionCache,
    });
    this.state = {
      client,
      picker: preload ? client.picker({ ...options, onUploadDone: this.onFinished }) : null,
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
      options,
      mode,
      file,
      security,
      preload,
    } = this.props;

    this.callPicker(mode, options, file, security, preload, client, picker)
      .then(this.onFinished)
      .catch(this.onFail);
  };

  onFinished = (result) => {
    const { onSuccess } = this.props;
    if (typeof onSuccess === 'function' && result) {
      onSuccess(result);
    }
  };

  onFail = (error) => {
    const { onError } = this.props;
    if (typeof onError === 'function') {
      onError(error);
    } else {
      console.error(error);
    }
  };

  callPicker = (mode, options, file, security, preload, client, picker) => {
    const { url, handle } = options;
    delete options.handle;
    delete options.url;

    if (mode === 'transform') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.transform(handle, options));
        } catch (err) {
          reject(err);
        }
      });
    } else if (mode === 'retrieve') {
      return client.retrieve(handle, options);
    } else if (mode === 'metadata') {
      return client.metadata(handle, options);
    } else if (mode === 'storeUrl') {
      return client.storeURL(url, options);
    } else if (mode === 'upload') {
      return client.upload(file, options);
    } else if (mode === 'remove') {
      return client.remove(handle, security);
    }

    return new Promise((resolve) => {
      if (preload) {
        picker.open();
        resolve();
      } else {
        client.picker({ ...options, onUploadDone: resolve }).open();
      }
    });
  };

  render () {
    const {
      buttonClass, buttonText, link, children, render: CustomRender,
    } = this.props;
    if (CustomRender) {
      return (
        <CustomRender onPick={this.onClickPick} />
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
