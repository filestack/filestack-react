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
    actionOptions: {},
    onSuccess: result => console.log(result),
    onError: error => console.error(error),
    clientOptions: {},
    file: null,
    source: null,
    customRender: null,
  };

  static propTypes = {
    apikey: PropTypes.string.isRequired,
    action: PropTypes.oneOf(['transform', 'retrieve', 'metadata', 'storeUrl', 'upload', 'remove', 'pick', 'removeMetadata', 'preview']),
    pickerDisplayMode: PropTypes.shape({
      type: PropTypes.oneOf(['immediate', 'button', 'link']),
      customText: PropTypes.string,
      customClass: PropTypes.string,
    }),
    actionOptions: PropTypes.objectOf(PropTypes.any),
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    clientOptions: PropTypes.shape({
      cname: PropTypes.string,
      security: PropTypes.objectOf(PropTypes.any),
      sessionCache: PropTypes.bool,
    }),
    file: PropTypes.objectOf(PropTypes.any),
    source: PropTypes.string,
    customRender: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const {
      apikey,
      clientOptions,
      actionOptions,
      action,
    } = this.props;
    const client = filestack.init(apikey, clientOptions);
    this.state = {
      client,
      picker: action === 'pick' ? client.picker({ ...actionOptions, onUploadDone: this.onFinished }) : null,
    };

    this.onFinished = this.onFinished.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  componentWillMount () {
    const {
      pickerDisplayMode,
    } = this.props;
    if (pickerDisplayMode.type === 'immediate') {
      this.completeAction()
        .then(this.onFinished)
        .catch(this.onFail);
    }
  }

  componentWillUnmount() {
    const {
      action,
    } = this.props;
    const {
      picker,
    } = this.state;
    if (action === 'pick') {
      picker.close();
    }
  }

  /**
   * Initial function called when component button or link clicked
   */
  onClickPick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    this.completeAction()
      .then(this.onFinished)
      .catch(this.onFail);
  };

  /**
   * Function which will be executed after succesful completed action
   */
  onFinished = (result) => {
    const { onSuccess } = this.props;
    if (typeof onSuccess === 'function' && result) {
      onSuccess(result);
    }
  };

  /**
   * Function which will be executed while some error occurs during the action
   */
  onFail = (error) => {
    const { onError } = this.props;
    if (typeof onError === 'function') {
      onError(error);
    } else {
      console.error(error);
    }
  };

  /**
   * Complete executing of provided action
   */
  completeAction = () => {
    const {
      client,
      picker,
    } = this.state;
    const {
      actionOptions,
      action,
      clientOptions: { security },
      file,
      source,
    } = this.props;

    // return new Promise((resolve, reject) => {
    //   try {
    //     if (action === 'pick') {
    //       picker.open();
    //       resolve();
    //     }
    //   } catch (err) {
    //     reject(err);
    //   }
    // });

    if (action === 'transform') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.transform(source, actionOptions));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'retrieve') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.retrieve(source, actionOptions, security));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'metadata') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.metadata(source, actionOptions, security));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'storeUrl') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.storeURL(source, actionOptions, security));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'upload') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.upload(file, actionOptions));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'remove') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.remove(source, security));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'removeMetadata') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.removeMetadata(source, security));
        } catch (err) {
          reject(err);
        }
      });
    } else if (action === 'preview') {
      return new Promise((resolve, reject) => {
        try {
          resolve(client.preview(source, actionOptions));
        } catch (err) {
          reject(err);
        }
      });
    }

    // return new Promise((resolve) => {
    //   picker.open();
    //   resolve();
    // });
    return picker.open();
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
