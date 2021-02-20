import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import Button from '../src/components/inputs/Button';

describe('<Button />', () => {
  afterEach(cleanup);
  const mockClick = jest.fn();
  it('should render', () => {
    render(<Button />);

    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
