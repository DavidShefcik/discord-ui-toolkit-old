import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Role } from 'discord-ui-toolkit';

describe('<Role />', () => {
  const mockClick = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<Role text="Role" />);

    expect(screen.getByText(/role/i)).toBeInTheDocument();
  });
  it('should fire onClick upon role color circle click if a function for onClick is provided', () => {
    render(<Role text="Role" onClick={mockClick} />);

    expect(mockClick).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByRole('button'));

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
  it('should show an X on the role color circle upon hover if hoverRemoveIcon is true', () => {
    render(<Role text="Role" onClick={mockClick} hoverRemoveIcon />);

    expect(screen.queryByRole('button', { name: /role remove icon/i })).not.toBeInTheDocument();
    userEvent.hover(screen.queryByRole('button', { name: /role circle/i }));

    expect(screen.getByRole('button', { name: /role remove icon/i })).toBeInTheDocument();
    userEvent.unhover(screen.queryByRole('button', { name: /role circle/i }));

    expect(screen.queryByRole('button', { name: /role remove icon/i })).not.toBeInTheDocument();
  });
});
