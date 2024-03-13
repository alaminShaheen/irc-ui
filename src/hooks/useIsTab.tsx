import { useState, useEffect } from 'react';

function useIsTab(): boolean {
  const [isTab, setIsTab] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth <= 1023);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isTab;
}

export default useIsTab;
