import React from 'react';
import { screen, render } from '@testing-library/react';

import { UserTag } from 'discord-ui-toolkit';

describe('<UserTag />', () => {
  it('should render', () => {
    render(<UserTag text="Text" />);

    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
  it('should render the checkmark', () => {
    render(<UserTag text="Text" checkmark />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
