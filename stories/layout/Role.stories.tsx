import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Role, RoleProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: Role,
  title: 'Discord UI Toolkit/Layout/Role',
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
      defaultValue: 'Role',
      description: 'The role text.',
      control: {
        type: 'text',
      },
    },
    color: {
      defaultValue: '#ffffff',
      description: 'The role color.',
      control: {
        type: 'color',
      },
    },
    hoverRemoveIcon: {
      defaultValue: true,
      description: 'Show an X on the role circle upon hover.',
      control: {
        type: 'boolean',
      },
    },
    hoverRemoveIconColor: {
      defaultValue: '#2f3136',
      description: 'The color of the role circle X.',
      control: {
        type: 'color',
      },
    },
  },
} as Meta;

export const Template: Story<RoleProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Role {...props} onClick={(role) => console.log(role)} />
  </DiscordProvider>
);
