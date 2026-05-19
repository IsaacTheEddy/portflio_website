"use client"
import React from "react"
import {useState, useEffect} from "react"


export const DualCirclesBG = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get mouse position relative to the viewport
      const { clientX, clientY } = event;
      // Calculate position from the center of the screen
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden transition-transform duration-300 ease-out"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transperant 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        animation: "moveGrid 20s linear infinite",
        // Apply a subtle transform based on mouse position for a parallax effect
      }}
    >
      {/* Glow effect */}
      <div className="absolute top-1/2 left-[35%] md:left-[35%] w-[40vmin] h-[40vmin] lg:w-[60vmin] lg:h-[60vmin] bg-accent-soft-neo rounded-full blur-[10px] md:blur-[15px] lg:blur-[20px] -translate-x-1/3 -translate-y-1/2" />
      <div className="absolute top-1/2 left-[75%] md:left-[65%] w-[40vmin] h-[40vmin] lg:w-[60vmin] lg:h-[60vmin] bg-accent-hard-neo rounded-full blur-[10px] md:blur-[15px] lg:blur-[20px] -translate-x-3/4 -translate-y-1/2" />
      {/* Keyframes for the animation */}
      <style>
        {`
          @keyframes moveGrid {
            0% { background-position: 0 0; }
            100% { background-position: 80px 80px; }
          }
        `}
      </style>
    </div>
  );
};




export default DualCirclesBG;
