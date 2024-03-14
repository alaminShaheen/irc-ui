import { useEffect, useState } from "react";

function useIsMobile(): boolean {
  const [isMobileWindow, setIsMobileWindow] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWindow(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobileWindow;
}

export default useIsMobile;
