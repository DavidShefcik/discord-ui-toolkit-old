import { useState, useEffect } from 'react';

interface Props {
  isMounted: boolean;
  timingInMS: number;
}
/**
 * Hook that animates the mounting and unmounting of a component
 * @param {boolean} isMounted If the component is mounted
 * @param {number} timingInMS The animation duration in milliseconds
 */
export default function useAnimateMount({ isMounted, timingInMS }: Props): boolean {
  const [shouldRender, setShouldRender] = useState(isMounted);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeout = setTimeout(() => {
        setShouldRender(false);
      }, timingInMS);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isMounted, timingInMS, shouldRender]);

  return shouldRender;
}
