'use client';

import { cloneElement, isValidElement } from 'react';
import type { ReactElement } from 'react';
import { PickerDisplayMode } from 'filestack-js';
import type { PickerBaseProps } from './picker-base';
import usePicker from './use-picker';
import { useResolvedPickerProps } from '../filestack-provider';

/**
 * Props for {@link PickerDropPane}.
 */
export interface PickerDropPaneProps extends PickerBaseProps {
  /**
   * Optional custom container element. When provided, it is cloned with the
   * generated DOM `id` so the picker mounts inside it.
   */
  children?: ReactElement<{ id?: string }>;
}

const PickerDropPane = (props: PickerDropPaneProps) => {
  const resolved = useResolvedPickerProps(props);
  const { containerId } = usePicker({
    ...resolved,
    pickerOptions: {
      displayMode: PickerDisplayMode.dropPane,
      ...resolved.pickerOptions
    }
  });

  if (props.children && isValidElement(props.children)) {
    return cloneElement(props.children, { id: containerId });
  }
  return <div id={containerId} />;
};

export default PickerDropPane;
