import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styles from "./popup.module.scss";
import { useTransition, animated } from "react-spring";

export type SetIsOpenType = Dispatch<SetStateAction<boolean>>;

type PopupContainerTypes = {
  children: (setIsOpen: SetIsOpenType) => ReactElement;
};

const PopupContainer = ({ children }: PopupContainerTypes) => {
  const [isOpen, setIsOpen] = useState(true);
  const [phoneAnimation, setPhoneAnimation] = useState({
    from: {
      x: "100%",
      opacity: 1,
    },
    enter: {
      x: "0%",
      opacity: 1,
    },
    leave: {
      x: "100%",
      opacity: 1,
    },
    config: {
      duration: 200,
    },
  });

  useLayoutEffect(() => {
    const body = window.document.body;
    const nav = document.querySelector<HTMLElement>("body nav");
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollbarWidth}px`;
      if (nav !== null) nav.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      body.style.overflowY = "scroll";
      body.style.paddingRight = "0px";
      if (nav !== null) nav.style.paddingRight = `0px`;
    }
  }, [isOpen]);

  // popup phone translateX animation
  const transition = useTransition(isOpen, phoneAnimation);

  const checkMediaQuery = (x: MediaQueryList) => {
    if (x.matches) {
      setPhoneAnimation({
        ...phoneAnimation,
        from: {
          x: "100%",
          opacity: 1,
        },
        enter: {
          x: "0%",
          opacity: 1,
        },
        leave: {
          x: "100%",
          opacity: 1,
        },
      });
    } else {
      setPhoneAnimation({
        ...phoneAnimation,
        from: {
          x: "0%",
          opacity: 0,
        },
        enter: {
          x: "0%",
          opacity: 1,
        },
        leave: {
          x: "0%",
          opacity: 0,
        },
      });
    }
  };
  useEffect(() => {
    var x = window.matchMedia("(max-width: 768px)");
    window.addEventListener("resize", () => {
      checkMediaQuery(x);
    });
    return () => {
      window.removeEventListener("resize", () => {
        checkMediaQuery(x);
      });
    };
  }, [isOpen]);
  useEffect(() => {
    var x = window.matchMedia("(max-width: 768px)");
    // console.log(x);
    checkMediaQuery(x);
  }, []);
  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className={styles.SemiTransparentLayer}
            onClick={(e) => {
              if (e.currentTarget === e.target) {
                setIsOpen(false);
              }
            }}
          >
            {children(setIsOpen)}
          </animated.div>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default PopupContainer;
