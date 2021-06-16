import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ModalBase } from 'discord-ui-toolkit';

import ModalContext from '@internal/context/ModalContext';

describe('<ModalBase />', () => {
  it('should render', () => {
    render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <ModalBase visible setVisible={jest.fn()}>
          Modal Contents
        </ModalBase>
      </ModalContext.Provider>
    );

    expect(screen.getByText(/modal contents/i)).toBeInTheDocument();
  });
  it('should not be in the dom if visible is false', () => {
    render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <ModalBase visible={false} setVisible={jest.fn()}>
          Modal Contents
        </ModalBase>
      </ModalContext.Provider>
    );

    expect(screen.queryByText(/modal contents/i)).not.toBeInTheDocument();
  });
  it('should not close if closeOnOutsideClick is false and the user clicks outside of the modal', () => {
    let visible = true;

    const mockSetVisible = jest.fn().mockImplementation((value: boolean) => {
      visible = value;
    });

    const { rerender } = render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <p>Outside</p>
        <ModalBase closeOnOutsideClick={false} visible={visible} setVisible={mockSetVisible}>
          Modal Contents
        </ModalBase>
      </ModalContext.Provider>
    );

    expect(screen.getByText(/modal contents/i)).toBeInTheDocument();
    expect(mockSetVisible).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText(/outside/i));
    rerender(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <p>Outside</p>
        <ModalBase closeOnOutsideClick={false} visible={visible} setVisible={mockSetVisible}>
          Modal Contents
        </ModalBase>
      </ModalContext.Provider>
    );

    expect(screen.getByText(/modal contents/i)).toBeInTheDocument();
    expect(mockSetVisible).toHaveBeenCalledTimes(0);
  });
  it('should close if closeOnOutsideClick is true and the user clicks outside of the modal', async () => {
    let visible = true;

    const mockSetVisible = jest.fn().mockImplementation((value: boolean) => {
      visible = value;
    });

    const { rerender } = render(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <p>Outside</p>
        <ModalBase closeOnOutsideClick animated={false} visible={visible} setVisible={mockSetVisible}>
          Modal Contents
        </ModalBase>
      </ModalContext.Provider>
    );

    expect(screen.getByText(/modal contents/i)).toBeInTheDocument();
    expect(mockSetVisible).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByText(/outside/i));
    rerender(
      <ModalContext.Provider value={{ modalOpen: true, setModalOpen: jest.fn() }}>
        <p>Outside</p>
        <ModalBase closeOnOutsideClick animated={false} visible={visible} setVisible={mockSetVisible}>
          Modal Contents
        </ModalBase>
      </ModalContext.Provider>
    );

    expect(mockSetVisible).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByText(/modal contents/i)).not.toBeInTheDocument();
    });
  });
});
