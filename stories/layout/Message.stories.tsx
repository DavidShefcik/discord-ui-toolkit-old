import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  Message,
  MessageProps,
  MessageContent,
  GreenNewDefaultAvatar,
  Text,
  DiscordProvider,
  DiscordProviderProps,
} from 'discord-ui-toolkit';

export default {
  component: Message,
  title: 'Discord UI Toolkit/Layout/Message',
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
      description: 'Width of the message.',
      control: {
        type: 'text',
      },
    },
    username: {
      defaultValue: 'Username',
      description: 'The username of the message author.',
      control: {
        type: 'text',
      },
    },
    usernameColor: {
      defaultValue: '#ffffff',
      description: 'The color of the message author username.',
      control: {
        type: 'color',
      },
    },
    timeText: {
      defaultValue: 'Today at 8:01 PM',
      description: 'The timestamp of the message.',
      control: {
        type: 'text',
      },
    },
    text: {
      defaultValue: 'Message',
      description: 'The text content of the third message.',
      control: {
        type: 'text',
      },
    },
    editedText: {
      defaultValue: '(edited)',
      description: 'The edited text content of the third message.',
      control: {
        type: 'text',
      },
    },
    mentioned: {
      defaultValue: false,
      description: 'If the third message contains a mention.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Template: Story<
  MessageProps &
    DiscordProviderProps & {
      text: string;
      editedText: string;
      mentioned: boolean;
    }
> = (props) => {
  const { text, editedText, mentioned } = props;

  const firstItemMention: MessageContent[] = [
    {
      id: 0,
      text: 'First message has mention',
      mentioned: true,
    },
    {
      id: 1,
      text: 'Second item',
    },
  ];
  const secondItemMention: MessageContent[] = [
    {
      id: 0,
      text: 'First message',
    },
    {
      id: 1,
      text: 'Second Message',
      editedText: '(edited)',
      mentioned: false,
    },
  ];

  return (
    <DiscordProvider {...props}>
      <div style={{ display: 'inline-block', width: '90%', marginLeft: '20px' }}>
        <Message {...props} content={firstItemMention} avatarSource={GreenNewDefaultAvatar} />
        <Message {...props} content={secondItemMention} avatarSource={GreenNewDefaultAvatar} />
        <Message
          {...props}
          content={[
            {
              id: 1,
              text: (
                <Text text="Check out this cool ">
                  <Text text="link" variant="link" onClick={() => console.log('Link click')} />
                  <Text text=". It's really cool!" />
                </Text>
              ),
            },
          ]}
          avatarSource={GreenNewDefaultAvatar}
        />
        <Message
          {...props}
          content={[
            {
              id: 0,
              text,
              editedText,
              mentioned,
            },
          ]}
          avatarSource={GreenNewDefaultAvatar}
          avatarOnClick={(avatarSource) => console.log(avatarSource)}
          usernameOnClick={(username) => console.log(username)}
        />
      </div>
    </DiscordProvider>
  );
};
