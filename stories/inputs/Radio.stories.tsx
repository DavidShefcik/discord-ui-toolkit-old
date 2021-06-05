import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { Radio, DiscordProvider, DiscordProviderProps, RadioProps, RadioItem } from 'discord-ui-toolkit';

export default {
  component: Radio,
  title: 'Discord UI Toolkit/Inputs/Radio',
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
      defaultValue: '0',
      description: 'The value of the radio selection.',
      control: {
        type: 'inline-radio',
        options: ['0', '1', '2'],
      },
    },
    containerWidth: {
      defaultValue: '100%',
      description: 'The width of the radio items container.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<RadioProps & DiscordProviderProps> = (props) => {
  const { value } = props;
  const items: RadioItem[] = [
    {
      id: '0',
      title: 'Keep me safe',
      description: 'Description',
      borderLeftColor: 'red',
    },
    {
      id: '1',
      title: 'Title 1',
      description: 'Description 1',
      borderLeftColor: 'yellow',
    },
    {
      id: '2',
      title: 'Title 2',
    },
  ];

  const [radioValue, setRadioValue] = useState(value);

  useEffect(() => {
    setRadioValue(value);
  }, [value]);

  const onChange = (newValue: string | number) => {
    setRadioValue(newValue);
  };

  return (
    <DiscordProvider {...props}>
      <Radio {...props} value={radioValue} items={items} onChange={onChange} />
    </DiscordProvider>
  );
};
