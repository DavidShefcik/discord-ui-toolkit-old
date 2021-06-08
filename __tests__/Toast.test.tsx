import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toast } from 'discord-ui-toolkit';

describe('<Toast />', () => {
  const mockCancelClick = jest.fn();
  const mockOkClick = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<Toast text="Toast" visible setVisible={jest.fn()} />);

    expect(screen.getByText(/toast/i)).toBeInTheDocument();
  });
  it('should not render if visible is false', () => {
    render(<Toast text="Toast" visible={false} setVisible={jest.fn()} />);

    expect(screen.queryByText(/toast/i)).not.toBeInTheDocument();
  });
  it('should show the cancel button text if any is passed', () => {
    render(<Toast text="Toast" visible setVisible={jest.fn()} cancelText="Cancel" />);

    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });
  it('should show the ok button text if any is passed', () => {
    render(<Toast text="Toast" visible setVisible={jest.fn()} okText="Ok" />);

    expect(screen.getByText(/ok/i)).toBeInTheDocument();
  });
  it('should fire onCancel if cancelText is passed and onCancelClick is passed', () => {
    render(<Toast text="Toast" visible setVisible={jest.fn()} cancelText="Cancel" onCancelClick={mockCancelClick} />);

    expect(mockCancelClick).toHaveBeenCalledTimes(0);
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/cancel/i));

    expect(mockCancelClick).toHaveBeenCalledTimes(1);
  });
  it('should fire onOk if okText is passed and onOkClick is passed', () => {
    render(<Toast text="Toast" visible setVisible={jest.fn()} okText="Ok" onOkClick={mockOkClick} />);

    expect(mockOkClick).toHaveBeenCalledTimes(0);
    expect(screen.getByText(/ok/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/ok/i));

    expect(mockOkClick).toHaveBeenCalledTimes(1);
  });
});
