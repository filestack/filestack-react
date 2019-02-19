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
    options: {
      onOpen() {
        console.timeEnd();
      },
    },
    security: null,
    children: null,
    render: null,
    cname: null,
    sessionCache: false,
    pickerPreload: false,
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
    pickerPreload: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const {
      apikey,
      security,
      cname,
      sessionCache,
      pickerPreload,
    } = this.props;
    console.log('###2', pickerPreload)
    const client = filestack.init(apikey, {
      security,
      cname,
      sessionCache,
    });

    this.state = {
      client,
      picker: pickerPreload ? this.initPicker(client) : null,
    };

    this.onFinished = this.onFinished.bind(this);
    this.onFail = this.onFail.bind(this);
    this.initPicker = this.initPicker.bind(this);
    this.callPicker = this.callPicker.bind(this);
  }

  initPicker = (client) => {
    //if client
    const { options } = this.props;
    return client.picker({ ...options, onUploadDone: this.onFinished });
  }

  onClickPick = (event) => {
    console.time();
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
      pickerPreload,
    } = this.props;

    this.callPicker(mode, options, file, security)
      .then(this.onFinished)
      .catch(this.onFail);
  };

  onFinished = (result) => {
    const { onSuccess } = this.props;
    if (typeof onSuccess === 'function') {
      onSuccess(result);
    } else {
      console.log(result);
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

  callPicker = (mode, options, file, security) => {
    const { picker } = this.state;
    const { url, handle } = options;
    delete options.handle;
    delete options.url;

    if (mode === 'transform') {
      return new Promise((resolve, reject) => {
        try {
          resolve(picker.transform(handle, options));
        } catch (err) {
          reject(err);
        }
      });
    } else if (mode === 'retrieve') {
      return picker.retrieve(handle, options);
    } else if (mode === 'metadata') {
      return picker.metadata(handle, options);
    } else if (mode === 'storeUrl') {
      return picker.storeURL(url, options);
    } else if (mode === 'upload') {
      return picker.upload(file, options);
    } else if (mode === 'remove') {
      return picker.remove(handle, security);
    }

    return new Promise(() => {
      console.log('###5', this.state);
      if (this.props.pickerPreload) {
        console.log('###6');
        picker.open();
      } else {
        console.log('###7');
        this.initPicker(this.state.client).open();
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
