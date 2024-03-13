import { useEffect } from "react";

const useDisableBodyScroll = (condition?: boolean) => {
  useEffect(() => {
    if (condition || condition === undefined) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [condition]);
};

export default useDisableBodyScroll;
