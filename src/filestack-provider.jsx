import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { pickerPropTypes } from './picker/picker-base';

export const FilestackContext = createContext(null);

const FilestackProvider = ({
  apikey,
  pickerOptions,
  clientOptions,
  onSuccess,
  onUploadDone,
  onError,
  children
}) => {
  const value = {
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

FilestackProvider.propTypes = {
  ...pickerPropTypes,
  children: PropTypes.node
};

export const useResolvedPickerProps = (props) => {
  const ctx = useContext(FilestackContext) || {};
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
