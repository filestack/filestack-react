import React from 'react';
import type { PickerFileMetadata, ClientOptions, PickerResponse } from 'filestack-js';

type FilestackAction = 'transform' | 'retrieve' | 'metadata' | 'storeUrl' | 'upload' | 'multiupload' | 'remove' | 'pick' | 'removeMetadata' | 'preview' | 'logout';

type ComponentDisplayModeType = 'button' | 'link' | 'immediate';

interface Props {
  apikey?: string;
  action?: FilestackAction;
  componentDisplayMode?: {
    type?: ComponentDisplayModeType;
    customText?: string;
    customClass?: string;
  };
  onSuccess?: (result: PickerResponse) => void;
  onError?: (error: PickerFileMetadata[]) => void;
  clientOptions?: ClientOptions;
  file?: File;
  source?: string;
  customRender?: React.ComponentType<{ onPick: (arg: unknown) => void }>;

  // Maps to pickerOptions in filestack-js
  // https://filestack.github.io/filestack-js/interfaces/pickeroptions.html
  actionOptions?: Record<string, unknown>;
}

declare class ReactFilestack extends React.Component<Props> {}
export default ReactFilestack;
