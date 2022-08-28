import { useSpring, animated, easings } from "react-spring";
import { useRef } from "react";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import styles from "./popup.module.scss";

function SmallPopup({ buttonList, title, text, popupCloser }: SmallPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(popupRef, () => {
    popupCloser(() => false);
  });
  const animateStyle = useSpring({
    from: { scale: 1.5, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: {
      duration: 100,
      easing: easings.easeInCubic,
    },
  });
  return (
    <animated.div style={animateStyle} className={styles.smallPopupContainer}>
      <div className={styles.smallPopup} ref={popupRef}>
        <div style={{ padding: "2rem", paddingTop: "3rem" }}>
          {title ? <h3 className={styles.title}>{title}</h3> : null}
          {text ? <p>{text}</p> : null}
        </div>
        <ul>
          {buttonList && buttonList.length > 0
            ? buttonList.map((btn) => (
                <li
                  className={btn.danger ? styles.danger : ""}
                  onClick={btn.method}
                  key={btn.text}
                >
                  {btn.text}
                </li>
              ))
            : null}
        </ul>
      </div>
    </animated.div>
  );
}

type SmallPopupProps = {
  title?: string;
  text?: string;
  buttonList?: ButtonItem[];
  popupCloser: React.Dispatch<React.SetStateAction<boolean>>;
};
type ButtonItem = {
  text: string;
  method: () => any;
  danger?: boolean;
};

export default SmallPopup;
