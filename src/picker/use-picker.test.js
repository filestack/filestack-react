import { renderHook } from '@testing-library/react';
import usePicker from './use-picker';

let mockFilestackArgs;
let mockPickerCallOpts;
let mockPickerCalls;
let mockClose;

jest.mock('filestack-js', () => ({
  Filestack: (...args) => {
    mockFilestackArgs = args;
    return {
      picker: (opts) => {
        mockPickerCallOpts = opts;
        mockPickerCalls += 1;
        opts.onUploadDone();
        return {
          open: () => Promise.reject(new Error('error')),
          close: mockClose
        };
      }
    };
  }
}));

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('usePicker hook', () => {
  beforeEach(() => {
    mockFilestackArgs = null;
    mockPickerCallOpts = null;
    mockPickerCalls = 0;
    mockClose = jest.fn(() => Promise.resolve(true));
  });

  it('should exist', () => {
    expect(usePicker).toBeTruthy();
  });

  it('should return different container ids', () => {
    const a = renderHook(() => usePicker({ apikey: 'x' }));
    const b = renderHook(() => usePicker({ apikey: 'x' }));
    expect(a.result.current.containerId).not.toBe(b.result.current.containerId);
  });

  it('should call passed onSuccess function', async () => {
    const onSuccess = jest.fn();
    renderHook(() => usePicker({ apikey: 'x', onSuccess }));
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should call passed onUploadDone function', async () => {
    const onUploadDone = jest.fn();
    renderHook(() => usePicker({ apikey: 'x', onUploadDone }));
    expect(onUploadDone).toHaveBeenCalledTimes(1);
  });

  it('should call passed onError function', async () => {
    const onError = jest.fn();
    renderHook(() => usePicker({ apikey: 'x', onError }));
    await flushPromises();
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('should call picker.close on unmount', () => {
    const { unmount } = renderHook(() => usePicker({ apikey: 'x' }));
    expect(mockClose).not.toHaveBeenCalled();
    unmount();
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should not recreate the picker when option objects are recreated with equal values', () => {
    const { rerender } = renderHook(
      ({ pickerOptions, clientOptions }) =>
        usePicker({ apikey: 'x', pickerOptions, clientOptions }),
      {
        initialProps: {
          pickerOptions: { displayMode: 'overlay' },
          clientOptions: { security: { policy: 'p', signature: 's' } }
        }
      }
    );
    expect(mockPickerCalls).toBe(1);
    for (let i = 0; i < 5; i++) {
      rerender({
        pickerOptions: { displayMode: 'overlay' },
        clientOptions: { security: { policy: 'p', signature: 's' } }
      });
    }
    expect(mockPickerCalls).toBe(1);
  });

  it('should initialize without throwing when apikey is missing', () => {
    expect(() => renderHook(() => usePicker({}))).not.toThrow();
    expect(mockFilestackArgs).not.toBeNull();
    expect(mockFilestackArgs[0]).toBeUndefined();
    expect(mockPickerCallOpts).not.toBeNull();
  });
});
