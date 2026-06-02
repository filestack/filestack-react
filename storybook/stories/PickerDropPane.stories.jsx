import { PickerDropPane } from 'filestack-react';

const meta = {
  title: 'Pickers/PickerDropPane',
  component: PickerDropPane,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Drag-and-drop target. Drop files onto the container to upload; the file list is reported via `onUploadDone`.'
      }
    }
  },
  argTypes: {
    apikey: {
      control: 'text',
      description: 'Your Filestack API key (required for the picker to run).'
    },
    pickerOptions: {
      control: 'object',
      description:
        'https://filestack.github.io/filestack-js/interfaces/pickeroptions.html'
    },
    clientOptions: {
      control: 'object',
      description:
        'https://filestack.github.io/filestack-js/interfaces/clientoptions.html'
    },
    onUploadDone: { action: 'onUploadDone' },
    onError: { action: 'onError' }
  },
  args: {
    apikey: 'YOUR_APIKEY',
    pickerOptions: {},
    clientOptions: {}
  }
};

export default meta;

export const Default = {
  render: (args) => (
    <PickerDropPane {...args}>
      <div
        style={{
          height: 240,
          border: '2px dashed #4a90e2',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4a90e2',
          fontFamily: 'sans-serif'
        }}
      >
        Drop files here
      </div>
    </PickerDropPane>
  )
};

export const ImagesOnly = {
  args: {
    pickerOptions: {
      accept: ['image/*'],
      maxFiles: 8
    }
  },
  render: Default.render
};

export const MultipleWithMaxSize = {
  args: {
    pickerOptions: {
      maxFiles: 20,
      maxSize: 10 * 1024 * 1024
    }
  },
  render: Default.render
};
