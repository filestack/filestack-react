import * as filestack from 'filestack-js';
import { useEffect } from 'react';

const _generateRandomId = () => 'x' + Math.random().toString(36).substr(2, 5);

const usePicker = ({
  apikey,
  pickerOptions = {},
  clientOptions = {},
  onSuccess = console.log,
  onError = console.error
}) => {
  const _onError = (error) => {
    onError(error);
  };

  const _onSuccess = (result) => {
    onSuccess(result);
  };

  const rootId = _generateRandomId();
  const containerId = _generateRandomId();
  const picker = filestack.Filestack(apikey, clientOptions).picker({
    rootId,
    container: `#${containerId}`,
    onUploadDone: _onSuccess,
    ...pickerOptions
  });

  useEffect(() => {
    picker.open().then().catch(_onError);
    return () => {
      if (picker) {
        picker.close();
      }
    };
  }, []);

  return { containerId };
};

export default usePicker;
