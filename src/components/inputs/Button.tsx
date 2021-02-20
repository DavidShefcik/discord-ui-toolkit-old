import React, { MouseEvent } from 'react';

type ButtonTypes = 'blurple' | 'greyple' | 'green' | 'red_filled' | 'red_empty';
type ButtonProps = {
  text: string;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  type: ButtonTypes;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button(props: ButtonProps) {
  return (
    <div>
      <p>Button</p>
    </div>
  );
}

export { ButtonTypes, ButtonProps };
