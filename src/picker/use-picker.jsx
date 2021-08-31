import * as filestack from 'filestack-js';
import { useEffect } from 'react';

const _generateRandomId = () => 'x' + Math.random().toString(36).substr(2, 5);

const usePicker = ({
  apikey,
  pickerOptions = {},
  clientOptions = {},
  onSuccess = console.log,
  onUploadDone = console.log,
  onError = console.error
}) => {
  const _onError = (error) => {
    onError(error);
  };

  const _onUploadDone = (result) => {
    onSuccess(result);
    onUploadDone(result);
  };

  const rootId = _generateRandomId();
  const containerId = _generateRandomId();
  useEffect(() => {
    const picker = filestack.Filestack(apikey, clientOptions).picker({
      rootId,
      container: `#${containerId}`,
      onUploadDone: _onUploadDone,
      ...pickerOptions
    });

    picker.open().then().catch(_onError);
    return () => {
      if (picker) {
        picker.close();
      }
    };
  }, [rootId, containerId, apikey, clientOptions, pickerOptions, _onUploadDone]);

  return { containerId };
};

export default usePicker;
