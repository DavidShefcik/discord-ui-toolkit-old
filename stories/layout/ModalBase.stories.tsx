import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { ModalBase, ModalBaseProps, Button, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: ModalBase,
  title: 'Discord UI Toolkit/Layout/ModalBase',
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
      defaultValue: '440px',
      description: 'The width of the modal.',
      control: {
        type: 'text',
      },
    },
    minHeight: {
      defaultValue: '220px',
      description: 'The min height of the modal.',
      control: {
        type: 'text',
      },
    },
    visible: {
      defaultValue: true,
      description: 'The visibility of the modal.',
      control: {
        type: 'boolean',
      },
    },
    closeOnOutsideClick: {
      defaultValue: true,
      description: 'If the modal should close when clicked outside of.',
      control: {
        type: 'boolean',
      },
    },
    animated: {
      defaultValue: true,
      description: 'If the modal transitions should be animated.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<ModalBaseProps & DiscordProviderProps> = (props) => {
  const { visible } = props;

  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <DiscordProvider {...props}>
      <Button text="Open Modal" type="blurple" onClick={() => setModalVisible(true)} />
      <ModalBase {...props} visible={modalVisible} setVisible={(val: boolean) => setModalVisible(val)}>
        <Button size="small" text="Close Modal" type="blurple" onClick={() => setModalVisible(false)} />
      </ModalBase>
    </DiscordProvider>
  );
};
