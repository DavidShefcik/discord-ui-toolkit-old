import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { TextArea, TextAreaProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: TextArea,
  title: 'Discord UI Toolkit/Inputs/TextArea',
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
    value: {
      defaultValue: '',
      description: 'The value of the text area.',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'Placeholder',
      description: 'The placeholder of the text area.',
      control: {
        type: 'text',
      },
    },
    maxLength: {
      defaultValue: 128,
      description: 'The max length of the text area value.',
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
    minHeight: {
      defaultValue: '200px',
      description: 'The min height of the text area.',
      control: {
        type: 'text',
      },
    },
    maxHeight: {
      defaultValue: '400px',
      description: 'The max height of the text area.',
      control: {
        type: 'text',
      },
    },
    showCharacterCount: {
      defaultValue: true,
      description: 'Should the character count of the value be shown in the bottom right.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default: Story<TextAreaProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <TextArea {...props} value={inputValue} onChange={(val) => setInputValue(val)} />
    </DiscordProvider>
  );
};

export const Disabled: Story<TextAreaProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <TextArea {...props} value={inputValue} onChange={(val) => setInputValue(val)} disabled />
    </DiscordProvider>
  );
};
