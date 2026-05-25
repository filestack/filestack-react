import { FilestackProvider, PickerInline } from 'filestack-react';

const meta = {
  title: 'Context/FilestackProvider',
  component: FilestackProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Provides shared `apikey`, `pickerOptions`, and `clientOptions` to any picker rendered inside it. Component-level props override the provider; `pickerOptions` and `clientOptions` are shallow-merged with the provider as the base.'
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
    pickerOptions: { maxFiles: 5 },
    clientOptions: {}
  }
};

export default meta;

export const SharedApikey = {
  render: (args) => (
    <FilestackProvider {...args}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16
        }}
      >
        <div>
          <h3 style={{ marginTop: 0, fontFamily: 'sans-serif' }}>
            Picker A (inherits everything)
          </h3>
          <PickerInline />
        </div>
        <div>
          <h3 style={{ marginTop: 0, fontFamily: 'sans-serif' }}>
            Picker B (inherits everything)
          </h3>
          <PickerInline />
        </div>
      </div>
    </FilestackProvider>
  )
};

export const ComponentOverridesProvider = {
  render: (args) => (
    <FilestackProvider {...args}>
      <div>
        <h3 style={{ marginTop: 0, fontFamily: 'sans-serif' }}>
          Override <code>pickerOptions.maxFiles</code> at the component level
        </h3>
        <p style={{ fontFamily: 'sans-serif', color: '#555' }}>
          Provider sets <code>maxFiles: 5</code>; this child sets
          <code> maxFiles: 1</code> and wins.
        </p>
        <PickerInline pickerOptions={{ maxFiles: 1 }} />
      </div>
    </FilestackProvider>
  )
};
