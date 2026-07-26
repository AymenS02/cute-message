import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";


const App = () => {

  const [taps, setTaps] = useState(5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [started, setStarted] = useState(false);

  const swan1 = useRef(null);
  const swan2 = useRef(null);

  const handleClick = () => {
    if (taps < 3) {
      setPosition({
        x: Math.random() * 200 - 100,
        y: Math.random() * 300 - 150,
      });
      setTaps((prev) => prev + 1);
      return;
    }

    hideButton();
  };

  const hideButton = () => {
  setStarted(true);

  }
useEffect(() => {
  if (!started) return;
  gsap.set(swan2.current, {
    scaleX: -1,

  });
  const tl = gsap.timeline();

  // Fly in
  tl.fromTo(
    swan1.current,
    { y: 700, x: -200, rotation: -10 },
    {
      y: -100,
      x: -80,
      rotation: 0,
      duration: 3,
      ease: "none",
    }
  );

  tl.fromTo(
    swan2.current,
    { y: -700, x: 200, rotation: 10 },
    {
      y: 100,
      x: 80,
      rotation: 0,
      duration: 3,
      ease: "none",
    },
    "<"
  );

  // Swan 1 waddles around
  tl.to(swan1.current, {
    duration: 4,
    ease: "none",
    keyframes: [
      { x: 100, y: -100, rotation: -8 },
      { x: 100, y: 25, rotation: 8 },
      { x: 50, y: 0, rotation: 0 },
    ],
  });

  // Swan 2 waddles around
  tl.to(
    swan2.current,
    {
      duration: 4,
      ease: "none",
      keyframes: [
      { x: -100, y: 100, rotation: -8 },
      { x: -100, y: -25, rotation: 8 },
      { x: -50, y: 0, rotation: 0 },
      ],
    },
    "<"
  );
}, [started]);
  
  return (
    <div className="flex justify-center items-center h-screen bg-pink-300 overflow-hidden">
      {!started && (
        <button
          onClick={handleClick}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          className="bg-pink-500 text-white font-bold py-2 px-4 rounded transition-transform duration-200"
        >
          Press Here to Start
        </button>
      )}

    {started && (
      <div className="absolute inset-0 flex items-center justify-center">
        <img ref={swan1} src="/swan.png" className="absolute w-40" />
        <img ref={swan2} src="/swan.png" className="absolute w-40" />
      </div>
    )}
    </div>
  );
};

export default App;