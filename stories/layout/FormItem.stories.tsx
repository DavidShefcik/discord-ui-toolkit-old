import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { FormItem, FormItemProps, TextInput, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: FormItem,
  title: 'Discord UI Toolkit/Layout/FormItem',
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
    label: {
      defaultValue: 'Label',
      description: 'The label for the form item.',
      control: {
        type: 'text',
      },
    },
    containerWidth: {
      defaultValue: '100%',
      description: 'The width of the form item container.',
      control: {
        type: 'text',
      },
    },
    error: {
      defaultValue: false,
      description: 'If the form item has an error.',
      control: {
        type: 'boolean',
      },
    },
    errorMessage: {
      defaultValue: 'Error Message',
      description: 'The error message for the form item.',
      control: {
        type: 'text',
      },
    },
    requiredIndicator: {
      defaultValue: false,
      description: 'If the form item shows the required indicator on the label.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<FormItemProps & DiscordProviderProps> = (props) => {
  const { error } = props;

  const [inputValue, setInputValue] = useState('');

  return (
    <DiscordProvider {...props}>
      <FormItem {...props}>
        <TextInput value={inputValue} onChange={(val) => setInputValue(val)} error={error} />
      </FormItem>
    </DiscordProvider>
  );
};
