import { useContext } from 'react';
import type { ReactNode } from 'react';
import { render, renderHook } from '@testing-library/react';
import FilestackProvider, {
  FilestackContext,
  useResolvedPickerProps
} from './filestack-provider';
import type { FilestackContextValue } from './filestack-provider';

describe('FilestackProvider', () => {
  it('should expose the provided values via FilestackContext', () => {
    const onUploadDone = jest.fn();
    const onError = jest.fn();
    const onSuccess = jest.fn();
    const pickerOptions = { maxFiles: 3 };
    const clientOptions = { security: { policy: 'p', signature: 's' } };

    let captured: FilestackContextValue | null = null;
    const Probe = () => {
      captured = useContext(FilestackContext);
      return null;
    };

    render(
      <FilestackProvider
        apikey='ctx-key'
        pickerOptions={pickerOptions}
        clientOptions={clientOptions}
        onUploadDone={onUploadDone}
        onError={onError}
        onSuccess={onSuccess}
      >
        <Probe />
      </FilestackProvider>
    );

    expect(captured).toEqual({
      apikey: 'ctx-key',
      pickerOptions,
      clientOptions,
      onSuccess,
      onUploadDone,
      onError
    });
  });

  it('should render children inside the context provider', () => {
    const { getByTestId } = render(
      <FilestackProvider apikey='ctx-key'>
        <span data-testid='provider-child'>hello</span>
      </FilestackProvider>
    );
    expect(getByTestId('provider-child').textContent).toBe('hello');
  });
});

describe('useResolvedPickerProps', () => {
  it('should return prop values unchanged when no provider is present', () => {
    const onUploadDone = jest.fn();
    const onError = jest.fn();
    const onSuccess = jest.fn();
    const props = {
      apikey: 'prop-key',
      pickerOptions: { maxFiles: 1 },
      clientOptions: { cname: 'fs.example.com' },
      onUploadDone,
      onError,
      onSuccess
    };

    const { result } = renderHook(() => useResolvedPickerProps(props));

    expect(result.current).toEqual({
      apikey: 'prop-key',
      pickerOptions: { maxFiles: 1 },
      clientOptions: { cname: 'fs.example.com' },
      onUploadDone,
      onError,
      onSuccess
    });
  });

  it('should fall back to context values when props are not provided', () => {
    const ctxOnUploadDone = jest.fn();
    const ctxOnError = jest.fn();
    const ctxOnSuccess = jest.fn();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FilestackProvider
        apikey='ctx-key'
        pickerOptions={{ maxFiles: 5 }}
        clientOptions={{ cname: 'ctx.example.com' }}
        onUploadDone={ctxOnUploadDone}
        onError={ctxOnError}
        onSuccess={ctxOnSuccess}
      >
        {children}
      </FilestackProvider>
    );

    const { result } = renderHook(() => useResolvedPickerProps({}), {
      wrapper
    });

    expect(result.current.apikey).toBe('ctx-key');
    expect(result.current.pickerOptions).toEqual({ maxFiles: 5 });
    expect(result.current.clientOptions).toEqual({ cname: 'ctx.example.com' });
    expect(result.current.onUploadDone).toBe(ctxOnUploadDone);
    expect(result.current.onError).toBe(ctxOnError);
    expect(result.current.onSuccess).toBe(ctxOnSuccess);
  });

  it('should let prop scalars (apikey, callbacks) override context values', () => {
    const ctxOnUploadDone = jest.fn();
    const propOnUploadDone = jest.fn();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FilestackProvider apikey='ctx-key' onUploadDone={ctxOnUploadDone}>
        {children}
      </FilestackProvider>
    );

    const { result } = renderHook(
      () =>
        useResolvedPickerProps({
          apikey: 'prop-key',
          onUploadDone: propOnUploadDone
        }),
      { wrapper }
    );

    expect(result.current.apikey).toBe('prop-key');
    expect(result.current.onUploadDone).toBe(propOnUploadDone);
  });

  it('should merge pickerOptions and clientOptions with props taking precedence', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FilestackProvider
        apikey='ctx-key'
        pickerOptions={{ maxFiles: 5, accept: ['image/*'] }}
        clientOptions={{ cname: 'ctx.example.com', sessionCache: true }}
      >
        {children}
      </FilestackProvider>
    );

    const { result } = renderHook(
      () =>
        useResolvedPickerProps({
          pickerOptions: { maxFiles: 10 },
          clientOptions: { cname: 'prop.example.com' }
        }),
      { wrapper }
    );

    expect(result.current.pickerOptions).toEqual({
      maxFiles: 10,
      accept: ['image/*']
    });
    expect(result.current.clientOptions).toEqual({
      cname: 'prop.example.com',
      sessionCache: true
    });
  });

  it('should default pickerOptions/clientOptions to {} when neither props nor context provide them', () => {
    const { result } = renderHook(() =>
      useResolvedPickerProps({ apikey: 'k' })
    );
    expect(result.current.pickerOptions).toEqual({});
    expect(result.current.clientOptions).toEqual({});
  });
});
