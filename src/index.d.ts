import React from 'react';
import { PickerFileMetadata, ClientOptions } from 'filestack-js';

type FilestackAction = 'transform' | 'retrieve' | 'metadata' | 'storeUrl' | 'upload' | 'multiupload' | 'remove' | 'pick' | 'removeMetadata' | 'preview' | 'logout';

type ComponentDisplayModeType = 'button' | 'link' | 'immediate';

interface Props {
  apikey: string;
  action?: FilestackAction;
  componentDisplayMode?: {
    type?: ComponentDisplayModeType;
    customText?: string;
    customClass?: string;
  };
  // actionOptions
  onSuccess?: (result: PickerFileMetadata[]) => void;
  onError?: (error: PickerFileMetadata[]) => void;
  clientOptions?: ClientOptions;
  file?: File;
  source?: string;
  customRender?: React.ComponentType;
}

declare class ReactFilestack extends React.Component<Props> {}
export default ReactFilestack;
