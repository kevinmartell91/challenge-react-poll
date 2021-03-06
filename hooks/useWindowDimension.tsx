import { useState, useEffect } from 'react';
import { Dimension } from "../types";

function getWindowDimension(): Dimension {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  }
}

export default function useWindowDimension(): Dimension {
  const [windowDimension, setWindowDimension] = useState<Dimension>(getWindowDimension());
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowDimension(getWindowDimension());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      removeEventListener('resize', handleWindowResize);
    }
  }, []);

  return windowDimension;

}


