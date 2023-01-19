import { useRef } from "react";

function useThrottle<T>(callback: (...args: any[]) => void, limit: number) {
  const lastRun = useRef(Date.now());

  return function (args: T) {
    if (Date.now() - lastRun.current >= limit) {
      callback(args);
      lastRun.current = Date.now();
    }
  };
}
export default useThrottle;
