import React, { Component, PropTypes } from 'react';

class ReactFilestack extends Component {
  static defaultProps = {
    blob: null,
    link: false,
    buttonText: 'Pick file',
    buttonClass: '',
    onSuccess: null,
    onError: null,
    mode: 'pick',
    log: false,
  };

  static propTypes = {
    blob: PropTypes.objectOf(PropTypes.any),
    apikey: PropTypes.string.isRequired,
    link: PropTypes.bool,
    mode: PropTypes.string,
    buttonText: PropTypes.string,
    buttonClass: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    log: PropTypes.bool,
    options: PropTypes.shape({
      url: PropTypes.string,
      filename: PropTypes.string,
      suggestedFilename: PropTypes.string,
      mimetype: PropTypes.string,
      mimetypes: PropTypes.arrayOf(PropTypes.string),
      extension: PropTypes.string,
      extensions: PropTypes.arrayOf(PropTypes.string),
      multiple: PropTypes.bool,
      maxSize: PropTypes.number,
      maxFiles: PropTypes.number,
      folders: PropTypes.bool,
      container: PropTypes.string,
      language: PropTypes.string,
      service: PropTypes.string,
      services: PropTypes.arrayOf(PropTypes.string),
      openTo: PropTypes.string,
      webcamDim: PropTypes.arrayOf(PropTypes.number),
      webcam: PropTypes.shape({
        videoRes: PropTypes.string,
        audioLen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        videoLen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
      customSourceContainer: PropTypes.string,
      customSourcePath: PropTypes.string,
      debug: PropTypes.bool,
      policy: PropTypes.string,
      signature: PropTypes.string,
      backgroundUpload: PropTypes.bool,
      hide: PropTypes.bool,
      customCss: PropTypes.string,
      customText: PropTypes.string,
      imageQuality: PropTypes.number,
      imageDim: PropTypes.arrayOf(PropTypes.number),
      imageMax: PropTypes.arrayOf(PropTypes.number),
      imageMin: PropTypes.arrayOf(PropTypes.number),
      conversions: PropTypes.arrayOf(PropTypes.string),
      cropRatio: PropTypes.number,
      cropDim: PropTypes.arrayOf(PropTypes.number),
      cropMax: PropTypes.arrayOf(PropTypes.number),
      cropMin: PropTypes.arrayOf(PropTypes.number),
      cropForce: PropTypes.bool,
      width: PropTypes.number,
      height: PropTypes.number,
      fit: PropTypes.oneOf(['clip', 'crop', 'scale', 'max']),
      align: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'faces']),
      crop: PropTypes.arrayOf(PropTypes.number),
      crop_first: PropTypes.bool,
      format: PropTypes.string,
      filter: PropTypes.oneOf(['blur', 'sharpen']),
      compress: PropTypes.bool,
      quality: PropTypes.number,
      rotate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      watermark: PropTypes.string,
      watermark_position: PropTypes.string,
      watermark_size: PropTypes.number,
      location: PropTypes.string,
      path: PropTypes.string,
      storeRegion: PropTypes.string,
      storeContainer: PropTypes.string,
      access: PropTypes.string,
      base64encode: PropTypes.bool,
      base64decode: PropTypes.bool,
      asText: PropTypes.bool,
      cache: PropTypes.bool,
      uploaded: PropTypes.bool,
      writeable: PropTypes.bool,
      md5: PropTypes.bool,
    }),
  };

  onClickPick = (e) => {
    const filestack = require('filestack-js').default;
    console.log(filestack);
    e.stopPropagation();
    e.preventDefault();
    const { apikey, onSuccess, onError, options, mode, blob, log } = this.props;
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
      client.transform(options.url, options);
    } else if (mode === 'retrieve') {
      client.retrieve(options.handle, options);
    } else if (mode === 'metadata') {
      client.metadata(options.handle, options);
    } else if (mode === 'storeUrl') {
      client.storeUrl(options.url, options);
    } else if (mode === 'upload') {
      client.upload(blob, options, options);
    } else if (mode === 'remove') {
      client.remove(options.handle);
    } else {
      client.pick(options);
    }
    if (onSuccess) {
      client = client.then(onFinished);
    }
    if (onError) {
      client = client.catch(onFail);
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
