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
    newMarketingColors: {
      defaultValue: false,
      description: "Use the new colors from Discord's 2021 rebranding.",
      control: {
        type: 'boolean',
      },
    },
    allowXOverflow: {
      description: 'Allow x overflowing in the scroll container.',
      table: {
        disabled: true,
      },
    },
    allowYOverflow: {
      description: 'Allow y overflowing in the scroll container.',
      table: {
        disabled: true,
      },
    },
    width: {
      defaultValue: 'auto',
      description: 'The width of the scroll container.',
      control: {
        type: 'text',
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

export const XScroll: Story<ScrollContainerProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <div style={{ height: '350px', width: '100%' }}>
      <ScrollContainer {...props} allowXOverflow allowYOverflow={false}>
        {messages.map((message) => message)}
      </ScrollContainer>
    </div>
  </DiscordProvider>
);

export const YScroll: Story<ScrollContainerProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <div style={{ height: '350px', width: '100%' }}>
      <ScrollContainer {...props} allowYOverflow>
        {messages.map((message) => message)}
      </ScrollContainer>
    </div>
  </DiscordProvider>
);

export const XAndYScroll: Story<ScrollContainerProps & DiscordProviderProps> = (props) => (
  <DiscordProvider {...props}>
    <div style={{ height: '350px', width: '100%' }}>
      <ScrollContainer {...props} allowYOverflow allowXOverflow>
        {messages.map((message) => message)}
      </ScrollContainer>
    </div>
  </DiscordProvider>
);
