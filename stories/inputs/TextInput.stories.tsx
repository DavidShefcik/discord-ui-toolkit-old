import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { TextInput, TextInputProps, ThemeProvider, ThemeProviderProps } from '../../src/components';

export default {
  component: TextInput,
  title: 'Discord UI Toolkit/Inputs/TextInput',
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
      defaultValue: '',
      description: 'The value of the input.',
      control: {
        type: 'text',
      },
    },
    htmlType: {
      defaultValue: 'text',
      description: 'The HTML type of the text input.',
      control: {
        type: 'inline-radio',
        options: ['text', 'password', 'email', 'phone', 'email'],
      },
    },
    borderColor: {
      defaultValue: 'dark',
      description: 'The input border color.',
      control: {
        type: 'inline-radio',
        options: ['dark', 'red'],
      },
    },
    placeholder: {
      defaultValue: 'Placeholder',
      description: 'The placeholder of the input.',
      control: {
        type: 'text',
      },
    },
    maxLength: {
      defaultValue: 128,
      description: 'The max length of the text input value.',
      control: {
        type: 'number',
      },
    },
    disabled: {
      defaultValue: false,
      description: 'If the text input is disabled.',
      control: {
        type: 'boolean',
      },
    },
    width: {
      defaultValue: '100%',
      description: 'The width of the text input.',
      control: {
        type: 'text',
      },
    },
    height: {
      defaultValue: '40px',
      description: 'The height of the text input.',
      control: {
        type: 'text',
      },
    },
    fontSize: {
      defaultValue: '16px',
      description: 'The font size of the text input.',
      control: {
        type: 'text',
      },
    },
    autoComplete: {
      defaultValue: false,
      description: 'If the text input allows autocomplete.',
      control: {
        type: 'boolean',
      },
    },
    spellcheck: {
      defaultValue: false,
      description: 'If the text input allows spellchecker.',
      control: {
        type: 'boolean',
      },
    },
    prefix: {
      defaultValue: '',
      description: 'Text to prefix the text input value with.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<TextInputProps & ThemeProviderProps> = (props) => {
  const { theme, value } = props;

  const [inputValue, setInputValue] = useState('');
  const [themeValue, setThemeValue] = useState(theme);

  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <ThemeProvider theme={themeValue}>
      <TextInput {...props} value={inputValue} onChange={(val) => setInputValue(val)} />
    </ThemeProvider>
  );
};
