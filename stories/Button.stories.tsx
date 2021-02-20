import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonTypes, ButtonProps } from '../src/components';

export default {
  component: Button,
  title: 'Discord UI Toolkit/Inputs/Button',
  argTypes: {
    text: {
      control: {
        type: 'string',
      },
    },
    type: {
      control: {
        type: 'inline-radio',
        options: [
          'blurple',
          'greyple',
          'green',
          'red_filled',
          'red_empty',
        ] as ButtonTypes[],
        defaultValue: 'blurple',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
        defaultValue: false,
      },
    },
    loading: {
      control: {
        type: 'boolean',
        defaultValue: false,
      },
    },
  },
} as Meta;

export const Template: Story<ButtonProps> = (props) => {
  const click = () => console.log('Button click');

  return <Button {...props} onClick={click} />;
};
