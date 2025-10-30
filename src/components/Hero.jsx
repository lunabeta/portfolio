import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { createBootTimeline } from "../animations/bootSequence";

const bootLines = [
  [
    { t: "Initializing", c: "text-sky-400" },
    { t: " ", c: "" },
    { t: "...", c: "text-sky-400" },
    { t: " ", c: "" },
  ],
  [
    { t: "Loading", c: "text-sky-400" },
    { t: " ", c: "" },
    { t: '"For a Magical Experience"', c: "text-emerald-300" },
    { t: "...", c: "text-purple-300" },
  ],
  [
    { t: "Connecting", c: "text-sky-400" },
    { t: " ", c: "" },
    { t: "Frontend", c: "text-pink-300" },
    { t: " ", c: "" },
    { t: "&", c: "text-purple-300" },
    { t: " ", c: "" },
    { t: "Backend", c: "text-yellow-300" },
    { t: "...", c: "text-purple-300" },
  ],
];

function BootLine({ tokens, delay = 0, exposeRef }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef(null);
  const total = tokens.length;

  useEffect(() => {
    if (exposeRef) {
      exposeRef.current = {
        container: containerRef.current,
        typeIn: () => {
          gsap.to({ p: 0 }, {
            p: total,
            duration: Math.max(0.6, total * 0.10),
            ease: "none",
            delay,
            onUpdate: function () {
              setVisibleCount(Math.min(total, Math.floor(this.targets()[0].p)));
            },
          });
        },
      };
    }
  }, [delay, total, exposeRef]);

  return (
    <div ref={containerRef} className="boot-line flex items-center justify-center gap-2">
      <code className="font-mono text-base md:text-lg text-white/90 text-center">
        {tokens.slice(0, visibleCount).map((tk, i) => (
          <span key={i} className={tk.c}>{tk.t}</span>
        ))}
        <span className="inline-block w-[10px] md:w-[12px] h-[1.1em] align-middle translate-y-[1px] bg-white/80 animate-pulse ml-1 shadow-[0_0_8px_#ffffffa0]"></span>
      </code>
    </div>
  );
}

export default function Hero() {
  const [stage, setStage] = useState("boot");
  const bootContainerRef = useRef(null);
  const mainContainerRef = useRef(null);
  const laptopRef = useRef(null);

  const lineRefs = useMemo(() => bootLines.map(() => ({ current: null })), []);

  useEffect(() => {
    if (stage !== "boot") return;

    const lineDurations = bootLines.map(tokens => Math.max(1.0, tokens.length * 0.14));
    const estimatedTotal = lineDurations.reduce((a, b) => a + b, 0) + 0.3 * lineDurations.length + 1.0;

    const tl = createBootTimeline({
      lineRefs,
      lineDurations,
      holdSeconds: 1.0,
      onComplete: () => {
        gsap.to(bootContainerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onStart: () => {
            if (bootContainerRef.current) {
              bootContainerRef.current.style.pointerEvents = "none";
            }
          },
          onComplete: () => setStage("main"),
        });
      },
    });

    gsap.fromTo(
      bootContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    const safety = setTimeout(() => {
      if (stage === "boot") setStage("main");
    }, Math.ceil((estimatedTotal + 0.8) * 1000));

    return () => {
      clearTimeout(safety);
      tl.kill();
    };
  }, [stage, lineRefs]);

  useEffect(() => {
    if (stage !== "main") return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-el", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.fromTo(
        laptopRef.current,
        { y: 40, rotateX: -20, rotateY: 10, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.to(laptopRef.current, {
        y: "+=15",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, [stage]);

  const BootOverlay = stage === "boot" ? (
    <section
      ref={bootContainerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_55%)]" />
      <div className="relative z-10 px-6 py-10 text-center max-w-3xl w-full">
        <div className="space-y-3 md:space-y-4 drop-shadow-[0_0_18px_rgba(99,102,241,0.35)]">
          {bootLines.map((tokens, idx) => (
            <BootLine
              key={idx}
              tokens={tokens}
              delay={idx * 0.15}
              exposeRef={lineRefs[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  ) : null;

  return (
    <section
      ref={mainContainerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ✅ Fullscreen Background */}
      <img
        src="/assets/images (1).jpg"
        alt="Hero background"
        className="absolute top-0 left-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/assets/sky.jpg";
        }}
      />

      {/* ✅ Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ✅ Hero Text */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-6 mt-10">
        <h1 className="hero-el font-['General Sans'] text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          Betelhem Worku
        </h1>

        <p className="hero-el mt-3 text-base md:text-lg font-['Space Grotesk'] text-white/80">
          Full-Stack Developer & Problem Solver
        </p>

        {/* ✅ Only Resume Button */}
        <div className="hero-el mt-8 flex items-center justify-center">
          <a
            href="https://flowcv.com/resume/k84ltmd3h21m"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md px-8 py-3 text-sm md:text-base font-medium text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 transition duration-200"
          >
            Download Resume
          </a>
        </div>
      </div>

      {BootOverlay}
    </section>
  );
}
