import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonTypes, ButtonProps, ThemeProvider } from 'discord-ui-toolkit';

export default {
  component: Button,
  title: 'Discord UI Toolkit/Inputs/Button',
  argTypes: {
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
    disabled: {
      defaultValue: false,
      description: 'Is the button disabled.',
      control: {
        type: 'boolean',
      },
    },
    loading: {
      defaultValue: false,
      description: 'Is the button loading. Shows a loading animation and disables button.',
      control: {
        type: 'boolean',
      },
    },
    width: {
      description: 'Width of the button.',
      control: {
        type: 'text',
      },
    },
    height: {
      description: 'Height of the button.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<ButtonProps> = (props) => {
  const click = () => console.log('Button click');

  return (
    <ThemeProvider>
      <Button {...props} onClick={click} />
    </ThemeProvider>
  );
};
