import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { Modal, ModalProps, Button, DiscordProvider, DiscordProviderProps } from 'discord-ui-toolkit';

export default {
  component: Modal,
  title: 'Discord UI Toolkit/Layout/Modal',
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
    visible: {
      defaultValue: true,
      description: 'The visibility of the modal.',
      control: {
        type: 'boolean',
      },
    },
    title: {
      defaultValue: 'Title',
      description: 'The title of the modal.',
      control: {
        type: 'text',
      },
    },
    alwaysCloseOnButtonPress: {
      defaultValue: true,
      description: 'Should the modal automatically close when the cancel or submit button is clicked.',
      control: {
        type: 'boolean',
      },
    },
    closeOnEscapeKeyPress: {
      defaultValue: true,
      description: 'Should the modal automatically close when the escape key is pressed.',
      control: {
        type: 'boolean',
      },
    },
    submitText: {
      defaultValue: 'Ok',
      description: 'The text of the submit button.',
      control: {
        type: 'text',
      },
    },
    submitColor: {
      defaultValue: 'blurple',
      description: 'The color of the submit button.',
      control: {
        type: 'inline-radio',
        values: ['blurple', 'green', 'red'],
      },
    },
    submitButtonFull: {
      defaultValue: false,
      description: 'If the width of the submit button should 100%.',
      control: {
        type: 'boolean',
      },
    },
    submitButtonLoading: {
      defaultValue: false,
      description: 'If the submit button is loading.',
      control: {
        type: 'boolean',
      },
    },
    submitButtonDisabled: {
      defaultValue: false,
      description: 'If the submit button is disabled.',
      control: {
        type: 'boolean',
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

export const Template: Story<ModalProps & DiscordProviderProps> = (props) => {
  const { visible } = props;

  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <DiscordProvider {...props}>
      <Button text="Open Modal" type="blurple" onClick={() => setModalVisible(true)} />
      <Modal {...props} visible={modalVisible} setVisible={(val: boolean) => setModalVisible(val)}>
        <Button size="small" text="Close Modal" type="blurple" onClick={() => setModalVisible(false)} />
      </Modal>
    </DiscordProvider>
  );
};
