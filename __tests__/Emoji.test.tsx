import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Emoji } from 'discord-ui-toolkit';

describe('<Emoji />', () => {
  const mockClick = jest.fn();

  it('should render', () => {
    render(<Emoji emoji="😀" />);

    expect(screen.getByAltText(/😀/i)).toBeInTheDocument();
  });
  it('should fire the mockClick function on click', () => {
    render(<Emoji emoji="😀" onClick={mockClick} />);

    userEvent.click(screen.getByAltText(/😀/i));

    expect(mockClick).toHaveBeenCalled();
  });
});
