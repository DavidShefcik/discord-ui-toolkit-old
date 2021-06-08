import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { Toast, ToastProps, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: Toast,
  title: 'Discord UI Toolkit/Layout/Toast',
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
    width: {
      defaultValue: '100%',
      description: 'The width of the toast container.',
      control: {
        type: 'text',
      },
    },
    text: {
      defaultValue: 'Text',
      description: 'The text content of the toast.',
      control: {
        type: 'text',
      },
    },
    visible: {
      defaultValue: true,
      description: 'The visibility of the toast.',
      control: {
        type: 'boolean',
      },
    },
    error: {
      defaultValue: false,
      description: 'If the toast has an error.',
      control: {
        type: 'boolean',
      },
    },
    okText: {
      defaultValue: 'Ok',
      description: 'The text of the ok button.',
      control: {
        type: 'text',
      },
    },
    cancelText: {
      defaultValue: 'Cancel',
      description: 'The text of the cancel button.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<ToastProps & DiscordProviderProps> = (props) => {
  const { visible } = props;

  const [toastVisible, setToastVisible] = useState(visible);

  useEffect(() => {
    setToastVisible(visible);
  }, [visible]);

  return (
    <DiscordProvider {...props}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Toast {...props} visible={toastVisible} setVisible={(val: boolean) => setToastVisible(val)} />
      </div>
    </DiscordProvider>
  );
};
