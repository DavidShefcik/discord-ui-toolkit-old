import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from 'discord-ui-toolkit';

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
  it('should fire onEnterPress if enter is pressed and a function for onEnterPress is passed', () => {
    const mockEnterPress = jest.fn();
    render(<TextInput value="" onChange={mockChange} placeholder="Placeholder" onEnterPress={mockEnterPress} />);

    expect(mockEnterPress).toHaveBeenCalledTimes(0);
    userEvent.type(screen.getByPlaceholderText(/placeholder/i), '{enter}');

    expect(mockEnterPress).toHaveBeenCalledTimes(1);
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
  it('should prevent the prefix from being added to the value', () => {
    let value = '';
    const lockMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(
      <TextInput value={value} onChange={lockMockChange} placeholder="Placeholder" prefix="#" />
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), '#test');
    rerender(<TextInput value={value} onChange={mockChange} placeholder="Placeholder" prefix="#" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('test');
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
