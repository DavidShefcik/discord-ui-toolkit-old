import React from 'react';
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
      description: 'The variant of the Text component to use.',
      table: {
        disabled: true,
      },
    },
  },
} as Meta;

export const OldNormal: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} />
  </DiscordProvider>
);

export const OldThin: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="old_thin" />
  </DiscordProvider>
);

export const OldBold: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="old_bold" />
  </DiscordProvider>
);

export const FunThin: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="fun_thin" />
  </DiscordProvider>
);

export const FunNormal: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="fun_normal" />
  </DiscordProvider>
);

export const FunBold: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="fun_bold" />
  </DiscordProvider>
);

export const NewTitle: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="new_title" />
  </DiscordProvider>
);

export const Subtitle: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="subtitle" />
  </DiscordProvider>
);

export const Link: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="link" />
  </DiscordProvider>
);

export const SmallCodeBlock: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="small_code_block" />
  </DiscordProvider>
);

export const LargeCodeBlock: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="large_code_block" />
  </DiscordProvider>
);

export const Mention: Story<TextProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <Text {...props} variant="mention" />
  </DiscordProvider>
);
