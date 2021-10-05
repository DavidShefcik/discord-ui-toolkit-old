import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { QuickSwitcher, QuickSwitcherProps, Button, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: QuickSwitcher,
  title: 'Discord UI Toolkit/Layout/QuickSwitcher',
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
      defaultValue: 'Search',
      description: 'The value of the popup search modal input.',
      control: {
        type: 'text',
      },
    },
    visible: {
      defaultValue: true,
      description: 'The visibility of the popup search modal.',
      control: {
        type: 'boolean',
      },
    },
    placeholder: {
      defaultValue: 'Where would you like to go?',
      description: 'The placeholder of the popup search modal input.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<QuickSwitcherProps & DiscordProviderProps> = (props) => {
  const { value, visible } = props;

  const [inputValue, setInputValue] = useState(value);
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <DiscordProvider {...props}>
      <Button text="Open Modal" type="blurple" onClick={() => setModalVisible(true)} />
      <QuickSwitcher
        {...props}
        visible={modalVisible}
        setVisible={(val: boolean) => setModalVisible(val)}
        value={inputValue}
        onChange={(val: string) => setInputValue(val)}
      >
        <div>Quick Search</div>
      </QuickSwitcher>
    </DiscordProvider>
  );
};
