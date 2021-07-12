import React from 'react';
import { screen, render } from '@testing-library/react';

import { MentionBadge } from 'discord-ui-toolkit';

describe('<MentionBadge />', () => {
  it('should render', () => {
    render(<MentionBadge text="10" />);

    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
