import React from 'react';
import { Story, Meta } from '@storybook/react';
import { DiscordLoadingAnimation, DiscordLoadingAnimationProps } from 'discord-ui-toolkit';

export default {
  component: DiscordLoadingAnimation,
  title: 'Discord UI Toolkit/Layout/DiscordLoadingAnimation',
  argTypes: {
    size: {
      defaultValue: '100%',
      description: 'The size of the Discord loading animation video,',
      control: {
        type: 'text',
      },
    },
    version: {
      description: 'The version of the Discord loading animation to use.',
      table: {
        disable: true,
      },
    },
  },
} as Meta;

export const Old: Story<DiscordLoadingAnimationProps> = (props) => (
  <div style={{ width: '250px', height: '250px' }}>
    <DiscordLoadingAnimation {...props} version="old" />
  </div>
);
export const New: Story<DiscordLoadingAnimationProps> = (props) => (
  <div style={{ width: '250px', height: '250px' }}>
    <DiscordLoadingAnimation {...props} version="new" />
  </div>
);
