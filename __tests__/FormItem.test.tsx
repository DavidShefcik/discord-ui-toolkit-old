import React from 'react';
import { screen, render } from '@testing-library/react';

import { FormItem } from 'discord-ui-toolkit';

describe('<FormItem />', () => {
  it('should render', () => {
    render(
      <FormItem label="Label">
        <p>Form Item</p>
      </FormItem>
    );

    expect(screen.getByText(/label/i)).toBeInTheDocument();
  });
  it('should show the error message if error is true', () => {
    render(
      <FormItem label="Label" error errorMessage="Error Message">
        <p>Form Item</p>
      </FormItem>
    );

    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
  it('should show the required indicator if requiredIndicator is true', () => {
    render(
      <FormItem label="Label" requiredIndicator>
        <p>Form Item</p>
      </FormItem>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
