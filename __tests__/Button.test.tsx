import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { Button } from '../src/components';

describe('<Button />', () => {
  const mockClick = jest.fn();

  it('should render', () => {
    render(<Button text="Button" type="blurple" onClick={mockClick} />);

    expect(screen.getByRole('button', { name: /button/i })).toBeInTheDocument();
  });
  it('should fire the mockClick function on click', () => {
    render(<Button text="Button" type="blurple" onClick={mockClick} />);

    userEvent.click(screen.getByRole('button', { name: /button/i }));

    expect(mockClick).toHaveBeenCalled();
  });
  it('should be disabled if the disabled prop is true', () => {
    render(<Button text="Button" type="blurple" onClick={mockClick} disabled />);

    expect(screen.getByRole('button', { name: /button/i })).toBeDisabled();
  });
  it('should be disabled if the loading prop is true', () => {
    render(<Button text="Button" type="blurple" onClick={mockClick} loading />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
