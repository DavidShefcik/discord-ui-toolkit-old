import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio, RadioItem } from 'discord-ui-toolkit';

describe('<Radio />', () => {
  let currentSelectedId: string | number = 0;
  const mockClick = jest.fn((value: string | number) => {
    currentSelectedId = value;
  });

  afterEach(() => {
    currentSelectedId = 0;
    jest.clearAllMocks();
  });

  const radioItems: RadioItem[] = [
    {
      id: 0,
      title: 'Title',
    },
    {
      id: 1,
      title: 'Title 2',
      description: 'Description',
    },
    {
      id: 2,
      title: 'Title 3',
      description: 'Description',
    },
  ];

  it('should render', () => {
    render(<Radio items={radioItems} value={currentSelectedId} onChange={mockClick} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('should fire the onChange function upon click', () => {
    render(<Radio items={radioItems} value={currentSelectedId} onChange={mockClick} />);

    userEvent.click(screen.getByText('Title'));
    expect(mockClick).toHaveBeenCalled();
  });
  it('should change what item is selected upon click', () => {
    render(<Radio items={radioItems} value={currentSelectedId} onChange={mockClick} />);

    expect(currentSelectedId).toBe(0);
    userEvent.click(screen.getByText('Title 2'));
    expect(currentSelectedId).toBe(1);
    userEvent.click(screen.getByText('Title 3'));
    expect(currentSelectedId).toBe(2);
  });
});
