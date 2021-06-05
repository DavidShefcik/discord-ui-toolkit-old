/**
 * Hook is from: https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/OutsideAlerter.js:421-427
 */

import { useEffect, RefObject } from 'react';

type Props = {
  ref: RefObject<HTMLDivElement>;
  onOutsideClick: Function;
};

/**
 * Hook that detects when a user clicks out a component
 * @param {RefObject<HTMLDivElement>} ref React ref pointing to the component's top level div
 * @param {Function} onOutsideClick Function to run when outside click is detected
 */
export default function useOutsideClickAlerter({ ref, onOutsideClick }: Props) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // On outside click
      if (ref.current && !ref.current.contains(event.target as Node) && event.button === 0) {
        onOutsideClick();
      }
    }
    // Event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
