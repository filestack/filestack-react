import React, { Component } from 'react';
import * as filestack from 'filestack-js';
import PropTypes from 'prop-types';

class ReactFilestack extends Component {
  static defaultProps = {
    action: 'pick',
    pickerDisplayMode: {
      type: 'immediate',
      customText: 'Pick file',
      customClass: 'filestack-react',
    },
    pickerOptions: {},
    onUploadSuccess: result => console.log(result),
    onUploadError: error => console.error(error),
    clientOptions: {},
    file: null,
    customRender: null,
  };

  static propTypes = {
    apikey: PropTypes.string.isRequired,
    action: PropTypes.oneOf(['transform', 'retrieve', 'metadata', 'storeUrl', 'upload', 'remove', 'pick']),
    pickerDisplayMode: PropTypes.shape({
      type: PropTypes.oneOf(['immediate', 'button', 'link']),
      customText: PropTypes.string,
      customClass: PropTypes.string,
    }),
    pickerOptions: PropTypes.objectOf(PropTypes.any),
    onUploadSuccess: PropTypes.func,
    onUploadError: PropTypes.func,
    clientOptions: PropTypes.shape({
      cname: PropTypes.string,
      security: PropTypes.objectOf(PropTypes.any),
      sessionCache: PropTypes.bool,
    }),
    file: PropTypes.objectOf(PropTypes.any),
    customRender: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const {
      apikey,
      clientOptions,
      pickerOptions,
    } = this.props;
    const client = filestack.init(apikey, clientOptions);
    this.state = {
      client,
      picker: client.picker({ ...pickerOptions, onUploadDone: this.onFinished }),
    };

    this.onFinished = this.onFinished.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  componentWillMount () {
    const {
      picker,
    } = this.state;
    const {
      pickerDisplayMode,
    } = this.props;
    if (pickerDisplayMode.type === 'immediate') {
      console.log('### callPicker');
      picker.open();
    }
  }

  componentWillUnmount() {
    const {
      picker,
    } = this.state;
    const {
      pickerDisplayMode,
    } = this.props;
    if (pickerDisplayMode.type === 'immediate') {
      picker.close();
    }
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
      clientOptions,
    } = this.props;

    this.callPicker(action, pickerOptions, file, clientOptions.security, client, picker)
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

  callPicker = (action, pickerOptions, file, security, client, picker) => {
    console.log('### callPicker');
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
      picker.open();
      resolve();
    });
  };

  render () {
    const {
      customRender: CustomRender, pickerDisplayMode: { type, customText, customClass },
    } = this.props;
    if (CustomRender) {
      return (
        <CustomRender onPick={this.onClickPick} />
      );
    } else if (type === 'immediate') {
      return (null);
    } else {
      const tagMap = {
        button: 'button',
        link: 'a',
      };
      const Tag = tagMap[type];
      return (
        <Tag
          name="filestack"
          onClick={this.onClickPick}
          className={customClass}
        >
          {customText}
        </Tag>
      );
    }
  }
}

export default ReactFilestack;
