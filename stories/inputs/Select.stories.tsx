import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { Select, DiscordProvider, DiscordProviderProps, SelectProps, SelectItem } from 'discord-ui-toolkit';

export default {
  component: Select,
  title: 'Discord UI Toolkit/Inputs/Select',
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
    containerWidth: {
      defaultValue: '100%',
      description: 'The width of the select items container.',
      control: {
        type: 'text',
      },
    },
    dropdownLocation: {
      defaultValue: 'bottom',
      description: 'The location of the select dropdown.',
      control: {
        type: 'inline-radio',
        options: ['top', 'bottom'],
      },
    },
    unselectedAsOption: {
      defaultValue: false,
      description: 'Is the unselected label available as a dropdown option.',
      control: {
        type: 'boolean',
      },
    },
    unselectedLabel: {
      defaultValue: 'Unselected label text goes here',
      description: 'The label text for the unselected label.',
      control: {
        type: 'text',
      },
    },
    unselectedHelperText: {
      defaultValue: 'Unselected helper text goes here',
      description: 'The helper text for the unselected label.',
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: 'Is the select disabled.',
      table: {
        disabled: true,
      },
    },
    value: {
      defaultValue: null,
      description: 'The ID of the selected value for testing purposes in storybook.',
      control: {
        type: 'inline-radio',
        options: [null, '0', '1', '2'],
      },
    },
    error: {
      description: 'Does the select have an error.',
      table: {
        disabled: true,
      },
    },
  },
} as Meta;

const items: SelectItem[] = [
  {
    id: '0',
    label: 'First',
    emoji: '😀',
  },
  {
    id: '1',
    label: 'Second',
    icon: 'old_discord',
  },
  {
    id: '2',
    label: 'Third',
    heplerText: 'Helper',
  },
];

export const Default: Story<SelectProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [selectValue, setSelectValue] = useState<string | number | null | SelectItem>('2');

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  const onChange = (newValue: string | number | null) => {
    setSelectValue(newValue);
  };

  return (
    <DiscordProvider {...props}>
      <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Select {...props} value={selectValue} onChange={onChange} items={items} />
      </div>
    </DiscordProvider>
  );
};

export const Disabled: Story<SelectProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [selectValue, setSelectValue] = useState<string | number | null | SelectItem>('2');

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  const onChange = (newValue: string | number | null) => {
    setSelectValue(newValue);
  };

  return (
    <DiscordProvider {...props}>
      <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Select {...props} value={selectValue} onChange={onChange} items={items} disabled />
      </div>
    </DiscordProvider>
  );
};

export const Error: Story<SelectProps & DiscordProviderProps> = (props) => {
  const { value } = props;

  const [selectValue, setSelectValue] = useState<string | number | null | SelectItem>('2');

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  const onChange = (newValue: string | number | null) => {
    setSelectValue(newValue);
  };

  return (
    <DiscordProvider {...props}>
      <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Select {...props} value={selectValue} onChange={onChange} items={items} error />
      </div>
    </DiscordProvider>
  );
};
