import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { ThemeProvider, ThemeProviderProps, DatePicker, DatePickerProps } from 'discord-ui-toolkit';

export default {
  component: DatePicker,
  title: 'Discord UI Toolkit/Inputs/DatePicker',
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
      defaultValue: new Date(),
      description: 'The value of the date picker.',
      control: {
        type: 'date',
      },
    },
    minDate: {
      defaultValue: null,
      description: 'The earliest available date for selection.',
      control: {
        type: 'date',
      },
    },
    maxDate: {
      defaultValue: null,
      description: 'The latest available date for selection.',
      control: {
        type: 'date',
      },
    },
  },
} as Meta;

export const Template: Story<DatePickerProps & ThemeProviderProps> = (props) => {
  const { value } = props;

  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    setDateValue(value);
  }, [value]);

  return (
    <ThemeProvider {...props}>
      <DatePicker {...props} value={dateValue} onChange={(val: Date) => setDateValue(val)} />
    </ThemeProvider>
  );
};
