import React from 'react';
import { PickerDisplayMode } from 'filestack-js';
import { pickerPropTypes } from './picker-base';
import usePicker from './use-picker';

const PickerDropPane = ({
  apikey,
  pickerOptions,
  clientOptions,
  onSuccess,
  onUploadDone,
  onError,
  children
}) => {
  const { containerId } = usePicker({
    apikey,
    pickerOptions: {
      displayMode: PickerDisplayMode.dropPane,
      ...pickerOptions
    },
    clientOptions,
    onSuccess,
    onUploadDone,
    onError
  });

  const render = () => {
    if (children) {
      return React.cloneElement(children, { id: containerId });
    }
    return <div id={containerId} />;
  };
  return render();
};

PickerDropPane.propTypes = pickerPropTypes;

export default PickerDropPane;
