import PropTypes from 'prop-types';

export const pickerPropTypes = {
  apikey: PropTypes.string,
  pickerOptions: PropTypes.object,
  clientOptions: PropTypes.object,
  onSuccess: PropTypes.func,
  onUploadDone: PropTypes.func,
  onError: PropTypes.func
};
