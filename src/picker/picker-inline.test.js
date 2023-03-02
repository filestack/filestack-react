import React from 'react';

import { render } from '@testing-library/react';
import PickerInline from './picker-inline';

describe('PickerInline component', () => {
  it('should render inline picker without child', () => {
    const { getByTestId } = render(<PickerInline apikey='x' />);
    expect(getByTestId('picker-inline')).toBeDefined();
  });

  it('should render inline picker', () => {
    const testId = 'picker-inline-container';
    const { getByTestId } = render(
      <PickerInline apikey='x'>
        <div data-testid={testId} />
      </PickerInline>
    );
    expect(getByTestId(testId)).toBeDefined();
  });
});
