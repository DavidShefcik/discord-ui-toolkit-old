import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ImageList, ImageListItem, GreenNewDefaultAvatar } from 'discord-ui-toolkit';

describe('<ImageList />', () => {
  const mockItemClick = jest.fn();

  const items: ImageListItem[] = [
    {
      id: 0,
      position: 0,
      type: 'icon',
      source: 'new_discord',
      hoverBackgroundColor: 'var(--blurple)',
      mentionBadgeText: '1',
    },
    {
      id: 1,
      position: 1,
      type: 'divider',
    },
    {
      id: 2,
      position: 2,
      type: 'image',
      source: GreenNewDefaultAvatar,
      mentionBadgeText: '2',
    },
    {
      id: 3,
      position: 3,
      type: 'image',
      source: GreenNewDefaultAvatar,
    },
    {
      id: 4,
      position: 4,
      type: 'image',
      source: GreenNewDefaultAvatar,
      mentionBadgeText: '5',
    },
    {
      id: 5,
      position: 5,
      type: 'image',
      source: GreenNewDefaultAvatar,
    },
    {
      id: 6,
      position: 6,
      type: 'icon',
      source: 'thin_plus',
      iconColor: 'var(--green)',
    },
    {
      id: 7,
      position: 7,
      type: 'icon',
      source: 'compass',
      iconColor: 'var(--green)',
    },
    {
      id: 8,
      position: 8,
      type: 'emoji',
      source: '😀',
    },
    {
      id: 9,
      position: 9,
      type: 'custom',
      source: <span>Custom</span>,
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<ImageList items={items} />);

    expect(screen.getAllByAltText(/List Item Image/i).length).toBeGreaterThan(0);
  });
  it('should render the item images', () => {
    render(<ImageList items={items} />);

    expect(screen.getAllByAltText(/List Item Image/i).length).toBeGreaterThan(0);
  });
  it('should render the item icons', () => {
    render(<ImageList items={items} />);

    expect(screen.getByLabelText(/new_discord/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/thin_plus/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/compass/i)).toBeInTheDocument();
  });
  it('should render the item emojis', () => {
    render(<ImageList items={items} />);

    expect(screen.getByAltText(/😀/i)).toBeInTheDocument();
  });
  it('should render the custom source component', () => {
    render(<ImageList items={items} />);

    expect(screen.getByText(/custom/i)).toBeInTheDocument();
  });
  it('should fire onClick when the item is clicked', () => {
    render(<ImageList items={items} onItemClick={mockItemClick} />);

    expect(mockItemClick).toBeCalledTimes(0);
    userEvent.click(screen.getAllByTestId('list-item')[0]);

    expect(mockItemClick).toBeCalledTimes(1);
  });
  it('should render the mention badge text', () => {
    render(<ImageList items={items} />);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });
});
