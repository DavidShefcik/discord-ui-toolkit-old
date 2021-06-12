import React, { ReactElement } from 'react';
import { Story, Meta } from '@storybook/react';
import {
  ScrollContainer,
  ScrollContainerProps,
  Text,
  Message,
  MessageProps,
  DiscordProvider,
  DiscordProviderProps,
  BlueNewDefaultAvatar,
} from 'discord-ui-toolkit';

export default {
  component: ScrollContainer,
  title: 'Discord UI Toolkit/Layout/ScrollContainer',
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
    allowXOverflow: {
      defaultValue: false,
      description: 'Allow x overflowing in the scroll container.',
      control: {
        type: 'boolean',
      },
    },
    allowYOverflow: {
      defaultValue: false,
      description: 'Allow y overflowing in the scroll container.',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const messages: ReactElement<MessageProps>[] = [];
for (let count = 0; count < 100; count += 1) {
  messages.push(
    <Message
      key={count}
      avatarSource={BlueNewDefaultAvatar}
      username="Username"
      timeText="Time"
      content={[
        {
          id: 0,
          text: 'Message Text',
        },
      ]}
    />
  );
}

export const Template: Story<ScrollContainerProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <div style={{ height: '350px', width: '100%' }}>
      <ScrollContainer {...props}>{messages.map((message) => message)}</ScrollContainer>
    </div>
  </DiscordProvider>
);
