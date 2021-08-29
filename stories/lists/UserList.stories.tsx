import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  UserList,
  UserListProps,
  UserListCategory,
  UserListItem,
  GreenNewDefaultAvatar,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: UserList,
  title: 'Discord UI Toolkit/Lists/UserList',
  argTypes: {
    theme: {
      defaultValue: 'dark',
      description: 'The UI toolkit theme.',
      control: {
        type: 'inline-radio',
        options: ['dark', 'light'],
      },
    },
    newMarketingLayout: {
      defaultValue: false,
      description: "Use the new colors from Discord's 2021 rebranding.",
      control: {
        type: 'boolean',
      },
    },
    backgroundColor: {
      defaultValue: '#2f3136',
      description: 'The background color of the list.',
      control: {
        type: 'color',
      },
    },
    showItemsWithoutCategory: {
      defaultValue: true,
      description: 'Render list items without a category at the end of the list.',
      control: {
        type: 'boolean',
      },
    },
    width: {
      defaultValue: '224px',
      description: 'The width of the user list.',
      control: {
        type: 'text',
      },
    },
    height: {
      defaultValue: '100%',
      description: 'The height of the list.',
      control: {
        type: 'text',
      },
    },
    username: {
      defaultValue: 'Username',
      description: 'The username of the user item.',
      control: {
        type: 'text',
      },
    },
    usernameColor: {
      defaultValue: '#ffffff',
      description: 'The color of the username on the user item.',
      control: {
        type: 'color',
      },
    },
    categoryId: {
      defaultValue: 0,
      description: 'The category ID of the user item.',
      control: {
        type: 'number',
      },
    },
    dull: {
      defaultValue: false,
      description: 'If the user item has a dull looking opacity.',
      control: {
        type: 'boolean',
      },
    },
    statusText: {
      defaultValue: 'Status Text',
      description: 'The status text of the user item.',
      control: {
        type: 'text',
      },
    },
    boldStatusText: {
      defaultValue: 'Bold Status Text',
      description: 'The bold status text of the user item.',
      control: {
        type: 'text',
      },
    },
    userTagText: {
      defaultValue: 'BOT',
      description: 'The text of the user tag.',
      control: {
        type: 'text',
      },
    },
    userTagCheckmark: {
      defaultValue: false,
      description: 'Show the checkmark icon.',
      control: {
        type: 'boolean',
      },
    },
    userTagBlurple: {
      defaultValue: true,
      description: 'Should the background color of the user tag be blurple.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const items: UserListItem[] = [
  {
    id: 0,
    avatarSource: GreenNewDefaultAvatar,
    username: 'Username 1',
    categoryId: 1,
    rightUserIcon: 'boosting_filled',
    rightUserIconColor: 'var(--boost-purple)',
  },
  {
    id: 1,
    avatarSource: GreenNewDefaultAvatar,
    username: 'Username 2',
    categoryId: 1,
    statusText: 'Playing',
    boldStatusText: 'a game',
    rightStatusIcon: 'rich_status',
  },
  {
    id: 2,
    avatarSource: GreenNewDefaultAvatar,
    username: 'Username 3',
    categoryId: 0,
  },
  {
    id: 3,
    avatarSource: GreenNewDefaultAvatar,
    username: 'Username 4',
    userTagText: 'Without Category',
  },
  {
    id: 4,
    avatarSource: GreenNewDefaultAvatar,
    username: 'Username 4',
    leftStatusIcon: <span>Left Status Icon</span>,
  },
];
const categories: UserListCategory[] = [
  {
    id: 0,
    label: 'First Category',
    showItemCount: false,
  },
  {
    id: 1,
    label: 'Second Category',
    rightIcon: 'thin_plus',
    onRightIconClick: (id) => console.log(id),
  },
];

export const WithoutCategories: Story<UserListProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <UserList {...props} items={items} />
  </DiscordProvider>
);

export const WithCategories: Story<UserListProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <UserList {...props} items={items} categories={categories} />
  </DiscordProvider>
);

export const DefaultUserItem: Story<UserListProps & UserListItem & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <UserList
      {...props}
      items={[
        {
          id: 0,
          avatarSource: GreenNewDefaultAvatar,
          username: props.username,
        },
      ]}
      categories={categories}
    />
  </DiscordProvider>
);

export const DataUserItem: Story<UserListProps & UserListItem & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <UserList
      {...props}
      items={[
        {
          ...props,
          id: 0,
          avatarSource: GreenNewDefaultAvatar,
          onClick: (id) => console.log(id),
          leftStatusIcon: '😀',
          rightStatusIcon: 'new_discord',
          rightUserIcon: 'boosting_filled',
        },
      ]}
      categories={categories}
    />
  </DiscordProvider>
);
