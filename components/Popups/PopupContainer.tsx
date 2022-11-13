import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useTransition, animated } from "react-spring";
import styles from "./popup.module.scss";
import CrossX from "../../public/cross.svg";

export type SetIsOpenType = Dispatch<SetStateAction<boolean>>;

type PopupContainerTypes = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // children: (setIsOpen: SetIsOpenType) => ReactElement;
  children: ReactElement;
  isXout?: boolean;
  callback?: () => void;
};

const PopupContainer = ({
  isOpen,
  setIsOpen,
  children,
  isXout = false,
  callback,
}: PopupContainerTypes) => {
  const animateMobile = useMemo(
    () => ({
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
    }),
    []
  );
  const animateDesk = useMemo(
    () => ({
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
    }),
    []
  );

  // const [isOpen, setIsOpen] = useState(true);
  const [phoneAnimation, setPhoneAnimation] = useState<AnimationType>({
    ...animateDesk,
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
      if (nav !== null) nav.style.paddingRight = `${scrollbarWidth + 10}px`;
    } else {
      body.style.overflowY = "scroll";
      body.style.paddingRight = "0px";
      if (nav !== null) nav.style.paddingRight = `10px`;
    }
  }, [isOpen]);

  // popup phone translateX animation
  const transition = useTransition(isOpen, phoneAnimation);

  const checkMediaQuery = useCallback(
    (x: MediaQueryList) => {
      if (x.matches) {
        setPhoneAnimation((p) => ({ ...p, ...animateMobile }));
        return;
      }
      setPhoneAnimation((p) => ({ ...p, ...animateDesk }));
    },
    [animateDesk, animateMobile]
  );

  useEffect(() => {
    let x = window.matchMedia("(max-width: 768px)");
    window.addEventListener("resize", () => {
      checkMediaQuery(x);
    });
    return () => {
      window.removeEventListener("resize", () => {
        checkMediaQuery(x);
      });
    };
  }, [isOpen, checkMediaQuery]);
  useEffect(() => {
    let x = window.matchMedia("(max-width: 768px)");
    checkMediaQuery(x);
  }, [checkMediaQuery]);
  return (
    <>
      {transition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className={styles.SemiTransparentLayer}
            onMouseDown={(e) => {
              if (e.currentTarget === e.target) {
                if (callback) {
                  callback();
                  return;
                }
                setIsOpen(false);
              }
            }}
          >
            {isXout && (
              <CrossX
                className={styles.outsideX}
                onClick={() => {
                  if (callback) {
                    callback();
                    return;
                  }
                  setIsOpen(false);
                }}
              />
            )}
            {children}
          </animated.div>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default PopupContainer;

type AnimationType = {
  from: XOpacity;
  enter: XOpacity;
  leave: XOpacity;
  config?: {
    duration: number;
  };
};
type XOpacity = {
  x: string;
  opacity?: number;
};
