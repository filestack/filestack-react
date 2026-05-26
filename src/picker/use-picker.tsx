'use client';

import * as filestack from 'filestack-js';
import type { PickerInstance, PickerResponse } from 'filestack-js';
import { useEffect, useId, useRef } from 'react';
import type { PickerBaseProps } from './picker-base';

/**
 * Return value of {@link usePicker}.
 */
export interface UsePickerResult {
  /** DOM `id` attribute the picker will mount into. */
  containerId: string;
}

const _useStableReference = <T,>(value: T): T => {
  const serialized = JSON.stringify(value);
  const ref = useRef<{ serialized: string; value: T }>({ serialized, value });
  if (ref.current.serialized !== serialized) {
    ref.current = { serialized, value };
  }
  return ref.current.value;
};

/**
 * Drive a Filestack picker through its lifecycle.
 *
 * Instantiates `filestack.Filestack(apikey, clientOptions).picker(...)` inside
 * a `useEffect`, opens it, and closes it on unmount. Stable references are
 * derived for `pickerOptions` / `clientOptions` so callers can pass new-but-equal
 * object literals on every render without re-creating the picker.
 */
const usePicker = ({
  apikey,
  pickerOptions = {},
  clientOptions = {},
  onSuccess,
  onUploadDone,
  onError = () => {}
}: PickerBaseProps): UsePickerResult => {
  const id = useId().replace(/:/g, '');
  const rootId = `fs-root-${id}`;
  const containerId = `fs-container-${id}`;

  const stablePickerOptions = _useStableReference(pickerOptions);
  const stableClientOptions = _useStableReference(clientOptions);

  const onUploadDoneRef = useRef<(result: PickerResponse) => void>(() => {});
  onUploadDoneRef.current = (result: PickerResponse) => {
    const handler = onUploadDone || onSuccess || (() => {});
    handler(result);
  };

  const onErrorRef = useRef<(error: Error) => void>(() => {});
  onErrorRef.current = (error: Error) => {
    onError(error);
  };

  useEffect(() => {
    const picker: PickerInstance = filestack
      .Filestack(apikey as string, stableClientOptions)
      .picker({
        rootId,
        container: `#${containerId}`,
        onUploadDone: (result: PickerResponse) =>
          onUploadDoneRef.current(result),
        ...stablePickerOptions
      });

    picker
      .open()
      .then()
      .catch((error: Error) => onErrorRef.current(error));
    return () => {
      if (picker) {
        picker.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apikey, stableClientOptions, stablePickerOptions]);

  return { containerId };
};

export default usePicker;
