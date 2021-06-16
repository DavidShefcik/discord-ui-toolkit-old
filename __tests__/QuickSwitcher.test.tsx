import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QuickSwitcher } from 'discord-ui-toolkit';

import ModalContext from '@internal/context/ModalContext';

describe('<QuickSwitcher />', () => {
  it('should render', () => {
    render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <QuickSwitcher value="" onChange={jest.fn()} visible setVisible={jest.fn()}>
          Quick Switcher
        </QuickSwitcher>
      </ModalContext.Provider>
    );

    expect(screen.getByText(/quick switcher/i)).toBeInTheDocument();
  });
  it('should render children', () => {
    render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <QuickSwitcher value="" onChange={jest.fn()} visible setVisible={jest.fn()}>
          Quick Switcher
        </QuickSwitcher>
      </ModalContext.Provider>
    );

    expect(screen.getByText(/quick switcher/i)).toBeInTheDocument();
  });
  it('should render the value in the input', () => {
    render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <QuickSwitcher value="value" onChange={jest.fn()} visible setVisible={jest.fn()} placeholder="Placeholder">
          Quick Switcher
        </QuickSwitcher>
      </ModalContext.Provider>
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('value');
  });
  it('should change value upon typing in the text input', () => {
    let value = '';
    const localMockChange = jest.fn().mockImplementation((val: string) => {
      value += val;
    });

    const { rerender } = render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <QuickSwitcher
          value={value}
          onChange={localMockChange}
          visible
          setVisible={jest.fn()}
          placeholder="Placeholder"
        >
          Quick Switcher
        </QuickSwitcher>
      </ModalContext.Provider>
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('');

    userEvent.type(screen.getByPlaceholderText(/placeholder/i), 'hello world');
    rerender(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <QuickSwitcher
          value={value}
          onChange={localMockChange}
          visible
          setVisible={jest.fn()}
          placeholder="Placeholder"
        >
          Quick Switcher
        </QuickSwitcher>
      </ModalContext.Provider>
    );

    expect(screen.getByPlaceholderText(/placeholder/i)).toHaveValue('hello world');
  });
});
