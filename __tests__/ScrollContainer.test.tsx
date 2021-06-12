import React from 'react';
import { screen, render } from '@testing-library/react';

import { ScrollContainer } from 'discord-ui-toolkit';

describe('<ScrollContainer />', () => {
  it('should render', () => {
    render(<ScrollContainer>Scroll Container</ScrollContainer>);

    expect(screen.getByText(/scroll container/i)).toBeInTheDocument();
  });
});
