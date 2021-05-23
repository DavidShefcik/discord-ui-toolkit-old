import React, { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import {
  MessageInput,
  MessageInputProps,
  MessageInputSideItemProps,
  ThemeProvider,
  ThemeProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: MessageInput,
  title: 'Discord UI Toolkit/Inputs/MessageInput',
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
      defaultValue: '',
      description: 'The value of the message input.',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'Placeholder',
      description: 'The placeholder of the message input.',
      control: {
        type: 'text',
      },
    },
    disabled: {
      defaultValue: false,
      description: 'If the message input is disabled.',
      control: {
        type: 'boolean',
      },
    },
    width: {
      defaultValue: '100%',
      description: 'The width of the message input.',
      control: {
        type: 'text',
      },
    },
    autoComplete: {
      defaultValue: false,
      description: 'If the message input allows autocomplete.',
      control: {
        type: 'boolean',
      },
    },
    spellcheck: {
      defaultValue: false,
      description: 'If the message input allows spellchecker.',
      control: {
        type: 'boolean',
      },
    },
    underInputText: {
      defaultValue: 'Under input text',
      description: 'Text that appears underneigh the message input.',
      control: {
        type: 'text',
      },
    },
    aboveInputVariant: {
      defaultValue: 'notice',
      description: 'The variant of the above message input message.',
      control: {
        type: 'inline-radio',
        options: ['error', 'notice'],
      },
    },
    aboveInputText: {
      defaultValue: 'Above input text',
      description: 'The text of the above message input message.',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Template: Story<MessageInputProps & ThemeProviderProps> = (props) => {
  const { value } = props;

  const [messageInputValue, setMessageInputValue] = useState('');
  useEffect(() => {
    setMessageInputValue(value);
  }, [value]);

  const leftItems: MessageInputSideItemProps[] = [
    {
      id: '0',
      value: 'attach',
      onClick: (icon) => console.log(icon),
    },
  ];

  const rightItems: MessageInputSideItemProps[] = [
    {
      id: '1',
      value: 'gift',
      onClick: (icon) => console.log(icon),
    },
    {
      id: '2',
      value: 'gif',
      onClick: (icon) => console.log(icon),
    },
  ];

  return (
    <ThemeProvider {...props}>
      <div style={{ marginTop: '20px' }}>
        <MessageInput
          {...props}
          value={messageInputValue}
          onEnterPress={(val) => console.log(val)}
          onChange={(val) => setMessageInputValue(val)}
          leftItems={leftItems}
          rightItems={rightItems}
          aboveInputOnClick={() => console.log('Above input click')}
        />
      </div>
    </ThemeProvider>
  );
};