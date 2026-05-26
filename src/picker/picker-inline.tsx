'use client';

import { cloneElement, isValidElement } from 'react';
import type { ReactElement } from 'react';
import { PickerDisplayMode } from 'filestack-js';
import type { PickerBaseProps } from './picker-base';
import usePicker from './use-picker';
import { useResolvedPickerProps } from '../filestack-provider';

/**
 * Props for {@link PickerInline}.
 */
export interface PickerInlineProps extends PickerBaseProps {
  /**
   * Optional custom container element. When provided, it is cloned with the
   * generated DOM `id` so the picker mounts inside it. Otherwise a default
   * 500px-tall `<div>` is rendered.
   */
  children?: ReactElement<{ id?: string }>;
}

const PickerInline = (props: PickerInlineProps) => {
  const resolved = useResolvedPickerProps(props);
  const { containerId } = usePicker({
    ...resolved,
    pickerOptions: {
      displayMode: PickerDisplayMode.inline,
      ...resolved.pickerOptions
    }
  });

  if (props.children && isValidElement(props.children)) {
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

export default PickerInline;
