import React from 'react';
import { screen, render } from '@testing-library/react';

import { ColorPicker } from 'discord-ui-toolkit';

describe('<ColorPicker />', () => {
  it('should render', () => {
    render(<ColorPicker value="ffffff" onChange={jest.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
