import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Text } from 'discord-ui-toolkit';

describe('<Text />', () => {
  const mockClick = jest.fn();

  it('should render', () => {
    render(<Text variant="old_normal" text="Text" color="#ffffff" />);

    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
  it('should call onClick when clicked', () => {
    render(<Text variant="old_normal" text="Text" color="#ffffff" onClick={mockClick} />);

    expect(screen.getByText(/text/i)).toBeInTheDocument();

    expect(mockClick).not.toHaveBeenCalled();
    userEvent.click(screen.getByText(/text/i));

    expect(mockClick).toHaveBeenCalled();
  });
});
