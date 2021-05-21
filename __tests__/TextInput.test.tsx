import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '../src/components';

describe('<TextInput />', () => {
  const mockChange = jest.fn();

  it('should render', () => {
    render(<TextInput value="" onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toBeInTheDocument();
  });
  it('should have the given value', () => {
    render(<TextInput value="value" onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('value');
  });
  it('should change the value of the input on typing', () => {
    let value = '';
    const lockMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(<TextInput value={value} onChange={lockMockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), 'hello world');
    rerender(<TextInput value={value} onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('hello world');
  });
  it('should not change the value if disabled is true', () => {
    let value = '';
    const lockMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(
      <TextInput value={value} onChange={lockMockChange} placeholder="Placeholder" disabled />
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), 'hello world');
    rerender(<TextInput value={value} onChange={mockChange} placeholder="Placeholder" disabled />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');
  });
  it('should show the prefix if one is set', () => {
    render(<TextInput value="Value" prefix="Prefix" onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByText(/prefix/i)).toBeInTheDocument();
  });
  it('should remove the first letter if it is the same as the prefix', () => {
    let value = '';
    const lockMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(
      <TextInput value={value} onChange={lockMockChange} prefix="#" placeholder="Placeholder" />
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');
    expect(screen.getByText(/#/)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), '#value');
    rerender(<TextInput value={value} onChange={mockChange} prefix="#" placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('value');
  });
});
