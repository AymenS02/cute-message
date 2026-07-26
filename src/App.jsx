import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import LoveLetter from "./component/LoveLetter";


const App = () => {

  const buttonTexts = [
    "اضغط هنا للبدء",
    "لا هنا",
    "أسرع!!!",
    "آخر مرة",
  ];

  const [taps, setTaps] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [started, setStarted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

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
        duration: 5,
        ease: "back.out",
      }
    );

    tl.fromTo(
      swan2.current,
      { y: -700, x: 200, rotation: 10 },
      {
        y: 100,
        x: 80,
        rotation: 0,
        duration: 5,
        ease: "back.out",
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

    tl.to({}, { duration: 1 });

    tl.call(() => {
      setShowLetter(true);
    });
  }, [started]);

  return (
    <div
      className="relative flex justify-center items-center h-screen overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #ffd6e8 0%, #ffb6d0 50%, #ff9fc2 100%)",
      }}
    >
      {/* Ambient floating heart doodles */}
      <span className="pointer-events-none absolute left-[10%] top-[15%] text-2xl" style={{ color: "#fff", opacity: 0.5 }}>♡</span>
      <span className="pointer-events-none absolute right-[12%] top-[25%] text-xl" style={{ color: "#fff", opacity: 0.4 }}>♡</span>
      <span className="pointer-events-none absolute left-[18%] bottom-[18%] text-lg" style={{ color: "#fff", opacity: 0.45 }}>♡</span>
      <span className="pointer-events-none absolute right-[20%] bottom-[22%] text-2xl" style={{ color: "#fff", opacity: 0.5 }}>♡</span>

      {!started && (
        <button
          onClick={handleClick}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            fontFamily: "'Baloo 2', 'Quicksand', system-ui, sans-serif",
            background: "linear-gradient(160deg, #ff8fb8 0%, #ff6b9d 100%)",
            boxShadow: "0 8px 20px rgba(255,105,160,0.4), 0 3px 6px rgba(255,105,160,0.3)",
          }}
          className="text-white font-semibold py-3 px-6 rounded-full border-2 border-white/60 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {buttonTexts[taps]}
        </button>
      )}

    {started && (
      <div className="absolute inset-0 flex items-center justify-center">
        <img ref={swan1} src="/swan.png" className="absolute w-40 drop-shadow-lg" />
        <img ref={swan2} src="/swan.png" className="absolute w-40 drop-shadow-lg" />
      </div>
    )}

    {showLetter && <LoveLetter />}
    </div>
  );
};

export default App;