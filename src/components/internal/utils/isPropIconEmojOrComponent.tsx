import { ReactChild } from 'react';
import { iconNames } from '@internal/values/icons';

const isPropIconEmojiOrComponent = (value: ReactChild | string): 'icon' | 'emoji' | 'component' => {
  if (typeof value === 'string') {
    if ((iconNames as string[]).includes(value)) {
      return 'icon';
    } else {
      return 'emoji';
    }
  } else {
    return 'component';
  }
};

export default isPropIconEmojiOrComponent;
