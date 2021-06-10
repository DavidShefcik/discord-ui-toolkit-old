import React from 'react';
import { screen, render } from '@testing-library/react';

import { InfoBox } from 'discord-ui-toolkit';

describe('<InfoBox />', () => {
  it('should render', () => {
    render(
      <InfoBox>
        <p>Info Box</p>
      </InfoBox>
    );

    expect(screen.getByText(/info box/i)).toBeInTheDocument();
  });
});
