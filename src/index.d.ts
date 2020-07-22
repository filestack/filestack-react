import React from 'react';

type FilestackAction = 'transform' | 'retrieve' | 'metadata' | 'storeUrl' | 'upload' | 'multiupload' | 'remove' | 'pick' | 'removeMetadata' | 'preview' | 'logout';

type ComponentDisplayModeType = 'button' | 'link' | 'immediate';

interface FilestackResult {}

interface FilestackError {}

interface Props {
  apikey: string;
  action?: FilestackAction;
  componentDisplayMode?: {
    type?: ComponentDisplayModeType;
    customText?: string;
    customClass?: string;
  };
  // actionOptions
  onSuccess?: (result: FilestackResult) => void;
  onError?: (error: FilestackError) => void;
  clientOptions?: {
    cname?: string;
    security?: {
      policy?: string;
      signature?: string;
    };
    sessionCache?: boolean;
  };
  file?: File;
  source?: string;
  customRender?: React.ComponentType;
}

declare class ReactFilestack extends React.Component<Props> {}
export default ReactFilestack;

declare module 'filestack-react' {
  // @ts-ignore
  console.log('test');
}
