import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  ChannelList,
  ChannelListProps,
  ChannelListCategory,
  ChannelListItem,
  GreenNewDefaultAvatar,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: ChannelList,
  title: 'Discord UI Toolkit/Lists/ChannelList',
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
    width: {
      defaultValue: '224px',
      description: 'The width of the user list.',
      control: {
        type: 'text',
      },
    },
    text: {
      defaultValue: 'Text',
      description: 'The text of the channel list item.',
      control: {
        type: 'text',
      },
    },
    active: {
      defaultValue: false,
      description: 'If the channel list item should be displayed as active',
      control: {
        type: 'boolean',
      },
    },
    dull: {
      defaultValue: false,
      description: 'If the channel list item should be dull.',
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      defaultValue: false,
      description: 'If the channel list item should be disabled.',
      control: {
        type: 'boolean',
      },
    },
    indicateUnread: {
      defaultValue: false,
      description: 'If the channel list item should indicate there is an unread message.',
      control: {
        type: 'boolean',
      },
    },
    leftIcon: {
      defaultValue: 'hashtag',
      description: 'The icon or emoji for the left icon.',
      control: {
        type: 'text',
      },
    },
    mentionBadgeText: {
      defaultValue: '1',
      description: 'The text of the mention badge.',
      control: {
        type: 'text',
      },
    },
    showOnlyOnActive: {
      defaultValue: true,
      description: 'Show the right icon only when the list item is active.',
      control: {
        type: 'boolean',
      },
    },
    showOnlyOnHover: {
      defaultValue: false,
      description: 'Show the right icon only when the list item is hovered.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const items: ChannelListItem[] = [
  {
    id: 0,
    position: 1,
    text: 'First Item First Category',
    categoryId: 0,
    leftIcon: 'hashtag',
    onClick: (id) => console.log(id),
  },
  {
    id: 1,
    position: 2,
    text: 'Second Item First Category',
    categoryId: 0,
  },
  {
    id: 3,
    position: 3,
    text: 'Third Item First Category',
    categoryId: 0,
    visibleWhileCategoryCollapsed: true,
  },
  {
    id: 4,
    position: 1,
    text: 'Second Item Second Category',
    categoryId: 1,
  },
  {
    id: 5,
    position: 0,
    text: 'First Item Second Category',
    categoryId: 1,
  },
  {
    id: 6,
    position: 1,
    text: 'First Item Without Category',
  },
  {
    id: 7,
    position: 3,
    text: 'Second Item Without Category',
    leftIcon: <p>Left Icon</p>,
  },
];
const categories: ChannelListCategory[] = [
  {
    id: 0,
    position: 0,
    label: 'First Category',
    rightIcon: 'thin_plus',
  },
  {
    id: 1,
    position: 2,
    label: 'Second Category',
  },
];

export const WithoutCategories: Story<ChannelListProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ChannelList {...props} items={items} />
  </DiscordProvider>
);

export const WithCategories: Story<ChannelListProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ChannelList {...props} items={items} categories={categories} />
  </DiscordProvider>
);

export const DefaultChannelItem: Story<ChannelListProps & ChannelListItem & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ChannelList
      {...props}
      items={[
        {
          id: 0,
          position: 0,
          text: props.text,
        },
      ]}
      categories={[]}
    />
  </DiscordProvider>
);

export const DataChannelItem: Story<
  ChannelListProps & ChannelListItem & DiscordProviderProps & { showOnlyOnActive: boolean; showOnlyOnHover: boolean }
> = (props) => (
  <DiscordProvider {...props}>
    <ChannelList
      {...props}
      items={[
        {
          id: 0,
          position: 0,
          onClick: (id) => console.log(id),
          rightIcons: [
            {
              id: 0,
              icon: 'settings',
              showOnlyOnActive: props.showOnlyOnActive,
              showOnlyOnHover: props.showOnlyOnHover,
              onClick: (id, icon) => console.log(icon),
            },
          ],
          ...props,
        },
      ]}
      categories={[]}
    />
  </DiscordProvider>
);
