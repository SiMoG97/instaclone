import { RefObject, useEffect } from "react";

type EventType = MouseEvent | TouchEvent;
type Handler = (event: EventType) => void;

function useOnClickOutside(
  elm: RefObject<HTMLElement>,
  close: Handler | null,
  openButton?: RefObject<HTMLElement>
) {
  useEffect(() => {
    const listener = (e: EventType) => {
      if (e.target && elm.current && close) {
        if (openButton && openButton.current) {
          if (openButton.current.contains(e.target as Node)) return;
        }
        if (elm.current.contains(e.target as Node)) return;

        close(e);
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [elm, close, openButton]);
}

export default useOnClickOutside;
