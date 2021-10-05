import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from 'discord-ui-toolkit';

import ThemeContext from '@internal/context/ThemeContext';

describe('<Modal />', () => {
  const mockSubmitClick = jest.fn();
  const mockCancelClick = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', newMarketingColors: true, setTheme: jest.fn() }}>
        <Modal visible setVisible={jest.fn()} title="Title" onSubmitClick={jest.fn()}>
          Modal Contents
        </Modal>
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
  it('should render the submit button', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', newMarketingColors: true, setTheme: jest.fn() }}>
        <Modal visible setVisible={jest.fn()} title="Title" onSubmitClick={jest.fn()} submitText="Submit">
          Modal Contents
        </Modal>
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });
  it('should call the onSubmitClick method when the submit button is clicked', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', newMarketingColors: true, setTheme: jest.fn() }}>
        <Modal visible setVisible={jest.fn()} title="Title" onSubmitClick={mockSubmitClick} submitText="Submit">
          Modal Contents
        </Modal>
      </ThemeContext.Provider>
    );

    expect(mockSubmitClick).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByText(/submit/i));

    expect(mockSubmitClick).toHaveBeenCalledTimes(1);
  });
  it('should make the submit button disabled if submitButtonDisabled is true', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', newMarketingColors: true, setTheme: jest.fn() }}>
        <Modal
          visible
          setVisible={jest.fn()}
          title="Title"
          onSubmitClick={mockSubmitClick}
          submitText="Submit"
          submitButtonDisabled
        >
          Modal Contents
        </Modal>
      </ThemeContext.Provider>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
  it('should make the submit button disabled if submitButtonLoading is true', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', newMarketingColors: true, setTheme: jest.fn() }}>
        <Modal
          visible
          setVisible={jest.fn()}
          title="Title"
          onSubmitClick={mockSubmitClick}
          submitText="Submit"
          submitButtonLoading
        >
          Modal Contents
        </Modal>
      </ThemeContext.Provider>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });
  it('should render the cancel button if text is passed for cancelText', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', newMarketingColors: true, setTheme: jest.fn() }}>
        <Modal visible setVisible={jest.fn()} title="Title" onSubmitClick={jest.fn()} cancelText="Cancel">
          Modal Contents
        </Modal>
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });
  it('should call the onCancelClick method when the cancel button is clicked', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark', newMarketingColors: true, setTheme: jest.fn() }}>
        <Modal
          visible
          setVisible={jest.fn()}
          title="Title"
          onSubmitClick={jest.fn()}
          submitText="Submit"
          cancelText="Cancel"
          onCancelClick={mockCancelClick}
        >
          Modal Contents
        </Modal>
      </ThemeContext.Provider>
    );

    expect(mockCancelClick).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByText(/cancel/i));

    expect(mockCancelClick).toHaveBeenCalledTimes(1);
  });
});
