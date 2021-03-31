import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { Select, ThemeProvider, ThemeProviderProps, SelectProps, SelectItemProps } from '../../src/components';

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
    containerWidth: {
      defaultValue: '100%',
      description: 'The width of the radio items container.',
      control: {
        type: 'text',
      },
    },
    unselectedLabel: {
      defaultValue: 'Unselected label text goes here',
      description: 'The label text for the unselected label.',
      control: {
        type: 'text',
      },
    },
    unselectedAsOption: {
      defaultValue: false,
      description: 'Is the unselected label available as a dropdown option.',
      control: {
        type: 'boolean',
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
      defaultValue: false,
      description: 'Is the select disabled.',
      control: {
        type: 'boolean',
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
  },
} as Meta;

export const Template: Story<SelectProps & ThemeProviderProps> = (props) => {
  const { theme, value } = props;
  const items: SelectItemProps[] = [
    {
      id: '0',
      label: 'First',
    },
    {
      id: '1',
      label: 'Second',
    },
    {
      id: '2',
      label: 'Third',
      heplerText: 'Helper',
    },
  ];

  const [selectValue, setSelectValue] = useState<string | number | null | SelectItemProps>('2');
  const [themeValue, setThemeValue] = useState(theme);

  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  const onChange = (newValue: string | number | null) => {
    setSelectValue(newValue);
  };

  return (
    <ThemeProvider theme={themeValue}>
      <Select {...props} value={selectValue} onChange={onChange} items={items} />
    </ThemeProvider>
  );
};
