/** @type {import('@storybook/react-vite').Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#1a1a1a' }
      }
    },
    docs: {
      toc: true
    }
  },
  initialGlobals: {
    backgrounds: { value: 'light' }
  }
};

export default preview;
