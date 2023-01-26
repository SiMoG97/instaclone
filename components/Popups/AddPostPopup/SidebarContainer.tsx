import styles from "../popup.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useIsTabeltOrLess } from "../../../Hooks/useMediaQuery";
import React, { useEffect, useRef, useState } from "react";

type SidebarContainerProps = {
  step: number;
  prevStep: number;
  children: React.ReactNode;
};

const SidebarContainer = ({
  step,
  prevStep,
  children,
}: SidebarContainerProps) => {
  const sideBarRef = useRef<HTMLDivElement>(null);
  const { animation } = useHandleAnimation({ sideBarRef, step, prevStep });
  return (
    <AnimatePresence>
      <motion.div
        ref={sideBarRef}
        {...animation}
        transition={{ duration: 0.2, ease: "easeIn" }}
        className={`${styles.sidebarContainer} ${styles.sidebarFullWidth}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SidebarContainer;

type AnimationT = {
  initial?: AnimationValT;
  animate?: AnimationValT;
  exit?: AnimationValT;
  style?: React.CSSProperties;
};

type AnimationValT = {
  width: string;
  display?: string;
};

function useHandleAnimation({
  sideBarRef,
  step,
  prevStep,
}: {
  sideBarRef: React.RefObject<HTMLDivElement>;
  step: number;
  prevStep: number;
}) {
  const isTablet = useIsTabeltOrLess();
  const [animation, setAnimation] = useState<AnimationT>({} as AnimationT);

  useEffect(() => {
    if (!sideBarRef.current || isTablet) return;
    if (step === 1) {
      if (prevStep === 0) {
        // should stay closed
        sideBarRef.current.style.width = "0";
        setAnimation(() => ({
          initial: {
            width: "0px",
            display: "none",
          },
          animate: {
            width: "0px",
            display: "none",
          },
        }));
      } else if (prevStep === 2) {
        // should close
        sideBarRef.current.style.width = "340px";
        setAnimation(() => ({
          initial: {
            width: "340px",
            display: "block",
          },
          animate: {
            width: "0px",
            transitionEnd: {
              display: "none",
            },
          },
        }));
      }
    } else if (step === 2) {
      if (prevStep === 1) {
        // should open
        sideBarRef.current.style.width = "0px";
        setAnimation(() => ({
          initial: {
            width: "0px",
          },
          animate: {
            width: "340px",
          },
        }));
      } else if (prevStep === 3) {
        // should stay open
        sideBarRef.current.style.width = "340px";
      }
    } else if (step === 3) {
      sideBarRef.current.style.width = "340px";
    }
  }, [step]);
  return { animation };
}
