import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonTypes, ButtonProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: Button,
  title: 'Discord UI Toolkit/Inputs/Button',
  argTypes: {
    newMarketingColors: {
      defaultValue: false,
      description: "Use the new colors from Discord's 2021 rebranding.",
      control: {
        type: 'boolean',
      },
    },
    text: {
      defaultValue: 'Button',
      description: 'The text of the button.',
      control: {
        type: 'text',
      },
    },
    type: {
      defaultValue: 'blurple',
      description: 'The button type.',
      control: {
        type: 'inline-radio',
        options: [
          'blurple',
          'greyple',
          'green',
          'red_filled',
          'red_empty',
          'white_empty',
          'only_text',
        ] as ButtonTypes[],
      },
    },
    size: {
      defaultValue: 'normal',
      description: 'The size of the button.',
      control: {
        type: 'inline-radio',
        options: ['small', 'normal', 'large', 'full', 'custom'],
      },
    },
    disabled: {
      description: 'Is the button disabled.',
      table: {
        disabled: true,
      },
    },
    loading: {
      description: 'Is the button loading. Shows a loading animation and disables button.',
      table: {
        disabled: true,
      },
    },
    width: {
      defaultValue: 'auto',
      description: 'Width of the button.',
      control: {
        type: 'text',
      },
    },
    height: {
      defaultValue: 'auto',
      description: 'Height of the button.',
      control: {
        type: 'text',
      },
    },
    childrenPosition: {
      defaultValue: 'left',
      description: 'The side of the button the children will be on.',
      control: {
        type: 'inline-radio',
        options: ['left', 'right'],
      },
    },
  },
} as Meta;

export const Default: Story<ButtonProps & DiscordProviderProps> = (props) => {
  const { newMarketingColors } = props;

  const click = () => console.log('Button click');

  return (
    <DiscordProvider newMarketingColors={newMarketingColors}>
      <Button {...props} onClick={click} />
    </DiscordProvider>
  );
};

export const Disabled: Story<ButtonProps & DiscordProviderProps> = (props) => {
  const { newMarketingColors } = props;

  const click = () => console.log('Button click');

  return (
    <DiscordProvider newMarketingColors={newMarketingColors}>
      <Button {...props} onClick={click} disabled />
    </DiscordProvider>
  );
};

export const Loading: Story<ButtonProps & DiscordProviderProps> = (props) => {
  const { newMarketingColors } = props;

  const click = () => console.log('Button click');

  return (
    <DiscordProvider newMarketingColors={newMarketingColors}>
      <Button {...props} onClick={click} loading />
    </DiscordProvider>
  );
};

export const Children: Story<ButtonProps & DiscordProviderProps> = (props) => {
  const { newMarketingColors } = props;

  const click = () => console.log('Button click');

  return (
    <DiscordProvider newMarketingColors={newMarketingColors}>
      <Button {...props} text={null} onClick={click}>
        Children
      </Button>
    </DiscordProvider>
  );
};

export const TextAndChildren: Story<ButtonProps & DiscordProviderProps> = (props) => {
  const { newMarketingColors } = props;

  const click = () => console.log('Button click');

  return (
    <DiscordProvider newMarketingColors={newMarketingColors}>
      <Button {...props} onClick={click}>
        Children
      </Button>
    </DiscordProvider>
  );
};
