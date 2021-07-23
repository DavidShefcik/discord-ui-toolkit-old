import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChannelList, ChannelListItem, ChannelListCategory } from 'discord-ui-toolkit';

describe('<ChannelList />', () => {
  const mockItemClick = jest.fn();
  const mockCategoryRightIconClick = jest.fn();
  const mockItemIconClick = jest.fn();

  const items: ChannelListItem[] = [
    {
      id: 0,
      position: 1,
      text: 'First Item First Category',
      categoryId: 0,
      leftIcon: 'hashtag',
      onClick: mockItemClick,
    },
    {
      id: 1,
      position: 2,
      text: 'Second Item First Category',
      categoryId: 0,
      visibleWhileCategoryCollapsed: true,
    },
    {
      id: 10,
      position: 3,
      text: 'Third Item First Category',
      categoryId: 0,
    },
    {
      id: 3,
      position: 1,
      text: 'Second Item Second Category',
      categoryId: 1,
      leftIcon: 'pin',
      onClick: mockItemClick,
      rightIcons: [
        {
          id: 0,
          icon: 'bell',
          onClick: mockItemIconClick,
        },
      ],
    },
    {
      id: 4,
      position: 0,
      text: 'First Item Second Category',
      categoryId: 1,
      rightIcons: [
        {
          id: 0,
          icon: 'rich_status',
          showOnlyOnActive: true,
        },
      ],
    },
    {
      id: 5,
      position: 1,
      text: 'First Item Without Category',
      rightIcons: [
        {
          id: 0,
          icon: 'gift',
          showOnlyOnHover: true,
        },
      ],
    },
    {
      id: 6,
      position: 3,
      text: 'Second Item Without Category',
      rightIcons: [
        {
          id: 0,
          icon: 'gif',
          showOnlyOnActive: true,
          showOnlyOnHover: true,
        },
      ],
    },
    {
      id: 7,
      position: 1,
      text: 'First Item Third Category',
      categoryId: 9,
    },
    {
      id: 8,
      position: 2,
      text: 'Active Item Third Category',
      active: true,
      categoryId: 9,
    },
    {
      id: 12,
      position: 1,
      text: 'First Item Fourth Category',
      categoryId: 11,
    },
  ];
  const categories: ChannelListCategory[] = [
    {
      id: 0,
      position: 0,
      label: 'First Category',
      rightIcon: 'thin_plus',
      onRightIconClick: mockCategoryRightIconClick,
    },
    {
      id: 1,
      position: 2,
      label: 'Second Category',
    },
    {
      id: 9,
      position: 4,
      label: 'Third Category',
      defaultCollapsed: true,
    },
    {
      id: 11,
      position: 5,
      label: 'Fourth Category',
      collapsible: false,
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('First Category')).toBeInTheDocument();
  });
  it('should render the category labels', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('First Category')).toBeInTheDocument();
    expect(screen.getByText('Second Category')).toBeInTheDocument();
  });
  it('should render the list item labels', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('First Item First Category')).toBeInTheDocument();
    expect(screen.getByText('Second Item First Category')).toBeInTheDocument();
    expect(screen.getByText('First Item Second Category')).toBeInTheDocument();
    expect(screen.getByText('Second Item Second Category')).toBeInTheDocument();
    expect(screen.getByText('First Item Without Category')).toBeInTheDocument();
    expect(screen.getByText('Second Item Without Category')).toBeInTheDocument();
  });
  it('should fire the item on click when the item is clicked', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(mockItemClick).toBeCalledTimes(0);
    userEvent.click(screen.getByText('First Item First Category'));

    expect(mockItemClick).toBeCalledTimes(1);
  });
  it('should render the list item left icon ', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getAllByLabelText('list-item-left-icon').length).toBeGreaterThan(0);
  });
  it('should render the list item right icons', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getAllByLabelText('list-item-right-icon').length).toBeGreaterThan(0);
  });
  it('should fire the onRightIconClick when the right icon is clicked', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(mockItemIconClick).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByLabelText('bell'));

    expect(mockItemIconClick).toBeCalledTimes(1);
  });
  it('should not fire the item onClick when the right icon is clicked', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(mockItemIconClick).toHaveBeenCalledTimes(0);
    expect(mockItemClick).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByLabelText('bell'));

    expect(mockItemIconClick).toBeCalledTimes(1);
    expect(mockItemClick).toHaveBeenCalledTimes(0);
  });
  it('should render the category right icon', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByLabelText('thin_plus')).toBeInTheDocument();
  });
  it('should fire the category onRightIconClick when the right icon is clicked', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(mockCategoryRightIconClick).toBeCalledTimes(0);
    userEvent.click(screen.getByLabelText('thin_plus'));

    expect(mockCategoryRightIconClick).toBeCalledTimes(1);
  });
  it('should render the category content when defaultCollapsed is false', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('Second Category')).toBeInTheDocument();
    expect(screen.getByText('First Item Second Category')).toBeInTheDocument();
  });
  it('should not render the category content when defaultCollapsed is true', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('Third Category')).toBeInTheDocument();
    expect(screen.queryByText('First Item Third Category')).not.toBeInTheDocument();
  });
  it('should toggle the category content visibility on category label click', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('First Category')).toBeInTheDocument();
    expect(screen.getByText('First Item First Category')).toBeInTheDocument();
    expect(screen.getByText('Third Item First Category')).toBeInTheDocument();

    userEvent.click(screen.getByText('First Category'));
    expect(screen.queryByText('First Item First Category')).not.toBeInTheDocument();
    expect(screen.queryByText('Third Item First Category')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('First Category'));
    expect(screen.getByText('First Item First Category')).toBeInTheDocument();
    expect(screen.getByText('Third Item First Category')).toBeInTheDocument();
  });
  it('should not toggle the category content visibility on category label click and collapsible is false', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('Fourth Category')).toBeInTheDocument();
    expect(screen.getByText('First Item Fourth Category')).toBeInTheDocument();

    userEvent.click(screen.getByText('Fourth Category'));
    expect(screen.getByText('First Item Fourth Category')).toBeInTheDocument();

    userEvent.click(screen.getByText('Fourth Category'));
    expect(screen.getByText('First Item Fourth Category')).toBeInTheDocument();
  });
  it('should render the category content where visibleWhileCategoryCollapsed is true and the category is collapsed', () => {
    render(<ChannelList items={items} categories={categories} />);

    expect(screen.getByText('First Category')).toBeInTheDocument();
    expect(screen.getByText('First Item First Category')).toBeInTheDocument();
    expect(screen.getByText('Second Item First Category')).toBeInTheDocument();
    expect(screen.getByText('Third Item First Category')).toBeInTheDocument();

    userEvent.click(screen.getByText('First Category'));
    expect(screen.queryByText('First Item First Category')).not.toBeInTheDocument();
    expect(screen.getByText('Second Item First Category')).toBeInTheDocument();
    expect(screen.queryByText('Third Item First Category')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('First Category'));
    expect(screen.getByText('First Item First Category')).toBeInTheDocument();
    expect(screen.getByText('Second Item First Category')).toBeInTheDocument();
    expect(screen.getByText('Third Item First Category')).toBeInTheDocument();
  });
});
