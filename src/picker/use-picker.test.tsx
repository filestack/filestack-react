import { StrictMode } from 'react';
import { renderHook } from '@testing-library/react';
import type { PickerResponse } from 'filestack-js';
import usePicker from './use-picker';

let mockFilestackArgs: unknown[] | null;
let mockPickerCallOpts: Record<string, any> | null;
let mockPickerCalls: number;
let mockClose: jest.Mock;
// Ordered log of lifecycle operations across all picker instances, used to
// assert the open/close calls are serialized (open A → close A → open B).
let mockOpsLog: string[];

jest.mock('filestack-js', () => ({
  Filestack: (...args: unknown[]) => {
    mockFilestackArgs = args;
    return {
      picker: (opts: Record<string, any>) => {
        mockPickerCallOpts = opts;
        mockPickerCalls += 1;
        const instance = mockPickerCalls;
        opts.onUploadDone({} as PickerResponse);
        return {
          open: () => {
            mockOpsLog.push(`open:${instance}`);
            return Promise.reject(new Error('error'));
          },
          close: () => {
            mockOpsLog.push(`close:${instance}`);
            return mockClose();
          }
        };
      }
    };
  }
}));

const flushPromises = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('usePicker hook', () => {
  beforeEach(() => {
    mockFilestackArgs = null;
    mockPickerCallOpts = null;
    mockPickerCalls = 0;
    mockOpsLog = [];
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

  it('should call picker.close on unmount once open settles', async () => {
    const { unmount } = renderHook(() => usePicker({ apikey: 'x' }));
    expect(mockClose).not.toHaveBeenCalled();
    unmount();
    // close is deferred until open() settles, so it must not fire synchronously
    expect(mockClose).not.toHaveBeenCalled();
    await flushPromises();
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should serialize open/close so only one picker survives StrictMode remount', async () => {
    // StrictMode double-invokes the effect (setup → cleanup → setup). Because
    // both instances target the same container id, their async open()/close()
    // must be serialized; otherwise the first instance's close() tears down the
    // container the second instance mounted into, leaving nothing rendered.
    renderHook(() => usePicker({ apikey: 'x' }), { wrapper: StrictMode });
    await flushPromises();

    // Two instances were created, but operations ran in strict order:
    // open the first, close the first, then open the second (which stays open).
    expect(mockPickerCalls).toBe(2);
    expect(mockOpsLog).toEqual(['open:1', 'close:1', 'open:2']);
  });

  it('should not recreate the picker when option objects are recreated with equal values', () => {
    const { rerender } = renderHook(
      ({ pickerOptions, clientOptions }) =>
        usePicker({ apikey: 'x', pickerOptions, clientOptions }),
      {
        initialProps: {
          pickerOptions: { displayMode: 'overlay' as const },
          clientOptions: { security: { policy: 'p', signature: 's' } }
        }
      }
    );
    expect(mockPickerCalls).toBe(1);
    for (let i = 0; i < 5; i++) {
      rerender({
        pickerOptions: { displayMode: 'overlay' as const },
        clientOptions: { security: { policy: 'p', signature: 's' } }
      });
    }
    expect(mockPickerCalls).toBe(1);
  });

  it('should initialize without throwing when apikey is missing', () => {
    expect(() => renderHook(() => usePicker({}))).not.toThrow();
    expect(mockFilestackArgs).not.toBeNull();
    expect((mockFilestackArgs as unknown[])[0]).toBeUndefined();
    expect(mockPickerCallOpts).not.toBeNull();
  });
});
