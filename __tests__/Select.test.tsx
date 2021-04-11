/* eslint-disable no-return-assign */
import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select, SelectItemProps } from '../src/components';

describe('<Select />', () => {
  const items: SelectItemProps[] = [
    {
      id: '0',
      label: 'First Item',
    },
    {
      id: '1',
      label: 'Second Item',
      icon: 'hashtag',
    },
    {
      id: '2',
      label: 'Third Item',
      heplerText: 'Helper Text',
    },
    {
      id: '3',
      label: 'Fourth Item',
      emoji: '😀',
    },
  ];

  it('should render', () => {
    render(<Select items={items} value={null} onChange={jest.fn()} />);

    expect(screen.getByText(/first item/i)).toBeInTheDocument();
  });
  it('should should dropdown on click', () => {
    render(<Select items={items} value={null} onChange={jest.fn()} />);
    userEvent.click(screen.getByText(/first item/i));
    expect(screen.getByText(/second item/i)).toBeInTheDocument();
    expect(screen.getByText(/third item/i)).toBeInTheDocument();
  });
  it('should should show helper text', () => {
    render(<Select items={items} value={items[2]} onChange={jest.fn()} />);
    expect(screen.getByText(/helper text/i)).toBeInTheDocument();
  });
  it('should have the first value is the value passed is null', () => {
    render(<Select items={items} value={null} onChange={jest.fn()} />);

    expect(screen.getByText(/first item/i)).toBeInTheDocument();
  });
  it('should show the unselected label if one is provided and the value pased is null', () => {
    render(<Select items={items} value={null} unselectedLabel="Unselected Label" onChange={jest.fn()} />);
    expect(screen.getByText(/unselected label/i)).toBeInTheDocument();
  });
  it('should not show the unselected label if one is provided but the value passed is not null', () => {
    render(<Select items={items} value={items[0]} unselectedLabel="Unselected Label" onChange={jest.fn()} />);
    expect(screen.getByText(/first item/i)).toBeInTheDocument();
  });
  it('should hide dropdown on item click', () => {
    render(<Select items={items} value={items[0].id} onChange={jest.fn()} />);
    // Currently selected item is rendered
    expect(screen.getByText(/first item/i)).toBeInTheDocument();
    // Show the menu
    userEvent.click(screen.getByText(/first item/i));
    // Check if the menu is rendered
    expect(screen.getByText(/second item/i)).toBeInTheDocument();
    expect(screen.getByText(/third item/i)).toBeInTheDocument();
    // Select the second item
    userEvent.click(screen.getByText(/second item/i));
    // Check if dropdown is hidden
    expect(screen.queryByText(/first item/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/third item/i)).not.toBeInTheDocument();
  });
  it('should change value on click', () => {
    let selectedItem = null;
    render(
      <Select items={items} value={selectedItem} onChange={(value: string | number | null) => (selectedItem = value)} />
    );
    expect(selectedItem).toBeNull();
    userEvent.click(screen.getByText(/first item/i));
    userEvent.click(screen.getByText(/second item/i));
    expect(selectedItem).not.toBeNull();
  });
  it('should change the select label on change', () => {
    render(<Select items={items} value={items[0]} onChange={jest.fn()} />);

    expect(screen.getByText(/first item/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/first item/i));
    expect(screen.getByText(/second item/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/second item/i));
    expect(screen.getByText(/second item/i)).toBeInTheDocument();
    expect(screen.queryByText(/first item/i)).not.toBeInTheDocument();
  });
  it('should not show menu on click if disabled', () => {
    render(<Select items={items} value={null} unselectedLabel="Unselected Label" onChange={jest.fn()} disabled />);
    expect(screen.getByText(/unselected label/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/unselected label/i));
    expect(screen.queryByText(/first item/i)).not.toBeInTheDocument();
  });
  it('should show the unselected label as a dropdown item if one is passed and unselectedAsOption is true', () => {
    render(
      <Select
        items={items}
        value={items[0]}
        onChange={jest.fn()}
        unselectedLabel="Unselected Label"
        unselectedAsOption
      />
    );

    expect(screen.getByText(/first item/i)).toBeInTheDocument();
    expect(screen.queryByText(/unselected label/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/first item/i));
    expect(screen.getByText(/unselected label/i)).toBeInTheDocument();
  });
  it('should throw an error if both an icon and emoji are on an item', () => {
    const brokenItems: SelectItemProps[] = [
      {
        id: '0',
        label: 'Item',
        emoji: '😀',
        icon: 'hashtag',
      },
    ];

    // Prevent console from being flooded with the thrown error
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});

    expect(() => {
      render(<Select items={brokenItems} value={items[0]} onChange={jest.fn()} />);
    }).toThrowError();

    console.error.mockRestore();
  });
  it('should show an emoji if one is passed on the currently selected item', () => {
    render(<Select items={items} value={items[3]} onChange={jest.fn()} />);

    expect(screen.getByAltText(/😀/)).toBeInTheDocument();
  });
});
