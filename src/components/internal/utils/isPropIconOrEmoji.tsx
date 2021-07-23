import { iconNames } from '@internal/values/icons';

const isPropIconOrEmoji = (value: string): 'icon' | 'emoji' => {
  if ((iconNames as string[]).includes(value)) {
    return 'icon';
  } else {
    return 'emoji';
  }
};

export default isPropIconOrEmoji;
