import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckBox } from 'discord-ui-toolkit';

describe('<CheckBox />', () => {
  it('should render', () => {
    render(<CheckBox value={false} label="Checkbox" />);

    expect(screen.getByRole('checkbox', { name: /checkbox/i })).toBeInTheDocument();
  });
  it('should change the value upon click', () => {
    render(<CheckBox value={false} label="Checkbox" />);

    expect(screen.getByRole('checkbox', { name: /checkbox/i })).not.toBeChecked();
    userEvent.click(screen.getByRole('checkbox', { name: /checkbox/i }));
    expect(screen.getByRole('checkbox', { name: /checkbox/i })).toBeChecked();
    userEvent.click(screen.getByRole('checkbox', { name: /checkbox/i }));
    expect(screen.getByRole('checkbox', { name: /checkbox/i })).not.toBeChecked();
  });
  it('should not change the value upon click if the checkbox is disabled', () => {
    render(<CheckBox value={false} label="Checkbox" disabled />);

    expect(screen.getByRole('checkbox', { name: /checkbox/i })).not.toBeChecked();
    userEvent.click(screen.getByRole('checkbox', { name: /checkbox/i }));
    expect(screen.getByRole('checkbox', { name: /checkbox/i })).not.toBeChecked();
  });
});
