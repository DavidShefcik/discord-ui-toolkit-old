import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { TextInput, TextInputProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

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
    newMarketingColors: {
      defaultValue: false,
      description: "Use the new colors from Discord's 2021 rebranding.",
      control: {
        type: 'boolean',
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
    error: {
      description: 'Does the input have an error.',
      table: {
        disable: true,
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
      description: 'If the text input is disabled.',
      table: {
        disable: true,
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

export const Default: Story<TextInputProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <TextInput {...props} value={inputValue} onChange={(val) => setInputValue(val)} />
    </DiscordProvider>
  );
};

export const Disabled: Story<TextInputProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <TextInput {...props} value={inputValue} onChange={(val) => setInputValue(val)} disabled />
    </DiscordProvider>
  );
};

export const Error: Story<TextInputProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <TextInput {...props} value={inputValue} onChange={(val) => setInputValue(val)} error />
    </DiscordProvider>
  );
};
