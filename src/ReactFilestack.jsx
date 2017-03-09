import React, { Component, PropTypes } from 'react';

class ReactFilestack extends Component {
  static defaultProps = {
    file: null,
    link: false,
    buttonText: 'Pick file',
    buttonClass: '',
    onSuccess: null,
    onError: null,
    mode: 'pick',
    log: false,
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
    log: PropTypes.bool,
    options: PropTypes.objectOf(PropTypes.any),
  };

  onClickPick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { apikey, onSuccess, onError, options, mode, file, log } = this.props;
    const filestack = require('filestack-js').default;
    const onFinished = (result) => {
      if (typeof onSuccess === 'function') {
        onSuccess(result);
      } else if (log) {
        console.log(result);
      }
    };
    const onFail = (error) => {
      if (typeof onError === 'function') {
        onError(error);
      } else if (log) {
        console.error(error);
      }
    };

    let client = filestack.init(apikey);
    if (mode === 'transform') {
      client = client.transform(options.url, options);
    } else if (mode === 'retrieve') {
      client = client.retrieve(options.handle, options);
    } else if (mode === 'metadata') {
      client = client.metadata(options.handle, options);
    } else if (mode === 'storeUrl') {
      client = client.storeUrl(options.url, options);
    } else if (mode === 'upload') {
      client = client.upload(file, options, options);
    } else if (mode === 'remove') {
      client = client.remove(options.handle);
    } else {
      client = client.pick(options);
    }
    if (onSuccess) {
      client = client.then(onFinished);
    }
    if (onError) {
      client.catch(onFail);
    }
  };

  render() {
    const { buttonClass, buttonText, link } = this.props;
    const Tag = link ? 'a' : 'button';
    return (
      <Tag
        name="filestack"
        onClick={this.onClickPick}
        className={buttonClass}
      >
        {buttonText}
      </Tag>
    );
  }
}

export default ReactFilestack;
