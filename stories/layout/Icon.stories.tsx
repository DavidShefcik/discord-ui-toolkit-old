import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Icon as IconComponent, IconProps } from '../../src/components';
import { iconNames } from '../../src/components/internal/values/icons';

export default {
  component: IconComponent,
  title: 'Discord UI Toolkit/Layout/Icon',
  argTypes: {
    icon: {
      defaultValue: 'discord',
      description: 'The name of the icon.',
      control: {
        type: 'inline-radio',
        options: iconNames,
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

export const Template: Story<IconProps> = (props) => <IconComponent {...props} onClick={(icon) => console.log(icon)} />;
