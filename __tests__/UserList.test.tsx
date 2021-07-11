import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserList, UserListCategory, UserListItem, GreenNewDefaultAvatar } from 'discord-ui-toolkit';

describe('<UserList />', () => {
  const mockCategoryRightIconClick = jest.fn();
  const mockUserItemClick = jest.fn();

  const categories: UserListCategory[] = [
    {
      id: 0,
      label: 'First Category',
    },
    {
      id: 1,
      label: 'Second Category',
      showItemCount: false,
    },
    {
      id: 2,
      label: 'Third Category',
      rightIcon: 'thin_plus',
      onRightIconClick: mockCategoryRightIconClick,
    },
  ];
  const items: UserListItem[] = [
    {
      id: 0,
      avatarSource: GreenNewDefaultAvatar,
      username: 'First Username',
      categoryId: 3,
    },
    {
      id: 1,
      avatarSource: GreenNewDefaultAvatar,
      username: 'Second Username',
      statusText: 'Status Text',
      boldStatusText: 'Bold Status Text',
      categoryId: 1,
      onClick: mockUserItemClick,
      leftStatusIcon: 'old_discord',
      rightStatusIcon: 'old_discord',
      rightUserIcon: 'old_discord',
      userTagText: 'User Tag',
    },
    {
      id: 2,
      avatarSource: GreenNewDefaultAvatar,
      username: 'Third Username',
      categoryId: 0,
    },
    {
      id: 3,
      avatarSource: GreenNewDefaultAvatar,
      username: 'Fourth Username',
      categoryId: 2,
    },
    {
      id: 4,
      avatarSource: GreenNewDefaultAvatar,
      username: 'Without Category Username',
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('First Category')).toBeInTheDocument();
  });
  it('should render the categories', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('First Category')).toBeInTheDocument();
    expect(screen.getByText('Second Category')).toBeInTheDocument();
    expect(screen.getByText('Third Category')).toBeInTheDocument();
  });
  it('should render the list items', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('First Username')).toBeInTheDocument();
    expect(screen.getByText('Second Username')).toBeInTheDocument();
    expect(screen.getByText('Third Username')).toBeInTheDocument();
    expect(screen.getByText('Without Category Username')).toBeInTheDocument();
  });
  it('should render the list items without a category when showItemsWithoutCategory is true', () => {
    render(<UserList categories={categories} items={items} showItemsWithoutCategory />);

    expect(screen.getByText('Without Category Username')).toBeInTheDocument();
  });
  it('should not render the list items without a category when showItemsWithoutCategory is false', () => {
    render(<UserList categories={categories} items={items} showItemsWithoutCategory={false} />);

    expect(screen.queryByText('Without Category Username')).not.toBeInTheDocument();
  });
  it('should render the list item avatar', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getAllByAltText('Avatar').length).toBe(5);
  });
  it('should render the list item username', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('Second Username')).toBeInTheDocument();
  });
  it('should render the list item user tag', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('User Tag')).toBeInTheDocument();
  });
  it('should render the list item status text', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('Status Text')).toBeInTheDocument();
  });
  it('should render the list item bold status text', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('Bold Status Text')).toBeInTheDocument();
  });
  it('should render the list item left status icon', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByLabelText('Left Status Icon')).toBeInTheDocument();
  });
  it('should render the list item right status icon', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByLabelText('Right Status Icon')).toBeInTheDocument();
  });
  it('should render the list item right user icon', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByLabelText('Right User Icon')).toBeInTheDocument();
  });
  it('should fire onClick when the list item is clicked', () => {
    render(<UserList categories={categories} items={items} />);

    expect(mockUserItemClick).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByText('Second Username'));

    expect(mockUserItemClick).toHaveBeenCalledTimes(1);
  });
  it('should render the category label', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByText('First Category')).toBeInTheDocument();
  });
  it('should render the category item count if showItemCount is true', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getAllByText(/1/i).length).toBe(2);
  });
  it('should render the category right icon', () => {
    render(<UserList categories={categories} items={items} />);

    expect(screen.getByLabelText('Right Category Icon')).toBeInTheDocument();
  });
});
