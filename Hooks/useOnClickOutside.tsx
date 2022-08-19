import { RefObject, useEffect } from "react";

type EventType = MouseEvent | TouchEvent;
type Handler = (event: EventType) => void;

function useOnClickOutside(
  elm: RefObject<HTMLElement>,
  close: Handler | null,
  openButton: RefObject<HTMLElement>
) {
  useEffect(() => {
    const listener = (e: EventType) => {
      if (e.target && openButton.current && elm.current && close) {
        if (
          elm.current.contains(e.target as Node) ||
          openButton.current.contains(e.target as Node)
        ) {
          return;
        }
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
