import { PickerInline } from 'filestack-react';

const meta = {
  title: 'Pickers/PickerInline',
  component: PickerInline,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline picker mounted directly in the page flow. By default it renders a 500px-tall container; pass children to use your own.'
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

export const Default = {};

export const ImagesOnly = {
  args: {
    pickerOptions: {
      accept: ['image/*'],
      maxFiles: 4,
      fromSources: ['local_file_system', 'url']
    }
  }
};

export const RestrictedSources = {
  args: {
    pickerOptions: {
      fromSources: ['local_file_system', 'googledrive', 'dropbox'],
      maxFiles: 3
    }
  }
};

export const CustomContainer = {
  render: (args) => (
    <PickerInline {...args}>
      <div
        style={{
          height: 360,
          border: '2px dashed #aaa',
          borderRadius: 8,
          padding: 16,
          boxSizing: 'border-box'
        }}
      />
    </PickerInline>
  )
};
