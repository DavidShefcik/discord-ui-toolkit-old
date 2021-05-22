import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CheckBox, ThemeProvider, ThemeProviderProps, CheckBoxProps } from 'discord-ui-toolkit';

export default {
  component: CheckBox,
  title: 'Discord UI Toolkit/Inputs/CheckBox',
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
    value: {
      defaultValue: false,
      description: 'The value of the checkbox.',
      control: {
        type: 'boolean',
      },
    },
    label: {
      defaultValue: 'Checkbox',
      description: 'The text for the checkbox label.',
      control: {
        type: 'text',
      },
    },
    labelSide: {
      defaultValue: 'right',
      description: 'The side of the checkbox the label should appear.',
      control: {
        type: 'inline-radio',
        options: ['left', 'right'],
      },
    },
    backgroundTransparent: {
      defaultValue: false,
      description: 'If the checkbox container should have a transparent background.',
    },
    containerWidth: {
      defaultValue: '100%',
      description: 'The width of the checkbox container',
      control: {
        type: 'text',
      },
    },
    disabled: {
      defaultValue: false,
      description: 'Should the checkbox be disabled.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<CheckBoxProps & ThemeProviderProps> = (props) => (
  <ThemeProvider {...props}>
    <CheckBox {...props} />
  </ThemeProvider>
);
