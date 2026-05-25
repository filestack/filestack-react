/* eslint-env jest */
jest.mock('filestack-js', () => ({
  __esModule: true,
  PickerDisplayMode: {
    overlay: 'overlay',
    inline: 'inline',
    dropPane: 'dropPane'
  },
  Filestack: () => ({
    picker: () => ({
      open: () => Promise.resolve(),
      close: () => Promise.resolve(true)
    })
  })
}));
