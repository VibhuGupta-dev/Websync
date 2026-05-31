import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HowItWork() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const counterRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          
          if (counterRef.current) {
            let count = 0;
            const target = 40;
            const interval = setInterval(() => {
              count += 4;
              if (count >= target) {
                count = target;
                clearInterval(interval);
              }
              if (counterRef.current) counterRef.current.textContent = count + "+";
            }, 18);
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const sideBlocks = ["Strategy", "Design", "Dev", "Launch", "Growth"];
  const lines = ["YOU BRING", "THE IDEA.", "WE BUILD", "THE WEBSITE" , "in 21 days"];

  const stats = [
    { value: null, counter: true, label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "4x", label: "Avg. Lead Growth" },
  ];

  return (
    <section
      ref={sectionRef}
      className="howitwork  z-20 min-h-screen bg-[#f5f0e8] flex flex-col justify-center
        px-6 sm:px-10 md:px-16 lg:px-24 py-16"
      style={{
        boxShadow: "0 -32px 80px rgba(0,0,0,0.14)",
        overflowX: "hidden",
      }}
    >
      {/* Decorative top border line */}
      <div
        className={`absolute top-0 left-0 h-[2px] bg-black transition-all duration-1000 origin-left
          ${visible ? "w-full" : "w-0"}`}
        style={{ transitionDelay: "200ms" }}
      />

      {/* Decorative corner tick marks */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-black/20" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-black/20" />

      <div className="w-full max-w-6xl mx-auto relative">

        {/* Left vertical badge */}
        <div
          className={`hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2
            text-[0.48rem] uppercase tracking-[0.28em] text-neutral-300
            transition-opacity duration-700
            ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ writingMode: "vertical-rl", transitionDelay: "1800ms" }}
        >
          Web Agency Est. 2024
        </div>

        {/* ── TOP ROW: heading + stats ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">

          {/* HEADING */}
          <div
            className={`transition-all duration-500
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "80ms" }}
          >
            <p className="uppercase tracking-[0.45em] text-[15px] text-neutral-900 mb-1.5">
              About
            </p>
            <h2
              className="uppercase leading-none text-black m-0"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(3rem, 9vw, 6rem)",
                letterSpacing: "0.05em",
              }}
            >
              Websync
            </h2>
            {/* Animated underline */}
            <div className="relative mt-2.5 h-[3px] w-24 bg-black/8 overflow-hidden rounded-full">
              <div
                className={`absolute inset-y-0 left-0 bg-[#b3f000] transition-all duration-700 origin-left rounded-full
                  ${visible ? "w-full" : "w-0"}`}
                style={{ transitionDelay: "500ms" }}
              />
            </div>
          </div>

          {/* STATS ROW */}
          <div
            className={`flex gap-6 sm:gap-8 transition-all duration-500
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "600ms" }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col  items-start sm:items-end">
                <span
                  className="text-black leading-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.counter ? (
                    <span ref={counterRef}>0+</span>
                  ) : stat.value}
                </span>
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.18em] text-black/50 mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className={`w-full h-px bg-black/10 mb-10 sm:mb-14 transition-all duration-700 origin-left
            ${visible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
          style={{ transitionDelay: "400ms" }}
        />

        {/* ── MAIN ROW: headline + side blocks ── */}
        <div className="flex items-center gap-4 sm:gap-8 overflow-hidden">

          {/* Headline */}
          <div className="relative flex-1 min-w-0">

            {/* Sticker */}
            <div
              className={`absolute -top-7 -left-1 sm:-top-9 sm:-left-2 bg-[#b3f000] text-black uppercase
                text-[0.72rem] sm:text-[0.88rem] tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5
                z-10 rotate-[-12deg] transition-all duration-500 origin-center
                ${visible ? "opacity-100 scale-90" : "opacity-0 scale-50"}`}
              style={{
                transitionDelay: "1000ms",
                transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
                borderRadius: "3px",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              WEBSYNC
            </div>

            {lines.map((line, i) => (
              <div
                key={i}
                ref={(el) => { if (el) lineRefs.current[i] = el; }}
                className="overflow-hidden"
                style={{ lineHeight: 0.88 }}
              >
                <span
                  className={`block uppercase text-black transition-transform duration-700
                    ${visible ? "translate-y-0" : "translate-y-full"}`}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.8rem, 9.5vw, 6rem)",
                    letterSpacing: "-0.015em",
                    transitionDelay: `${200 + i * 120}ms`,
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {i === lines.length - 1 ? (
                    <span className="inline-flex items-center gap-2 sm:gap-5">
                      {line}
                      {/* Pill */}
                      <span
                        className={`inline-flex items-center justify-center shrink-0
                          border-[3px] border-black rounded-full relative
                          transition-all duration-500
                          w-9 h-[18px] sm:w-12 sm:h-6 md:w-16 md:h-8
                          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                        style={{ transitionDelay: "1200ms" }}
                      >
                        <span className="absolute rounded-full bg-[#b3f000] animate-ping opacity-40 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="rounded-full bg-[#b3f000] relative z-10 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </span>
                    </span>
                  ) : line}
                </span>
              </div>
            ))}
          </div>

          {/* Side blocks */}
          <div className="flex flex-col gap-1 sm:gap-2 shrink-0">
            {sideBlocks.map((label, i) => (
              <span
                key={label}
                className={`uppercase tracking-widest whitespace-nowrap
                  text-[0.45rem] sm:text-[0.58rem] md:text-[1.98rem]
                  px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2
                  transition-all duration-500 cursor-default
                  ${i % 2 === 1 ? "bg-[#b3f000] text-black" : "bg-black text-[#f5f0e8]"}
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  borderRadius: "3px",
                  transitionDelay: `${1450 + i * 80}ms`,
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  transformOrigin: "right center",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div
          className={`mt-10 sm:mt-14 flex flex-col sm:flex-row items-start sm:items-end
            justify-between gap-5 sm:gap-10 transition-all duration-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ transitionDelay: "1100ms" }}
        >
          {/* Left: description + CTA */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-px bg-black/10 sm:hidden" />
            <p className="text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.12em] leading-[1.9] text-neutral-500 max-w-xs sm:max-w-sm">
              From strategy and design to development and launch, we create
              high-converting websites that help your business attract leads and
              grow online.
            </p>
            {/* CTA button */}
            <div
              className={`inline-flex items-center gap-3 group cursor-pointer transition-all duration-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{ transitionDelay: "1300ms" }}
            >
            </div>
          </div>

          {/* Right: tagline + small badge */}
          <div className="text-left sm:text-right shrink-0 flex flex-col items-start sm:items-end gap-2">
            <p
              className="uppercase text-base sm:text-lg text-black leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
            >
              High-converting websites
            </p>
            <p className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-neutral-400">
              that help you grow
            </p>
            {/* Small live badge */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b3f000] animate-pulse" />
              <span className="text-[0.5rem] uppercase tracking-[0.2em] text-neutral-400">
                Currently taking projects
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative bottom corner ticks */}
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-black/20" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-black/20" />

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </section>
  );
}