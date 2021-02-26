import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { Tooltip } from '../src/components';

describe('<Tooltip />', () => {
  it('render', () => {
    render(
      <Tooltip text="Tooltip">
        <p>Text</p>
      </Tooltip>,
    );

    userEvent.hover(screen.getByText(/text/i));
    expect(screen.getByText(/tooltip/i)).toBeInTheDocument();
  });

  it('should be visible only when paragraph is hovered over', () => {
    render(
      <Tooltip text="Tooltip">
        <p>Text</p>
      </Tooltip>,
    );

    userEvent.hover(screen.getByText(/text/i));
    expect(screen.getByText(/tooltip/i)).toBeVisible();
    userEvent.unhover(screen.getByText(/text/i));
    expect(screen.getByText(/tooltip/i)).not.toBeVisible();
  });
});
