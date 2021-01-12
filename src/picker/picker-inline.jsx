import React from 'react';
import { PickerDisplayMode } from 'filestack-js';
import { pickerPropTypes } from './picker-base';
import usePicker from './use-picker';

const PickerInline = ({
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
    pickerOptions: { displayMode: PickerDisplayMode.inline, ...pickerOptions },
    clientOptions,
    onSuccess,
    onUploadDone,
    onError
  });

  const render = () => {
    if (children) {
      return React.cloneElement(children, { id: containerId });
    }
    return (
      <div
        data-testid='picker-inline'
        style={{ height: '500px' }}
        id={containerId}
      />
    );
  };
  return render();
};

PickerInline.propTypes = pickerPropTypes;

export default PickerInline;
