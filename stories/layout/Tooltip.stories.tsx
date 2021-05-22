import React from 'react';
import { Story, Meta } from '@storybook/react';
import { StyleSheet, css } from 'aphrodite';
import { Tooltip, TooltipProps, TooltipDirection, ThemeProvider } from 'discord-ui-toolkit';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '250px',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {
  component: Tooltip,
  title: 'Discord UI Toolkit/Layout/Tooltip',
  argTypes: {
    text: {
      defaultValue: 'Tooltip',
      description: 'The text of the tooltip.',
      control: {
        type: 'text',
      },
    },
    direction: {
      defaultValue: 'top',
      description: 'The direction the arrow of the tooltip is pointing. Also changes position of the tooltip.',
      control: {
        type: 'inline-radio',
        options: ['top', 'left', 'right', 'bottom'] as TooltipDirection[],
      },
    },
    backgroundColor: {
      defaultValue: '#000000',
      description: 'The background for the tooltip content and arrow.',
      control: {
        type: 'color',
      },
    },
    textColor: {
      defaultValue: '#ffffff',
      description: 'The color for the tooltip content text.',
      control: {
        type: 'color',
      },
    },
  },
} as Meta;

export const Template: Story<TooltipProps> = (props) => (
  <ThemeProvider>
    <div className={css(styles.container)}>
      <Tooltip {...props}>
        <button type="button">Hover over me!</button>
      </Tooltip>
    </div>
  </ThemeProvider>
);
