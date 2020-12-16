import React from 'react';
import { PickerDisplayMode } from 'filestack-js';
import { pickerPropTypes } from './picker-base';
import usePicker from './use-picker';

const PickerOverlay = ({
  apikey,
  pickerOptions,
  clientOptions,
  onSuccess,
  onError,
  children
}) => {
  const { containerId } = usePicker({
    apikey,
    pickerOptions: { displayMode: PickerDisplayMode.overlay, ...pickerOptions },
    clientOptions,
    onSuccess,
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

PickerOverlay.propTypes = pickerPropTypes;

export default PickerOverlay;
