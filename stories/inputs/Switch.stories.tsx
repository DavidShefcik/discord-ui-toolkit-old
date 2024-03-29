import React, { useState, ChangeEvent } from 'react';
import { Story, Meta } from '@storybook/react';
import { Switch, SwitchProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: Switch,
  title: 'Discord UI Toolkit/Inputs/Switch',
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
      description: 'The value of the switch.',
      control: {
        type: 'boolean',
      },
    },
    label: {
      defaultValue: 'Switch',
      description: 'The text for the switch label.',
      control: {
        type: 'text',
      },
    },
    subLabel: {
      defaultValue: 'Sub label',
      description: 'The text for the switch sub label.',
      control: {
        type: 'text',
      },
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

export const Template: Story<SwitchProps & DiscordProviderProps> = (props) => {
  const { value } = props;
  const [currentValue, setCurrentValue] = useState(value);

  const click = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.checked);
  };

  return (
    <DiscordProvider {...props}>
      <Switch {...props} value={currentValue} onChange={click} />
    </DiscordProvider>
  );
};
