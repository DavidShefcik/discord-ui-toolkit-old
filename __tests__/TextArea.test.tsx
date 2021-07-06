import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from 'discord-ui-toolkit';

describe('<TextArea />', () => {
  const mockChange = jest.fn();

  it('should render', () => {
    render(<TextArea value="" onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toBeInTheDocument();
  });
  it('should have the given value', () => {
    render(<TextArea value="value" onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('value');
  });
  it('should change the value of the input on typing', () => {
    let value = '';
    const lockMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(<TextArea value={value} onChange={lockMockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), 'hello world');
    rerender(<TextArea value={value} onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('hello world');
  });
  it('should not change the value if disabled is true', () => {
    let value = '';
    const lockMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(
      <TextArea value={value} onChange={lockMockChange} placeholder="Placeholder" disabled />
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), 'hello world');
    rerender(<TextArea value={value} onChange={mockChange} placeholder="Placeholder" disabled />);

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');
  });
  it('should display the value length if showCharacterCount is true', () => {
    render(<TextArea value="value" onChange={mockChange} placeholder="Placeholder" />);

    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });
  it('should not display the value length if showCharacterCount is false', () => {
    render(<TextArea value="value" onChange={mockChange} placeholder="Placeholder" showCharacterCount={false} />);

    expect(screen.queryByText(/5/i)).not.toBeInTheDocument();
  });
});
