'use client';

import { cloneElement } from 'react';
import { PickerDisplayMode } from 'filestack-js';
import { pickerPropTypes } from './picker-base';
import usePicker from './use-picker';
import { useResolvedPickerProps } from '../filestack-provider';

const PickerInline = (props) => {
  const resolved = useResolvedPickerProps(props);
  const { containerId } = usePicker({
    ...resolved,
    pickerOptions: {
      displayMode: PickerDisplayMode.inline,
      ...resolved.pickerOptions
    }
  });

  const render = () => {
    if (props.children) {
      return cloneElement(props.children, { id: containerId });
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
