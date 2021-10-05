import React from 'react';
import { Story, Meta } from '@storybook/react';
import { UserTag, UserTagProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: UserTag,
  title: 'Discord UI Toolkit/Layout/UserTag',
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
    text: {
      defaultValue: 'Text',
      description: 'The content of the Text component.',
      control: {
        type: 'text',
      },
    },
    checkmark: {
      defaultValue: false,
      description: 'Show the checkmark icon.',
      control: {
        type: 'boolean',
      },
    },
    blurple: {
      defaultValue: true,
      description: 'Should the background color be blurple.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<UserTagProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <UserTag {...props} />
  </DiscordProvider>
);
