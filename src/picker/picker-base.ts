import type {
  ClientOptions,
  PickerOptions,
  PickerResponse,
  FilestackError
} from 'filestack-js';

/**
 * Props shared by every picker component and by FilestackProvider.
 *
 * All fields are optional at the component level because they may be supplied
 * through {@link FilestackProvider} context instead. The picker component
 * resolves component props over context defaults before invoking the underlying
 * `filestack-js` client (see `useResolvedPickerProps`).
 */
export interface PickerBaseProps {
  /** Filestack API key. May come from props or `FilestackProvider` context. */
  apikey?: string;
  /** Options forwarded to `filestack-js` `client.picker(options)`. */
  pickerOptions?: PickerOptions;
  /** Options forwarded to `filestack-js` `Filestack(apikey, clientOptions)`. */
  clientOptions?: ClientOptions;
  /** @deprecated Use `onUploadDone` instead. Called when uploads finish. */
  onSuccess?: (result: PickerResponse) => void;
  /** Called when the picker finishes uploading all files. */
  onUploadDone?: (result: PickerResponse) => void;
  /** Called when `picker.open()` rejects. */
  onError?: (error: FilestackError | Error) => void;
}
