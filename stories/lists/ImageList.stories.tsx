import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  ImageList,
  ImageListProps,
  ImageListItem,
  ImageListImageItem,
  ImageListDividerItem,
  ImageListIconItem,
  ImageListEmojiItem,
  ImageListCustomItem,
  GreenNewDefaultAvatar,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: ImageList,
  title: 'Discord UI Toolkit/Lists/ImageList',
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
      defaultValue: '#202225',
      description: 'The background color of the list.',
      control: {
        type: 'color',
      },
    },
    direction: {
      defaultValue: 'vertical',
      description: 'The direction of the list contents.',
      control: {
        type: 'inline-radio',
        options: ['vertical', 'horizontal'],
      },
    },
    height: {
      defaultValue: '100%',
      description: 'The height of the list.',
      control: {
        type: 'text',
      },
    },
    type: {
      defaultValue: 'image',
      description: 'The type of the list item.',
      control: {
        type: 'inline-radio',
        options: ['image', 'divider', 'icon', 'emoji', 'custom'],
      },
    },
    source: {
      defaultValue: GreenNewDefaultAvatar,
      description: 'The image, emoji, icon, or component to use as the list item.',
      control: {
        type: 'text',
      },
    },
    active: {
      defaultValue: false,
      description: 'If the user list item should be displayed as active.',
      control: {
        type: 'boolean',
      },
    },
    mentionBadgeText: {
      defaultValue: '1',
      description: 'The text of the mention badge.',
      control: {
        type: 'text',
      },
    },
    hoverBackgroundColor: {
      defaultValue: '#3ba55c',
      description: 'The background color of the list item on hover.',
      control: {
        type: 'color',
      },
    },
    activeBackgroundColor: {
      defaultValue: '#3ba55c',
      description: 'The background color of the list item on active.',
      control: {
        type: 'color',
      },
    },
    indicateUnread: {
      defaultValue: false,
      description: 'If the image list item should indicate there is an unread message.',
      control: {
        type: 'boolean',
      },
    },
    iconColor: {
      defaultValue: '#359553',
      description: 'The color of icon of the list item.',
      control: {
        type: 'color',
      },
    },
    iconHoverColor: {
      defaultValue: '#ffffff',
      description: 'The color of icon of the list item on hover.',
      control: {
        type: 'color',
      },
    },
    iconActiveColor: {
      defaultValue: '#ffffff',
      description: 'The color of icon of the list item on active.',
      control: {
        type: 'color',
      },
    },
    emojiColored: {
      defaultValue: false,
      description: 'Should the list item emoji have color.',
      control: {
        type: 'boolean',
      },
    },
    emojiHoverColored: {
      defaultValue: true,
      description: 'Should the list item emoji have color on hover.',
      control: {
        type: 'boolean',
      },
    },
    emojiActiveColored: {
      defaultValue: true,
      description: 'Should the list item emoji have color on active.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const items: ImageListItem[] = [
  {
    id: 0,
    position: 0,
    type: 'icon',
    source: 'new_discord',
    hoverBackgroundColor: 'var(--blurple)',
    onClick: (id) => console.log(id),
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
    onClick: (id) => console.log(id),
    mentionBadgeText: '1',
  },
  {
    id: 3,
    position: 3,
    type: 'image',
    source: GreenNewDefaultAvatar,
    onClick: (id) => console.log(id),
  },
  {
    id: 4,
    position: 4,
    type: 'image',
    source: GreenNewDefaultAvatar,
    onClick: (id) => console.log(id),
    mentionBadgeText: '5',
  },
  {
    id: 5,
    position: 5,
    type: 'image',
    source: GreenNewDefaultAvatar,
    onClick: (id) => console.log(id),
  },
  {
    id: 6,
    position: 6,
    type: 'icon',
    source: 'thin_plus',
    iconColor: 'var(--green)',
    onClick: (id) => console.log(id),
  },
  {
    id: 7,
    position: 7,
    type: 'icon',
    source: 'compass',
    iconColor: 'var(--green)',
    onClick: (id) => console.log(id),
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

export const WithItems: Story<ImageListProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ImageList {...props} items={items} />
  </DiscordProvider>
);
export const ListItem: Story<ImageListProps & ImageListItem & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ImageList
      items={[
        {
          id: 0,
          position: 0,
          ...props,
        },
      ]}
      {...props}
    />
  </DiscordProvider>
);
export const ImageItem: Story<ImageListProps & ImageListItem & ImageListImageItem & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ImageList
      items={[
        {
          ...props,
          id: 0,
          position: 0,
          type: 'image',
          source: GreenNewDefaultAvatar,
          onClick: (id) => console.log(id),
        },
      ]}
      {...props}
    />
  </DiscordProvider>
);
export const DividerItem: Story<ImageListProps & ImageListItem & ImageListDividerItem & DiscordProviderProps> = (
  props
) => (
  <DiscordProvider {...props}>
    <ImageList
      items={[
        {
          ...props,
          id: 0,
          position: 0,
          type: 'divider',
        },
      ]}
      {...props}
    />
  </DiscordProvider>
);
export const IconItem: Story<ImageListProps & ImageListItem & ImageListIconItem & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ImageList
      items={[
        {
          ...props,
          id: 0,
          position: 0,
          type: 'icon',
          source: 'thin_plus',
          onClick: (id) => console.log(id),
        },
      ]}
      {...props}
    />
  </DiscordProvider>
);
export const EmojiItem: Story<ImageListProps & ImageListItem & ImageListEmojiItem & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <ImageList
      items={[
        {
          ...props,
          id: 0,
          position: 0,
          type: 'emoji',
          source: '😀',
          onClick: (id) => console.log(id),
        },
      ]}
      {...props}
    />
  </DiscordProvider>
);
export const CustomItem: Story<ImageListProps & ImageListItem & ImageListCustomItem & DiscordProviderProps> = (
  props
) => (
  <DiscordProvider {...props}>
    <ImageList
      items={[
        {
          ...props,
          id: 0,
          position: 0,
          type: 'custom',
          source: <span>Custom Item</span>,
          onClick: (id) => console.log(id),
        },
      ]}
      {...props}
    />
  </DiscordProvider>
);
