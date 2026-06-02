import { PickerOverlay } from 'filestack-react';

const meta = {
  title: 'Pickers/PickerOverlay',
  component: PickerOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal picker that covers the page. Edit `apikey` in the Controls panel to point at your own Filestack account; `onUploadDone` and `onError` are logged to the Actions panel.'
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
      maxFiles: 5,
      fromSources: ['local_file_system', 'url', 'imagesearch']
    }
  }
};

export const MultipleFilesWithTransform = {
  args: {
    pickerOptions: {
      maxFiles: 10,
      transformations: {
        crop: { aspectRatio: 1.7777, force: true },
        circle: false
      }
    }
  }
};

export const CustomContainer = {
  render: (args) => (
    <PickerOverlay {...args}>
      <div
        style={{
          width: '100%',
          minHeight: 500,
          border: '2px dashed #888',
          padding: 24,
          boxSizing: 'border-box'
        }}
      >
        <p style={{ margin: 0 }}>
          A custom child element. <code>PickerOverlay</code> clones it and
          attaches the generated container id.
        </p>
      </div>
    </PickerOverlay>
  )
};
