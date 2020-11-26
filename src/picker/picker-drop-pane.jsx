import React from 'react';
import { PickerDisplayMode } from 'filestack-js';
import { pickerPropTypes } from './picker-base';
import usePicker from './use-picker';

const PickerDropPane = ({
  apikey,
  pickerOptions,
  clientOptions,
  onSuccess,
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
    onError
  });

  const render = () => {
    if (children) {
      return React.cloneElement(children, { id: containerId });
    }
    return <div style={{ height: '500px' }} id={containerId} />;
  };
  return render();
};

PickerDropPane.propTypes = pickerPropTypes;

export default PickerDropPane;
