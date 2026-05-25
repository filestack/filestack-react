'use client';

import * as filestack from 'filestack-js';
import { useEffect, useId, useRef } from 'react';

const _useStableReference = (value) => {
  const serialized = JSON.stringify(value);
  const ref = useRef({ serialized, value });
  if (ref.current.serialized !== serialized) {
    ref.current = { serialized, value };
  }
  return ref.current.value;
};

const usePicker = ({
  apikey,
  pickerOptions = {},
  clientOptions = {},
  onSuccess,
  onUploadDone,
  onError = () => {}
}) => {
  const id = useId().replace(/:/g, '');
  const rootId = `fs-root-${id}`;
  const containerId = `fs-container-${id}`;

  const stablePickerOptions = _useStableReference(pickerOptions);
  const stableClientOptions = _useStableReference(clientOptions);

  const onUploadDoneRef = useRef();
  onUploadDoneRef.current = (result) => {
    const handler = onUploadDone || onSuccess || (() => {});
    handler(result);
  };

  const onErrorRef = useRef();
  onErrorRef.current = (error) => {
    onError(error);
  };

  useEffect(() => {
    const picker = filestack.Filestack(apikey, stableClientOptions).picker({
      rootId,
      container: `#${containerId}`,
      onUploadDone: (result) => onUploadDoneRef.current(result),
      ...stablePickerOptions
    });

    picker.open().then().catch((error) => onErrorRef.current(error));
    return () => {
      if (picker) {
        picker.close();
      }
    };
  }, [apikey, stableClientOptions, stablePickerOptions]);

  return { containerId };
};

export default usePicker;
