import { render } from '@testing-library/react';
import PickerOverlay from './picker-overlay';
import FilestackProvider from '../filestack-provider';

let mockPickerCallOpts: Record<string, any> | null;
let mockOpenImpl: (() => Promise<unknown>) | null;

jest.mock('filestack-js', () => ({
  __esModule: true,
  PickerDisplayMode: {
    overlay: 'overlay',
    inline: 'inline',
    dropPane: 'dropPane'
  },
  Filestack: () => {
    return {
      picker: (opts: Record<string, any>) => {
        mockPickerCallOpts = opts;
        return {
          open: () => (mockOpenImpl ? mockOpenImpl() : Promise.resolve()),
          close: () => Promise.resolve(true)
        };
      }
    };
  }
}));

const flushPromises = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('PickerOverlay component', () => {
  beforeEach(() => {
    mockPickerCallOpts = null;
    mockOpenImpl = null;
  });

  describe('without FilestackProvider', () => {
    it('should render the container div when no children are provided', () => {
      const { container } = render(<PickerOverlay apikey='x' />);
      const root = container.firstChild as HTMLElement;
      expect(root).not.toBeNull();
      expect(root.tagName).toBe('DIV');
      expect(root.id).toBeTruthy();
      expect(root.id).toBe(
        (mockPickerCallOpts!.container as string).replace('#', '')
      );
    });

    it('should render custom children with the generated container id', () => {
      const { getByTestId } = render(
        <PickerOverlay apikey='x'>
          <section data-testid='custom-overlay-child' />
        </PickerOverlay>
      );
      const child = getByTestId('custom-overlay-child');
      expect(child.tagName).toBe('SECTION');
      expect(child.id).toBeTruthy();
      expect(child.id).toBe(
        (mockPickerCallOpts!.container as string).replace('#', '')
      );
    });

    it('should pass overlay displayMode to usePicker', () => {
      render(<PickerOverlay apikey='x' />);
      expect(mockPickerCallOpts!.displayMode).toBe('overlay');
    });

    it('should let pickerOptions override the default overlay displayMode', () => {
      render(
        <PickerOverlay
          apikey='x'
          pickerOptions={{ displayMode: 'inline' as any }}
        />
      );
      expect(mockPickerCallOpts!.displayMode).toBe('inline');
    });

    it('should route the onUploadDone callback through to consumers', () => {
      const onUploadDone = jest.fn();
      render(<PickerOverlay apikey='x' onUploadDone={onUploadDone} />);
      mockPickerCallOpts!.onUploadDone({ filesUploaded: [{ url: 'a' }] });
      expect(onUploadDone).toHaveBeenCalledWith({
        filesUploaded: [{ url: 'a' }]
      });
    });

    it('should call onError when picker.open() rejects', async () => {
      mockOpenImpl = () => Promise.reject(new Error('open failed'));
      const onError = jest.fn();
      render(<PickerOverlay apikey='x' onError={onError} />);
      await flushPromises();
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
      expect(onError.mock.calls[0][0].message).toBe('open failed');
    });
  });

  describe('with FilestackProvider', () => {
    it('should inherit apikey from provider context and still render container div', () => {
      const { container } = render(
        <FilestackProvider apikey='ctx-key'>
          <PickerOverlay />
        </FilestackProvider>
      );
      expect((container.firstChild as HTMLElement).tagName).toBe('DIV');
      expect(mockPickerCallOpts!.displayMode).toBe('overlay');
    });

    it('should inherit onUploadDone from provider context', () => {
      const onUploadDone = jest.fn();
      render(
        <FilestackProvider apikey='ctx-key' onUploadDone={onUploadDone}>
          <PickerOverlay />
        </FilestackProvider>
      );
      mockPickerCallOpts!.onUploadDone({ ok: true });
      expect(onUploadDone).toHaveBeenCalledWith({ ok: true });
    });

    it('should prefer component onError over provider context onError', async () => {
      mockOpenImpl = () => Promise.reject(new Error('boom'));
      const ctxOnError = jest.fn();
      const propOnError = jest.fn();
      render(
        <FilestackProvider apikey='ctx-key' onError={ctxOnError}>
          <PickerOverlay onError={propOnError} />
        </FilestackProvider>
      );
      await flushPromises();
      expect(propOnError).toHaveBeenCalledTimes(1);
      expect(ctxOnError).not.toHaveBeenCalled();
    });
  });
});
