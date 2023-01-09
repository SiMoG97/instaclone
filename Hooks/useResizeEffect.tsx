import { useLayoutEffect } from "react";

const useResizeEffect = (callBack: () => any, dependencies: any[]) => {
  useLayoutEffect(() => {
    window.addEventListener("resize", callBack);
    return () => {
      window.removeEventListener("resize", callBack);
    };
  }, [...dependencies]);
};
export default useResizeEffect;
