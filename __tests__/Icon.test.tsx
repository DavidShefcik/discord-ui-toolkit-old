import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Icon } from 'discord-ui-toolkit';

describe('<Icon />', () => {
  const mockClick = jest.fn();

  it('should render', () => {
    render(<Icon icon="discord" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should fire the mockClick function on click', () => {
    render(<Icon icon="discord" onClick={mockClick} />);

    userEvent.click(screen.getByRole('button'));

    expect(mockClick).toHaveBeenCalled();
  });
});
