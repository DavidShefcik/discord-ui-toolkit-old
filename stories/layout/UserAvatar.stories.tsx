import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  UserAvatar,
  UserAvatarProps,
  BlueNewDefaultAvatar,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: UserAvatar,
  title: 'Discord UI Toolkit/Layout/UserAvatar',
  argTypes: {
    theme: {
      defaultValue: 'dark',
      description: 'The UI toolkit theme.',
      control: {
        type: 'inline-radio',
        options: ['dark', 'light'],
      },
    },
    newMarketingColors: {
      defaultValue: false,
      description: "Use the new colors from Discord's 2021 rebranding.",
      control: {
        type: 'boolean',
      },
    },
    size: {
      defaultValue: 'large',
      description: 'The size of the user avatar.',
      control: {
        type: 'inline-radio',
        values: ['small', 'large'],
      },
    },
  },
} as Meta;

export const Template: Story<UserAvatarProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <UserAvatar {...props} avatarSource={BlueNewDefaultAvatar} />
  </DiscordProvider>
);
