import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DiscordProvider, ContextMenuItem } from 'discord-ui-toolkit';

describe('<DiscordProvider />', () => {
  const children = (
    <div>
      <p>Discord Provider</p>
    </div>
  );
  const mockClick = jest.fn();
  const mockShiftClick = jest.fn();
  const contextMenuItems: ContextMenuItem[] = [
    {
      id: 0,
      type: 'item',
      text: 'Item 1',
    },
    {
      id: 1,
      type: 'item',
      text: 'Item 2',
      onClick: mockClick,
    },
    {
      id: 2,
      type: 'item',
      text: 'Item 3',
    },
    {
      id: 3,
      type: 'divider',
    },
    {
      id: 4,
      type: 'item',
      text: 'Item 4',
    },
    {
      id: 5,
      type: 'item',
      text: 'Item 5',
      onShiftClick: mockShiftClick,
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<DiscordProvider>{children}</DiscordProvider>);

    expect(screen.getByText(/discord provider/i)).toBeInTheDocument();
  });
  it('should render the default context menu if enableCustomContextMenu is false', () => {
    render(
      <DiscordProvider enableCustomContextMenu={false} contextMenuItems={contextMenuItems}>
        {children}
      </DiscordProvider>
    );

    expect(screen.getByText(/discord provider/i)).toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText(/discord provider/i));

    expect(screen.queryByText(/Item 1/)).not.toBeInTheDocument();
  });
  it('should render the custom context menu if enableCustomContextMenu is true', () => {
    render(
      <DiscordProvider enableCustomContextMenu contextMenuItems={contextMenuItems}>
        {children}
      </DiscordProvider>
    );

    expect(screen.getByText(/discord provider/i)).toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText(/discord provider/i));

    expect(screen.getByText(/Item 1/)).toBeInTheDocument();
    expect(screen.getByText(/Item 2/)).toBeInTheDocument();
    expect(screen.getByText(/Item 3/)).toBeInTheDocument();
    expect(screen.getByText(/Item 4/)).toBeInTheDocument();
    expect(screen.getByText(/Item 5/)).toBeInTheDocument();
  });
  it('should should fire the onClick event for a custom context menu item', () => {
    render(
      <DiscordProvider enableCustomContextMenu contextMenuItems={contextMenuItems}>
        {children}
      </DiscordProvider>
    );

    expect(screen.getByText(/discord provider/i)).toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText(/discord provider/i));

    expect(screen.getByText(/Item 2/)).toBeInTheDocument();

    expect(mockClick).toBeCalledTimes(0);
    userEvent.click(screen.getByText(/Item 2/));

    expect(mockClick).toBeCalledTimes(1);
  });
  it('should should fire the shift onClick event for a custom context menu item', () => {
    render(
      <DiscordProvider enableCustomContextMenu contextMenuItems={contextMenuItems}>
        {children}
      </DiscordProvider>
    );

    expect(screen.getByText(/discord provider/i)).toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText(/discord provider/i));

    expect(screen.getByText(/Item 5/)).toBeInTheDocument();

    expect(mockShiftClick).toBeCalledTimes(0);
    userEvent.click(screen.getByText(/Item 5/), { shiftKey: true });

    expect(mockShiftClick).toBeCalledTimes(1);
  });
  it('should close the custom context menu if enableCustomContextMenu is changed to false', () => {
    const { rerender } = render(
      <DiscordProvider enableCustomContextMenu contextMenuItems={contextMenuItems}>
        {children}
      </DiscordProvider>
    );

    expect(screen.getByText(/discord provider/i)).toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText(/discord provider/i));

    expect(screen.getByText(/Item 1/)).toBeInTheDocument();

    rerender(
      <DiscordProvider enableCustomContextMenu={false} contextMenuItems={contextMenuItems}>
        {children}
      </DiscordProvider>
    );

    expect(screen.queryByText(/Item 1/)).not.toBeInTheDocument();

    fireEvent.contextMenu(screen.getByText(/discord provider/i));
    expect(screen.queryByText(/Item 1/)).not.toBeInTheDocument();
  });
});
