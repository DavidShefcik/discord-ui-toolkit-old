import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Emoji, EmojiProps } from 'discord-ui-toolkit';

export default {
  component: Emoji,
  title: 'Discord UI Toolkit/Layout/Emoji',
  argTypes: {
    emoji: {
      defaultValue: '👍',
      description: 'The emoji to convert to Twemoji.',
      control: {
        type: 'text',
      },
    },
    color: {
      defaultValue: true,
      description: 'Does the emoji have color.',
      control: {
        type: 'boolean',
      },
    },
    size: {
      defaultValue: 72,
      description: 'The width and height in pixels.',
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

export const Template: Story<EmojiProps> = (props) => <Emoji {...props} onClick={(emoji) => console.log(emoji)} />;
