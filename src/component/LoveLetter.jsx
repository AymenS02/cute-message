import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);

  const envelope = useRef(null);
  const clipper = useRef(null);
  const flap = useRef(null);
  const letter = useRef(null);
  const letterTimeline = useRef(null);
  const hand = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(envelope.current, {
        scale: 0,
        rotation: -10,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.8)",
        force3D: true,
      });
    }, envelope);

    return () => {
      ctx.revert();
      letterTimeline.current?.kill();
      gsap.killTweensOf(hand.current);
    };
  }, []);

  const openLetter = () => {
    if (opened) return;
    setOpened(true);

    gsap.set(clipper.current, { overflow: "visible" });

    letterTimeline.current = gsap.timeline({ defaults: { force3D: true } });

    letterTimeline.current
      .to(flap.current, {
        rotateX: -180,
        duration: 0.6,
        ease: "power2.out",
        transformOrigin: "top",
      })
      .to(
        letter.current,
        { y: -200, duration: 0.5, ease: "power2.out" },
        "-=0.15"
      )
      .set(letter.current, { zIndex: 20 })
      .to(letter.current, { y: -10, duration: 0.5, ease: "power2.out" })
      .to(letter.current, {
        y: -14,
        duration: 0.25,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      });

    // Hand image flies in from below with a rotation, 5s after click
    gsap.delayedCall(2, () => {
      gsap.fromTo(
        hand.current,
        { y: 800, rotation: -25, opacity: 0 },
        {
          y: 400,
          rotation: 12,
          opacity: 1,
          duration: 1.1,
          ease: "back.out(1.6)",
          force3D: true,
        }
      );
    });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 px-4">
      <div
        ref={envelope}
        onClick={openLetter}
        className="relative cursor-pointer w-full max-w-[320px] aspect-[5/3]"
        style={{ perspective: "1000px", willChange: "transform" }}
      >
        <div ref={clipper} className="absolute inset-0 overflow-hidden rounded-b-lg">
          <div
            ref={letter}
            className="absolute left-1/2 top-[16%] w-[72%] -translate-x-1/2 rounded-2xl px-3 py-3"
            style={{
              zIndex: 1,
              willChange: "transform",
              background: "linear-gradient(160deg, #fff5f8 0%, #ffeef5 100%)",
              border: "2px solid #ffb6d0",
              boxShadow: "0 12px 28px rgba(255,105,160,0.25), 0 4px 8px rgba(255,105,160,0.15)",
            }}
          >
            <span className="pointer-events-none absolute -left-1 top-2 text-xs" style={{ color: "#ff9fc2" }}>♡</span>
            <span className="pointer-events-none absolute -right-1 bottom-2 text-xs" style={{ color: "#ff9fc2" }}>♡</span>

            <h2 className="mb-1 text-center text-lg">💕</h2>

            <p
              className="text-center text-[11px] leading-5 sm:text-sm sm:leading-6"
              style={{
                fontFamily: "'Baloo 2', 'Quicksand', system-ui, sans-serif",
                color: "#c2427a",
                fontWeight: 500,
              }}
            >
              إلى أغلى إنسانة،
              <br />
              كل لحظة معك أصبحت من أجمل ذكرياتي.
              <br />
              الله يحفظ من جعلت حياتي أكثر نوراً وسعادة.
              <br />
              أحبك أكثر مما تستطيع الكلمات أن تصف.
            </p>
          </div>

          <div
            className="absolute inset-x-0 bottom-0 h-full rounded-b-2xl"
            style={{
              zIndex: 5,
              background: "linear-gradient(160deg, #ffc4dd 0%, #ff9fc2 100%)",
              boxShadow: "0 16px 36px rgba(255,105,160,0.3)",
            }}
          >
            <span className="pointer-events-none absolute left-3 bottom-3 text-sm" style={{ color: "#fff", opacity: 0.7 }}>♡</span>
            <span className="pointer-events-none absolute right-4 bottom-6 text-xs" style={{ color: "#fff", opacity: 0.6 }}>♡</span>
            <span className="pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 text-xs" style={{ color: "#fff", opacity: 0.5 }}>♡</span>
          </div>
        </div>

        <div
          ref={flap}
          className="absolute inset-x-0 top-0 origin-top"
          style={{
            height: "48%",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background: "linear-gradient(160deg, #ffb6d0 0%, #ff8fb8 100%)",
            zIndex: 10,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          <div
            className="absolute left-1/2 top-[68%] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs"
            style={{
              background: "#fff",
              boxShadow: "0 2px 6px rgba(255,105,160,0.4)",
              color: "#ff6b9d",
            }}
          >
            ♥
          </div>
        </div>
      </div>

      <img
        ref={hand}
        src="/hand.jpg"
        alt="Hand"
        className="absolute w-24 h-24 rounded-lg shadow-xl"
        style={{
          top: "20%",
          zIndex: 30,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}