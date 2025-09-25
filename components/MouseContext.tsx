'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface MouseContextType {
  mouseX: number;
  mouseY: number;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export function MouseContextProvider({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState(() => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 0 };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <MouseContext.Provider value={{ mouseX: mousePosition.x, mouseY: mousePosition.y }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (context === undefined) {
    throw new Error('useMouse must be used within a MouseContextProvider');
  }
  return context;
}
