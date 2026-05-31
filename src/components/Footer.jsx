import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef(null);
  const lettersRef = useRef([]);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const letters = lettersRef.current.filter(Boolean);

    gsap.set(letters, { opacity: 0, y: 80 });
    gsap.set(topRef.current, { opacity: 0, y: -20 });
    gsap.set(bottomRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline();

    tl.to(topRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: "power2.out"
    })
    .to(letters, {
      opacity: 1, y: 0, duration: 0.8,
      ease: "power3.out", stagger: 0.05
    }, "-=0.2")
    .to(bottomRef.current, {
      opacity: 1, y: 0, duration: 0.6, ease: "power2.out"
    }, "-=0.4");

  }, [visible]);

  const word = "WEBSYNC";

  return (
    <footer
      ref={sectionRef}
      className="relative z-60 bg-[#1a1a1a] h-150 flex flex-col justify-between overflow-hidden"
      style={{ boxShadow: "0 -32px 80px rgba(0,0,0,0.3)" }}
    >

      {/* Top row */}
      <div
        ref={topRef}
        className="flex flex-col sm:flex-row justify-between items-start px-8 sm:px-12 pt-10 gap-4"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Left: tagline */}
        <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] leading-relaxed max-w-[260px]">
          We build digital products that<br />
          help your business grow online
        </p>

        {/* Right: nav links */}
        <div className="flex gap-8 sm:gap-12">
          {["About", "Services", "Projects", "Contact"].map((item) => (
            <span
              key={item}
              className="text-white/60 text-[11px] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors duration-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Center: WEBSYNC big text */}
      <div className="flex items-center justify-start px-4 sm:px-8 overflow-hidden">
        <h1
          className="flex items-center"
          style={{ gap: "0.04em" }}
        >
          {word.split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => { if (el) lettersRef.current[i] = el }}
              className="inline-block"
              style={
                ch === "S"
                  ? {
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 900,
                      fontStyle: "italic",
                      fontSize: "clamp(80px, 16vw, 220px)",
                      lineHeight: 1,
                      color: "#b3f000",
                      transformOrigin: "center center",
                      marginInline: "0.02em",
                      display: "inline-block",
                      border: "6px solid #b3f000",
                      borderRadius: "999px",
                      paddingInline: "0.12em",
                    }
                  : {
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(80px, 16vw, 220px)",
                      lineHeight: 1,
                      color: "#ffffff",
                    }
              }
            >
              {ch}
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom row */}
      <div
        ref={bottomRef}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end px-8 sm:px-12 pb-10 gap-8"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Left: copyright */}
        <div>
          <p className="text-white/30 text-[15px] uppercase tracking-[0.15em] leading-relaxed">
            © 2026 – Copyright
          </p>
          <p className="text-white/30 text-[15px] uppercase tracking-[0.15em]">
            All Rights Reserved
          </p>
        </div>

        {/* Center: contact */}
        <div>
          <p className="text-white/60 text-[15px] uppercase tracking-[0.2em] mb-2 font-medium">
            Contact Us
          </p>
          <p className="text-white/40 text-[15px] tracking-[0.1em]">
            +91 9044429919
          </p>
          <p className="text-white/40 text-[15px] tracking-[0.1em]">
            websync.co@gmail.com
          </p>
        </div>

        {/* Right: location */}
        <div>
          <p className="text-white/60 text-[15px] uppercase tracking-[0.2em] mb-2 font-medium">
            Location
          </p>
          <p className="text-white/40 text-[15px] tracking-[0.1em] leading-relaxed">
            Lucknow, Uttar Pradesh,<br />
            India — 226001
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Exo+2:ital,wght@1,900&display=swap');
      `}</style>
    </footer>
  );
}