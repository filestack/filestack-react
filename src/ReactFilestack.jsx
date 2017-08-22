import React, { Component } from 'react';
import filestack from 'filestack-js';
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
  };

  onClickPick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const {
      apikey,
      onSuccess,
      onError,
      options,
      mode,
      file,
      security,
      cname
    } = this.props;
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

    this.initClient(mode, apikey, options, file, security, cname)
      .then(onFinished)
      .catch(onFail);
  };

  initClient = (mode, apikey, options, file, security, cname) => {
    const { url, handle } = options;
    delete options.handle;
    delete options.url;
    const client = filestack.init(apikey, security, cname);

    if (mode === 'transform') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.transform(url, options));
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

    return client.pick(options);
  };

  render () {
    const { buttonClass, buttonText, link, children, render: CustomRender } = this.props;
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
