import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";


const App = () => {

  const [taps, setTaps] = useState(0);
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

    const tl = gsap.timeline();

    tl.fromTo(
      swan1.current,
      { y: 700, x: -100},
      { y: 0, x: -80, duration: 3.5, ease: "power2.out" }
    );

    tl.fromTo(
      swan2.current,
      { y: -700, x: 100 },
      { y: 0, x: 80, duration: 3.5, ease: "power2.out" },
      "<"
    );

    // circle around each other
    tl.to(swan1.current, {
      x: 80,
      y: -80,
      duration: 1,
    });

    tl.to(
      swan2.current,
      {
        x: -80,
        y: 80,
        duration: 1,
      },
      "<"
    );

    // come together
    tl.to([swan1.current, swan2.current], {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.inOut",
    });

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
        <img ref={swan2} src="/swan.png" className="absolute w-40 scale-x-[-1]" />
      </div>
    )}
    </div>
  );
};

export default App;