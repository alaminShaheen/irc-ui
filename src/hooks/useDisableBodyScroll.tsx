import { useEffect } from "react";

const useDisableBodyScroll = (condition?: boolean) => {
  useEffect(() => {
    const html = document.documentElement;
    const timer = setTimeout(() => {
      if (condition || condition === undefined) {
        document.body.style.overflowY = "hidden";
        html.style.overflow = ""; // revert to default overflow
        html.style.padding = "";
      } else {
        document.body.style.overflowY = "auto";
        html.style.overflow = "";
      }
    });
    return () => {
      document.body.style.overflowY = "auto";
      html.style.overflow = "";
      clearTimeout(timer);
    };
  }, [condition]);
};

export default useDisableBodyScroll;
