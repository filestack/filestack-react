'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { PickerBaseProps } from './picker/picker-base';

/**
 * Value exposed on {@link FilestackContext} — the same shape as
 * {@link PickerBaseProps} (apikey + picker/client options + callbacks).
 */
export type FilestackContextValue = PickerBaseProps;

/**
 * Props accepted by {@link FilestackProvider}.
 */
export interface FilestackProviderProps extends PickerBaseProps {
  /** React subtree that may read picker defaults from this provider. */
  children?: ReactNode;
}

export const FilestackContext = createContext<FilestackContextValue | null>(
  null
);

/**
 * Supplies default props to descendant picker components via React context.
 *
 * Picker components call {@link useResolvedPickerProps} to merge their own
 * props with the values declared on the nearest provider — scalars (apikey,
 * callbacks) prefer the component's own prop when set, while `pickerOptions`
 * and `clientOptions` are shallow-merged with context as the base.
 */
const FilestackProvider = ({
  apikey,
  pickerOptions,
  clientOptions,
  onSuccess,
  onUploadDone,
  onError,
  children
}: FilestackProviderProps) => {
  const value: FilestackContextValue = {
    apikey,
    pickerOptions,
    clientOptions,
    onSuccess,
    onUploadDone,
    onError
  };
  return (
    <FilestackContext.Provider value={value}>
      {children}
    </FilestackContext.Provider>
  );
};

/**
 * Merge component props with {@link FilestackContext} defaults. Component
 * props win for scalars; option objects are shallow-merged with context first.
 */
export const useResolvedPickerProps = (
  props: PickerBaseProps
): Required<Pick<PickerBaseProps, 'pickerOptions' | 'clientOptions'>> &
  Omit<PickerBaseProps, 'pickerOptions' | 'clientOptions'> => {
  const ctx = useContext(FilestackContext) || ({} as FilestackContextValue);
  return {
    apikey: props.apikey !== undefined ? props.apikey : ctx.apikey,
    pickerOptions: { ...ctx.pickerOptions, ...props.pickerOptions },
    clientOptions: { ...ctx.clientOptions, ...props.clientOptions },
    onSuccess: props.onSuccess !== undefined ? props.onSuccess : ctx.onSuccess,
    onUploadDone:
      props.onUploadDone !== undefined ? props.onUploadDone : ctx.onUploadDone,
    onError: props.onError !== undefined ? props.onError : ctx.onError
  };
};

export default FilestackProvider;
