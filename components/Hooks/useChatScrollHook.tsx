import { useEffect, useLayoutEffect, useRef, useState } from "react";

type props = JSX.Element[];

const useChatScroll = (messages: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(true);

  const checkIfBottom = () => {
    // check if chat scroll at the bottom , if so auto scroll
    if (ref.current !== null) {
      const { scrollHeight, scrollTop, offsetHeight } = ref.current;
      if (scrollTop + offsetHeight >= scrollHeight - 10) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }
  };

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.addEventListener("scroll", checkIfBottom);
    }
    return () => {
      if (ref.current !== null) {
        ref.current.removeEventListener("scroll", checkIfBottom);
      }
    };
  }, [messages]);

  useLayoutEffect(() => {
    // when components mount the first time , auto scroll to bottom
    if (ref.current !== null) {
      const { scrollHeight } = ref.current;
      ref.current.scroll(0, scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    if (ref.current !== null) {
      const { scrollHeight } = ref.current;
      if (isBottom) {
        ref.current.scroll(0, scrollHeight);
      }
    }
  }, [messages]);

  return ref;
};
export default useChatScroll;
