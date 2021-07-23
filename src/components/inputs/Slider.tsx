import React, { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import ReactSlider from 'react-slider';

interface SliderInterval {
  value: number;
  label: string;
  green?: boolean;
}
interface SliderProps {
  value: number;
  onChange(value: number): void;
  width?: string;
  max?: number;
  min?: number;
  intervals?: SliderInterval[];
  disabled?: boolean;
  units?: string;
}

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: '64px',
  },
  disabled: {
    opacity: 0.6,
  },
  track: {
    height: '8px',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: 'var(--slider-bar-background)',
    top: 'calc(64px / 2 - 8px / 2)',
  },
  filledTrack: {
    backgroundColor: 'var(--blurple)',
    zIndex: 20,
  },
  thumb: {
    position: 'absolute',
    width: '10px',
    height: '24px',
    top: '50%',
    marginTop: '-13px',
    borderRadius: '3px',
    backgroundColor: '#fff',
    border: '1px solid #dcddde',
    boxShadow: '0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05)',
    outline: 0,
    zIndex: 30,
  },
  thumbDisabled: {
    cursor: 'not-allowed',
  },
  thumbNormal: {
    cursor: 'ew-resize',
  },
  mark: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24px',
    marginLeft: '-6px',
    marginTop: '3px',
    zIndex: 10,
  },
  markLabel: {
    fontFamily: 'discord-bold',
    color: 'var(--slider-label-color)',
    paddingLeft: '1px',
    fontWeight: 700,
    fontSize: '10px',
    marginBottom: '4px',
    'user-select': 'none',
  },
  markLabelGreen: {
    color: 'var(--green)',
  },
  markDash: {
    backgroundColor: 'var(--slider-bar-background)',
    height: '24px',
    width: '2px',
  },
});

export default function Slider({
  value,
  onChange,
  width = '100%',
  min,
  max,
  intervals,
  disabled = false,
  units,
}: SliderProps) {
  const marks = intervals?.map(({ value }) => value).sort((a, b) => a - b) || true;

  useEffect(() => {
    // Fix space between left track and thumb - https://github.com/zillow/react-slider/issues/213#issuecomment-802980092
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div style={{ display: 'inline-block', width }}>
      <ReactSlider
        ariaLabel="Slider"
        className={css([styles.slider, disabled && styles.disabled])}
        value={value}
        onAfterChange={(val) => onChange(val)}
        disabled={disabled}
        marks={marks}
        min={min}
        max={max}
        trackClassName={css(styles.track)}
        thumbClassName={css([styles.thumb, disabled ? styles.thumbDisabled : styles.thumbNormal])}
        markClassName={css(styles.mark)}
        renderMark={(props) => {
          const intervalData = intervals?.find(({ value }) => value === props.key);
          return (
            <React.Fragment key={props.key}>
              {intervalData && (
                <span {...props} className={css(styles.mark)}>
                  <span className={css([styles.markLabel, intervalData.green && styles.markLabelGreen])}>
                    {props.key.toString()}
                    {units}
                  </span>
                  <span className={css(styles.markDash)} />
                </span>
              )}
            </React.Fragment>
          );
        }}
        renderTrack={(props, state) => (
          <div {...props} className={css([styles.track, state.index === 0 && styles.filledTrack])} />
        )}
      />
    </div>
  );
}

export { SliderProps, SliderInterval };
