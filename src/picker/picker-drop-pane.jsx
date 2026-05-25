import { cloneElement } from 'react';
import { PickerDisplayMode } from 'filestack-js';
import { pickerPropTypes } from './picker-base';
import usePicker from './use-picker';
import { useResolvedPickerProps } from '../filestack-provider';

const PickerDropPane = (props) => {
  const resolved = useResolvedPickerProps(props);
  const { containerId } = usePicker({
    ...resolved,
    pickerOptions: {
      displayMode: PickerDisplayMode.dropPane,
      ...resolved.pickerOptions
    }
  });

  const render = () => {
    if (props.children) {
      return cloneElement(props.children, { id: containerId });
    }
    return <div id={containerId} />;
  };
  return render();
};

PickerDropPane.propTypes = pickerPropTypes;

export default PickerDropPane;
