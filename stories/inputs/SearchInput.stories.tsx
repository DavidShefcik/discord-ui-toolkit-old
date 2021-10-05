import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { SearchInput, SearchInputProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: SearchInput,
  title: 'Discord UI Toolkit/Inputs/SearchInput',
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
    placeholder: {
      defaultValue: 'Search',
      description: 'The placeholder of the input.',
      control: {
        type: 'text',
      },
    },
    width: {
      defaultValue: '75%',
      description: 'The width of the input.',
      control: {
        type: 'text',
      },
    },
    widenOnValue: {
      defaultValue: true,
      description: `If the input's width should increase to 100% when it has a value`,
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<SearchInputProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <DiscordProvider {...props}>
      <SearchInput {...props} value={inputValue} onChange={(val: string) => setInputValue(val)} />
    </DiscordProvider>
  );
};
