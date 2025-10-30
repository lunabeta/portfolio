import { gsap } from "gsap";

// Creates a GSAP timeline that types each provided line sequentially.
// lineRefs: array of refs to BootLine components exposing { container, typeIn() }
// lineDurations: array of numbers (seconds) for how long each line should take to type
// holdSeconds: time to hold after the final line before calling onComplete
export function createBootTimeline({ lineRefs, lineDurations = [], holdSeconds = 1.0, onComplete }) {
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  lineRefs.forEach((ref, index) => {
    const d = lineDurations[index] ?? 1.0;
    // Use a dummy tween to reserve time and fire typeIn at the start
    tl.to({}, {
      duration: d,
      onStart: () => {
        if (ref.current && typeof ref.current.typeIn === "function") {
          ref.current.typeIn();
        }
      },
    });
    // Subtle flicker after each line
    tl.to(ref.current?.container, { opacity: 0.85, duration: 0.05 })
      .to(ref.current?.container, { opacity: 1, duration: 0.08 });
  });

  // Hold after the last line
  if (holdSeconds > 0) tl.to({}, { duration: holdSeconds });

  if (onComplete) tl.add(onComplete);

  return tl;
}


