import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MentionBadge, MentionBadgeProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: MentionBadge,
  title: 'Discord UI Toolkit/Layout/MentionBadge',
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
      defaultValue: '1',
      description: 'The text of the mention badge.',
      control: {
        type: 'text',
      },
    },
    border: {
      defaultValue: false,
      description: 'Should the mention badge have a border.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<MentionBadgeProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <MentionBadge {...props} />
  </DiscordProvider>
);
