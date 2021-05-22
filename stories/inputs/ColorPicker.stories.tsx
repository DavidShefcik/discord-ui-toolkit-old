import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ColorPicker, ColorPickerProps, ThemeProvider, ThemeProviderProps } from 'discord-ui-toolkit';

export default {
  component: ColorPicker,
  title: 'Discord UI Toolkit/Inputs/ColorPicker',
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
      defaultValue: '000000',
      description: 'The value of the color picker.',
      control: {
        type: 'text',
      },
    },
    width: {
      defaultValue: '100%',
      description: 'The width of the color input.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<ColorPickerProps & ThemeProviderProps> = (props) => {
  const { value } = props;

  const [colorValue, setColorValue] = useState('');

  useEffect(() => {
    setColorValue(value);
  }, [value]);

  return (
    <ThemeProvider {...props}>
      <ColorPicker {...props} value={colorValue} onChange={(val) => setColorValue(val)} />
    </ThemeProvider>
  );
};
