import usePicker from '../../src/picker/use-picker';

const UsePickerDemo = (props) => {
  const { containerId } = usePicker(props);
  return (
    <div
      id={containerId}
      style={{
        minHeight: 500,
        border: '1px dashed #ccc',
        borderRadius: 4
      }}
    />
  );
};

const meta = {
  title: 'Hooks/usePicker',
  component: UsePickerDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The hook that powers all three picker components. It instantiates a `filestack-js` picker inside a `useEffect`, opens it, and closes it on unmount. The returned `containerId` is the DOM id the picker mounts into — render an element with that id somewhere in your tree.\n\n_Note: `usePicker` is an internal hook today (not re-exported from `filestack-react`). The demo imports it from the source path to show how the three picker components are built._'
      }
    }
  },
  argTypes: {
    apikey: { control: 'text' },
    pickerOptions: { control: 'object' },
    clientOptions: { control: 'object' },
    onUploadDone: { action: 'onUploadDone' },
    onError: { action: 'onError' }
  },
  args: {
    apikey: 'YOUR_APIKEY',
    pickerOptions: { displayMode: 'inline' },
    clientOptions: {}
  }
};

export default meta;

export const Default = {};

export const OverlayMode = {
  args: {
    pickerOptions: { displayMode: 'overlay' }
  }
};

export const DropPaneMode = {
  args: {
    pickerOptions: { displayMode: 'dropPane' }
  }
};
