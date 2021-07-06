import React, { ReactNode, useEffect } from 'react';
import { useTooltipState, Tooltip as ReakitTooltip, TooltipReference, TooltipArrow } from 'reakit/Tooltip';
import { css, StyleSheet } from 'aphrodite';

type TooltipDirection =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';
type TooltipProps = {
  children: ReactNode;
  text: string;
  direction?: TooltipDirection;
  backgroundColor?: string;
  textColor?: string;
};

const styles = StyleSheet.create({
  tooltipContainer: {
    fontFamily: 'Arial',
    fontSize: '14px',
    borderRadius: '3px',
    padding: '6px 10px',
    textAlign: 'center',
    maxWidth: '200px',
  },
});

const transformMap: {
  top: string;
  right: string;
  bottom: string;
  left: string;
  [index: string]: string;
} = {
  top: 'rotateZ(180deg)',
  right: 'rotateZ(-90deg)',
  bottom: 'rotateZ(360deg)',
  left: 'rotateZ(90deg)',
};

export default function Tooltip({
  text,
  children,
  direction = 'top',
  backgroundColor = 'black',
  textColor = 'white',
}: TooltipProps) {
  const tooltip = useTooltipState({
    placement: direction,
  });
  const [placement] = direction.split('-');
  const transform = transformMap[placement];

  useEffect(() => {
    tooltip.place(direction);
  }, [direction]);

  return (
    <>
      <TooltipReference {...tooltip}>{children}</TooltipReference>
      <ReakitTooltip
        {...tooltip}
        className={css(styles.tooltipContainer)}
        style={{ backgroundColor, color: textColor }}
      >
        <TooltipArrow {...tooltip}>
          <svg viewBox="0 0 30 30" style={{ transform }}>
            <path
              fill={backgroundColor}
              d="M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26 C26.7,29,24.6,28.1,23.7,27.1z"
            />
            <path
              fill={backgroundColor}
              d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"
            />
          </svg>
        </TooltipArrow>
        {text}
      </ReakitTooltip>
    </>
  );
}

export { TooltipDirection, TooltipProps };
