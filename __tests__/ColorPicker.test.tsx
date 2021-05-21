import React from 'react';
import { screen, render } from '@testing-library/react';

import { ColorPicker } from '../src/components';

describe('<ColorPicker />', () => {
  it('should render', () => {
    render(<ColorPicker value="ffffff" onChange={jest.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
