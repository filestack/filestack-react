import React, { Component, PropTypes } from 'react';
import filestack from 'filestack-js';

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
  };

  onClickPick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { apikey, onSuccess, onError, options, mode, file } = this.props;
    const onFinished = (result) => {
      if (typeof onSuccess === 'function') {
        onSuccess(result);
      } else {
        console.log(result);
      }
    };
    const onFail = (error) => {
      if (typeof onError === 'function') {
        onError(error);
      } else {
        console.error(error);
      }
    };

    this.initClient(mode, apikey, options, file)
      .then(onFinished)
      .catch(onFail);
  };

  initClient = (mode, apikey, options, file, security) => {
    const client = filestack.init(apikey, security);
    if (mode === 'transform') {
      return client.transform(options.url, options);
    } else if (mode === 'retrieve') {
      return client.retrieve(options.handle, options);
    } else if (mode === 'metadata') {
      return client.metadata(options.handle, options);
    } else if (mode === 'storeUrl') {
      return client.storeUrl(options.url, options);
    } else if (mode === 'upload') {
      return client.upload(file, options, options);
    } else if (mode === 'remove') {
      return client.remove(options.handle);
    }

    return client.pick(options);
  };

  render () {
    const { buttonClass, buttonText, link, children } = this.props;
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
