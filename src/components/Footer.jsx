import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Social Icons ──────────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.738-8.835L1.254 2.25H8.08l4.261 5.636 5.902-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socials = [
  {
    label: "Instagram",
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/websync.co.in/",
    handle: "@websync",
  },
  {
    label: "Twitter / X",
    icon: <TwitterIcon />,
    link: "https://twitter.com/WebSync_",
    handle: "@websync",
  },
];

export function Footer() {
  const sectionRef = useRef(null);
  const lettersRef = useRef([]);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const dividerRef = useRef(null);
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
    gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline();

    tl.to(topRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(dividerRef.current, { scaleX: 1, duration: 0.8, ease: "power3.out" }, "-=0.2")
      .to(letters, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 }, "-=0.5")
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

  }, [visible]);

  const word = "WEBSYNC";

  return (
    <footer
      ref={sectionRef}
      className="relative z-60 bg-[#111111] flex flex-col justify-between overflow-hidden"
      style={{ boxShadow: "0 -32px 80px rgba(0,0,0,0.4)" }}
    >
      {/* ── Top row ── */}
      <div
        ref={topRef}
        className="flex flex-col sm:flex-row justify-between items-start px-8 sm:px-12 pt-12 gap-6"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Left: tagline + socials */}
        <div className="flex flex-col gap-5">
          <p className="text-white/40 text-[11px] uppercase tracking-[0.18em] leading-loose">
            We build digital products that<br />
            help your business grow online
          </p>

          {/* Social pills */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 hover:border-[#b3f000]/60 hover:bg-[#b3f000]/5 transition-all duration-300"
              >
                <span className="text-white/40 group-hover:text-[#b3f000] transition-colors duration-300">
                  {s.icon}
                </span>
                <span className="text-white/40 group-hover:text-white/70 text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 hidden sm:block">
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: nav links */}
        <div className="flex gap-8 sm:gap-12 mt-1">
          {["About", "Services", "Projects", "Contact"].map((item) => (
            <span
              key={item}
              className="relative text-white/50 text-[11px] uppercase tracking-[0.25em] cursor-pointer hover:text-[#b3f000] transition-colors duration-300 group"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#b3f000] group-hover:w-full transition-all duration-300" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div ref={dividerRef} className="mx-8 sm:mx-12 mt-10 h-px bg-white/10" />

      {/* ── Center: WEBSYNC big text ── */}
      <div className="flex items-center justify-start px-4 sm:px-8 overflow-hidden py-2">
        <h1 className="flex items-center" style={{ gap: "0.04em" }}>
          {word.split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => { if (el) lettersRef.current[i] = el; }}
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

      {/* ── Divider ── */}
      <div className="mx-8 sm:mx-12 h-px bg-white/10" />

      {/* ── Bottom row ── */}
      <div
        ref={bottomRef}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end px-8 sm:px-12 py-10 gap-8"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Left: copyright */}
        <div className="flex flex-col gap-1">
          <p className="text-white/20 text-[12px] uppercase tracking-[0.18em]">
            © 2026 – Copyright
          </p>
          <p className="text-white/20 text-[12px] uppercase tracking-[0.18em]">
            All Rights Reserved
          </p>
        </div>

        {/* Center: contact */}
        <div className="flex flex-col gap-1">
          <p className="text-[#b3f000]/80 text-[11px] uppercase tracking-[0.25em] mb-2 font-medium">
            Contact Us
          </p>
          <a
            href="tel:+919044429919"
            className="text-white/40 text-[13px] tracking-[0.1em] hover:text-white/70 transition-colors duration-200"
          >
            +91 9044429919
          </a>
          <a
            href="mailto:websync.co@gmail.com"
            className="text-white/40 text-[13px] tracking-[0.1em] hover:text-[#b3f000] transition-colors duration-200"
          >
            websync.co@gmail.com
          </a>
        </div>

        {/* Right: location */}
        <div className="flex flex-col gap-1">
          <p className="text-[#b3f000]/80 text-[11px] uppercase tracking-[0.25em] mb-2 font-medium">
            Location
          </p>
          <p className="text-white/40 text-[13px] tracking-[0.1em] leading-relaxed">
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