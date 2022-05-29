import Footer from "../Footer";
import { MutableRefObject, useLayoutEffect, useRef } from "react";
import styles from "./suggestions.module.scss";

type props = {
  postsContainer: MutableRefObject<HTMLDivElement | null>;
};
const Suggestions = ({ postsContainer }: props) => {
  const suggesEl = useRef<HTMLDivElement | null>(null);

  const calculatingSuggestPos = () => {
    const SuggestPosLeft =
      postsContainer.current!.offsetLeft + postsContainer.current!.offsetWidth;
    suggesEl.current!.style.left = `${SuggestPosLeft + 30}px`;
  };
  useLayoutEffect(() => {
    calculatingSuggestPos();
  }, []);
  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      calculatingSuggestPos();
    });
  });
  return (
    <div className={styles.suggestions} ref={suggesEl}>
      <Footer />
    </div>
  );
};

export default Suggestions;
