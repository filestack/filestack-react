import { renderHook } from '@testing-library/react';
import usePicker from './use-picker';

jest.mock('filestack-js', () => ({
  Filestack: () => ({
    picker: ({ onUploadDone }) => {
      onUploadDone();
      return {
        open: () => Promise.reject(new Error('error')),
        close: () => Promise.resolve(true)
      };
    }
  })
}));

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('usePicker hook', () => {
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
});
