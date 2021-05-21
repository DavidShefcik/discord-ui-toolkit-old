import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ColorPicker, ColorPickerProps, ThemeProvider, ThemeProviderProps } from '../../src/components';

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
  const { theme, value } = props;

  const [colorValue, setColorValue] = useState('');
  const [themeValue, setThemeValue] = useState(theme);

  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);

  useEffect(() => {
    setColorValue(value);
  }, [value]);

  return (
    <ThemeProvider theme={themeValue}>
      <ColorPicker {...props} value={colorValue} onChange={(val) => setColorValue(val)} />
    </ThemeProvider>
  );
};
