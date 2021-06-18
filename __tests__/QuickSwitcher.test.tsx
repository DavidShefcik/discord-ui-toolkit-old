import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QuickSwitcher } from 'discord-ui-toolkit';

describe('<QuickSwitcher />', () => {
  it('should render', () => {
    render(
      <QuickSwitcher value="" onChange={jest.fn()} visible setVisible={jest.fn()}>
        Quick Switcher
      </QuickSwitcher>
    );

    expect(screen.getByText(/quick switcher/i)).toBeInTheDocument();
  });
  it('should render children', () => {
    render(
      <QuickSwitcher value="" onChange={jest.fn()} visible setVisible={jest.fn()}>
        Quick Switcher
      </QuickSwitcher>
    );

    expect(screen.getByText(/quick switcher/i)).toBeInTheDocument();
  });
  it('should render the value in the input', () => {
    render(
      <QuickSwitcher value="value" onChange={jest.fn()} visible setVisible={jest.fn()} placeholder="Placeholder">
        Quick Switcher
      </QuickSwitcher>
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('value');
  });
  it('should change value upon typing in the text input', () => {
    let value = '';
    const localMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(
      <QuickSwitcher value={value} onChange={localMockChange} visible setVisible={jest.fn()} placeholder="Placeholder">
        Quick Switcher
      </QuickSwitcher>
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), 'hello world');
    rerender(
      <QuickSwitcher value={value} onChange={localMockChange} visible setVisible={jest.fn()} placeholder="Placeholder">
        Quick Switcher
      </QuickSwitcher>
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('hello world');
  });
});
