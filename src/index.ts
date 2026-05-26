'use client';

import PickerOverlay from './picker/picker-overlay';
import PickerInline from './picker/picker-inline';
import PickerDropPane from './picker/picker-drop-pane';
import FilestackProvider from './filestack-provider';
import * as client from 'filestack-js';

export {
  PickerOverlay,
  PickerInline,
  PickerDropPane,
  FilestackProvider,
  client
};

export type { PickerBaseProps } from './picker/picker-base';
export type { UsePickerResult } from './picker/use-picker';
export type { PickerOverlayProps } from './picker/picker-overlay';
export type { PickerInlineProps } from './picker/picker-inline';
export type { PickerDropPaneProps } from './picker/picker-drop-pane';
export type {
  FilestackProviderProps,
  FilestackContextValue
} from './filestack-provider';
export { FilestackContext, useResolvedPickerProps } from './filestack-provider';

export type {
  PickerOptions,
  PickerResponse,
  PickerFileMetadata,
  PickerInstance,
  PickerUploadDoneCallback,
  PickerDisplayMode,
  ClientOptions,
  Security,
  SecurityOptions,
  Client,
  FilestackError
} from 'filestack-js';
