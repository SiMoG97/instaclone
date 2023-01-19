import { useLayoutEffect } from "react";
import useThrottle from "./useThrottle";

const useWindowEventHandler = (
  callBack: () => any,
  dependencies: any[] = [],
  eventType: "resize" | "scroll" = "resize",
  delay: number = 100
) => {
  const ThrottledCB = useThrottle(callBack, delay);

  useLayoutEffect(() => {
    window.addEventListener(eventType, ThrottledCB);
    return () => {
      window.removeEventListener(eventType, ThrottledCB);
    };
  }, [...dependencies]);
};
export default useWindowEventHandler;
