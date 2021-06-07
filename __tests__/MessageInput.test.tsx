import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MessageInput } from 'discord-ui-toolkit';

describe('<MessageInput />', () => {
  it('should render', () => {
    render(<MessageInput value="value" onChange={jest.fn()} />);

    expect(screen.getByText(/value/i)).toBeInTheDocument();
  });
  it('should change value upon typing', () => {
    let value = '';
    const mockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });
    const { rerender } = render(<MessageInput value={value} onChange={mockChange} />);

    expect(screen.getByRole('textbox').innerHTML).toBe('');

    userEvent.type(screen.getByRole('textbox'), 'hello world');
    rerender(<MessageInput value={value} onChange={mockChange} />);

    expect(screen.getByRole('textbox').innerHTML).toBe('hello world');
  });
  it('should not change value upon typing when disabled is true', () => {
    let value = '';
    const mockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });
    const { rerender } = render(<MessageInput value={value} onChange={mockChange} disabled />);

    expect(screen.getByRole('textbox').innerHTML).toBe('');
    expect(mockChange).toBeCalledTimes(0);

    userEvent.type(screen.getByRole('textbox'), 'hello world');
    rerender(<MessageInput value={value} onChange={mockChange} />);

    expect(mockChange).toBeCalledTimes(0);
    expect(screen.getByRole('textbox').innerHTML).toBe('');
  });
  it('should display the placeholder if the value is an empty string', () => {
    render(<MessageInput value="" onChange={jest.fn()} placeholder="Placeholder" />);

    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
  });
  it('should fire onEnterPressed when the enter key is pressed', () => {
    const mockEnterPressed = jest.fn();

    render(<MessageInput value="" onChange={jest.fn()} onEnterPress={mockEnterPressed} />);

    expect(mockEnterPressed).toBeCalledTimes(0);
    userEvent.type(screen.getByRole('textbox'), '{enter}');

    expect(mockEnterPressed).toBeCalledTimes(1);
  });
  it('should display above input text', () => {
    render(
      <MessageInput
        value=""
        onChange={jest.fn()}
        placeholder="Placeholder"
        aboveInputVariant="notice"
        aboveInputText="Above message input text"
      />
    );

    expect(screen.getByText(/above message input text/i)).toBeInTheDocument();
  });
  it('should call above input text onClick when the above input text is clicked', () => {
    const mockAboveInputOnClick = jest.fn();

    render(
      <MessageInput
        value=""
        onChange={jest.fn()}
        aboveInputVariant="notice"
        aboveInputText="above message input text"
        aboveInputOnClick={mockAboveInputOnClick}
      />
    );

    expect(mockAboveInputOnClick).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText(/above message input text/i));

    expect(mockAboveInputOnClick).toHaveBeenCalledTimes(1);
  });
  it('should display under input text', () => {
    render(
      <MessageInput value="" onChange={jest.fn()} placeholder="Placeholder" underInputText="Under message input text" />
    );

    expect(screen.getByText(/under message input text/i)).toBeInTheDocument();
  });
  it('should display a side icon', () => {
    render(
      <MessageInput
        value=""
        onChange={jest.fn()}
        leftItems={[
          {
            id: '0',
            value: 'old_discord',
          },
        ]}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('should fire onClick for the side icon', () => {
    const mockIconClick = jest.fn();

    render(
      <MessageInput
        value=""
        onChange={jest.fn()}
        leftItems={[
          {
            id: '0',
            value: 'old_discord',
            onClick: mockIconClick,
          },
        ]}
      />
    );

    expect(mockIconClick).toBeCalledTimes(0);

    userEvent.click(screen.getByRole('button'));

    expect(mockIconClick).toBeCalledTimes(1);
  });
});
