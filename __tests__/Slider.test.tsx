import React from 'react';
import { screen, render } from '@testing-library/react';

import { Slider } from 'discord-ui-toolkit';

describe('<Slider />', () => {
  it('should render', () => {
    render(<Slider value={50} onChange={jest.fn()} />);

    expect(screen.getByLabelText(/slider/i)).toBeInTheDocument();
  });
});
