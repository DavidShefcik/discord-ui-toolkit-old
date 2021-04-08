import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Icon as IconComponent, IconProps } from '../../src/components';

const icons: Icon[] = [
  'discord',
  'folder',
  'thin_plus',
  'thick_plus',
  'compass',
  'download',
  'person_waving',
  'nitro',
  'close',
  'idle_status',
  'online_status',
  'offline_status',
  'dnd_status',
  'muted',
  'unmuted',
  'deafened',
  'undeafened',
  'settings',
  'text_bubble',
  'text_bubble_plus',
  'inbox',
  'help',
  'three_dots_vertical',
  'three_dots_horizontal',
  'badge',
  'boosting_empty',
  'boosting_filled',
  'down_chevron',
  'hashtag',
  'person_add',
  'face_add',
  'speaker',
  'locked_speaker',
  'locked_hashtag',
  'warning_hashtag',
  'bell',
  'pin',
  'person_multiple',
  'search',
  'checkmark',
  'rich_status',
];

export default {
  component: IconComponent,
  title: 'Discord UI Toolkit/Layout/Icon',
  argTypes: {
    icon: {
      defaultValue: 'discord',
      description: 'The name of the icon.',
      control: {
        type: 'inline-radio',
        options: icons,
      },
    },
    iconColor: {
      defaultValue: '#ffffff',
      description: 'The color of the icon.',
      control: {
        type: 'color',
      },
    },
    iconHoverColor: {
      defaultValue: '#000000',
      description: 'The color of the icon on hover.',
      control: {
        type: 'color',
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

export const Template: Story<IconProps> = (props) => <IconComponent {...props} />;
