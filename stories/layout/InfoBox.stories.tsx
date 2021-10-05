import React from 'react';
import { Story, Meta } from '@storybook/react';
import { InfoBox, InfoBoxProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: InfoBox,
  title: 'Discord UI Toolkit/Layout/InfoBox',
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
    width: {
      defaultValue: '100%',
      description: 'Width of the divider.',
      control: {
        type: 'text',
      },
    },
    variant: {
      defaultValue: 'normal',
      description: 'The variant of the info box.',
      control: {
        type: 'inline-radio',
        options: ['normal', 'error', 'warning', 'notice'],
      },
    },
  },
} as Meta;

export const Template: Story<InfoBoxProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <InfoBox {...props}>Info Box</InfoBox>
  </DiscordProvider>
);
