import { render } from '@testing-library/react';
import PickerDropPane from './picker-drop-pane';
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

describe('PickerDropPane component', () => {
  beforeEach(() => {
    mockPickerCallOpts = null;
    mockOpenImpl = null;
  });

  describe('without FilestackProvider', () => {
    it('should render the container div when no children are provided', () => {
      const { container } = render(<PickerDropPane apikey='x' />);
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
        <PickerDropPane apikey='x'>
          <div
            data-testid='custom-drop-pane-child'
            style={{ height: '800px' }}
          />
        </PickerDropPane>
      );
      const child = getByTestId('custom-drop-pane-child');
      expect(child.tagName).toBe('DIV');
      expect(child.id).toBeTruthy();
      expect(child.id).toBe(
        (mockPickerCallOpts!.container as string).replace('#', '')
      );
    });

    it('should pass dropPane displayMode to usePicker', () => {
      render(<PickerDropPane apikey='x' />);
      expect(mockPickerCallOpts!.displayMode).toBe('dropPane');
    });

    it('should let pickerOptions override the default dropPane displayMode', () => {
      render(
        <PickerDropPane
          apikey='x'
          pickerOptions={{ displayMode: 'overlay' as any }}
        />
      );
      expect(mockPickerCallOpts!.displayMode).toBe('overlay');
    });

    it('should route the onUploadDone callback through to consumers', () => {
      const onUploadDone = jest.fn();
      render(<PickerDropPane apikey='x' onUploadDone={onUploadDone} />);
      mockPickerCallOpts!.onUploadDone({ filesUploaded: [{ url: 'b' }] });
      expect(onUploadDone).toHaveBeenCalledWith({
        filesUploaded: [{ url: 'b' }]
      });
    });

    it('should call onError when picker.open() rejects', async () => {
      mockOpenImpl = () => Promise.reject(new Error('drop pane failure'));
      const onError = jest.fn();
      render(<PickerDropPane apikey='x' onError={onError} />);
      await flushPromises();
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
      expect(onError.mock.calls[0][0].message).toBe('drop pane failure');
    });
  });

  describe('with FilestackProvider', () => {
    it('should inherit apikey from provider context and still render container div', () => {
      const { container } = render(
        <FilestackProvider apikey='ctx-key'>
          <PickerDropPane />
        </FilestackProvider>
      );
      expect((container.firstChild as HTMLElement).tagName).toBe('DIV');
      expect(mockPickerCallOpts!.displayMode).toBe('dropPane');
    });

    it('should inherit onUploadDone from provider context', () => {
      const onUploadDone = jest.fn();
      render(
        <FilestackProvider apikey='ctx-key' onUploadDone={onUploadDone}>
          <PickerDropPane />
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
          <PickerDropPane onError={propOnError} />
        </FilestackProvider>
      );
      await flushPromises();
      expect(propOnError).toHaveBeenCalledTimes(1);
      expect(ctxOnError).not.toHaveBeenCalled();
    });
  });
});
