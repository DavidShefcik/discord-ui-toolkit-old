import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Text, TextProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: Text,
  title: 'Discord UI Toolkit/Layout/Text',
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
    text: {
      defaultValue: 'Text',
      description: 'The content of the Text component.',
      control: {
        type: 'text',
      },
    },
    color: {
      defaultValue: '#ffffff',
      description: 'The color of the Text component content.',
      control: {
        type: 'color',
      },
    },
    variant: {
      defaultValue: 'title',
      description: 'The variant of the Text component to use.',
      control: {
        type: 'inline-radio',
        options: [
          'fun_thin',
          'fun_normal',
          'fun_bold',
          'old_thin',
          'old_normal',
          'old_bold',
          'old_title',
          'new_title',
          'subtitle',
          'link',
          'small_code_block',
          'large_code_block',
          'mention',
        ],
      },
    },
  },
} as Meta;

export const Template: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} />
  </DiscordProvider>
);
