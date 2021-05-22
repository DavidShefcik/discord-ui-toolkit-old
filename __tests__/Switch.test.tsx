import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from 'discord-ui-toolkit';

describe('<Switch />', () => {
  let checked = false;
  const mockClick = jest.fn(() => {
    checked = !checked;
  });

  afterEach(() => {
    checked = false;
    jest.clearAllMocks();
  });

  it('should render', () => {
    render(<Switch value label="label" onChange={mockClick} />);

    expect(screen.getByRole('checkbox', { name: /label/i })).toBeInTheDocument();
  });
  it('should have a label of "label"', () => {
    render(<Switch value label="label" onChange={mockClick} />);

    expect(screen.getByText('label')).toBeInTheDocument();
  });
  it('should have a sublabel of "sublabel"', () => {
    render(<Switch value label="label" subLabel="sublabel" onChange={mockClick} />);

    expect(screen.getByText('sublabel')).toBeInTheDocument();
  });
  it('should change value upon click', () => {
    const { rerender } = render(<Switch value={checked} label="label" subLabel="sublabel" onChange={mockClick} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    userEvent.click(screen.getByRole('checkbox'));
    rerender(<Switch value={checked} label="label" subLabel="sublabel" onChange={mockClick} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    userEvent.click(screen.getByRole('checkbox'));
    rerender(<Switch value={checked} label="label" subLabel="sublabel" onChange={mockClick} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
  it('should fire onClick upon click', () => {
    render(<Switch value label="label" subLabel="sublabel" onChange={mockClick} />);

    expect(mockClick).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByRole('checkbox'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
  it('should not change value upon click when Switch is disabled', () => {
    render(<Switch value={false} label="label" subLabel="sublabel" onChange={mockClick} disabled />);

    expect(mockClick).toHaveBeenCalledTimes(0);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    userEvent.click(screen.getByRole('checkbox'));
    expect(mockClick).toHaveBeenCalledTimes(0);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
