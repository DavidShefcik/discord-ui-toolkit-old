import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from 'discord-ui-toolkit';

describe('<SearchInput />', () => {
  const mockChange = jest.fn();

  it('should render', () => {
    render(<SearchInput value="" onChange={mockChange} placeholder="Search" />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
  it('should have the given value', () => {
    render(<SearchInput value="value" onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('value');
  });
  it('should change the value of the input on typing', () => {
    let value = '';
    const lockMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(<SearchInput value={value} onChange={lockMockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), 'hello world');
    rerender(<SearchInput value={value} onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('hello world');
  });
});
