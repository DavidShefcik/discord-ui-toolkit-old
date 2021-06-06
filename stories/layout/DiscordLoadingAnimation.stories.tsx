import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  DiscordLoadingAnimation,
  DiscordLoadingAnimationProps,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: DiscordLoadingAnimation,
  title: 'Discord UI Toolkit/Layout/DiscordLoadingAnimation',
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
    version: {
      defaultValue: 'old',
      description: 'The version of the Discord loading animation to use.',
      control: {
        type: 'inline-radio',
        options: ['old', 'new'],
      },
    },
    size: {
      defaultValue: '100%',
      description: 'The size of the Discord loading animation video,',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<DiscordLoadingAnimationProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <div style={{ width: '250px', height: '250px' }}>
      <DiscordLoadingAnimation {...props} />
    </div>
  </DiscordProvider>
);
