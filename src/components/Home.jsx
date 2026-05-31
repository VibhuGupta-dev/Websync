import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../index.css";
import { UpperNavbar } from "./UpperNav";

export function Home({ navbarRef, navLinksRef }) {
  const lettersRef = useRef([]);
  const crossLRef = useRef();
  const crossRRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const letters = lettersRef.current.filter(Boolean);
    if (!letters.length) return;

    gsap.set(letters, { opacity: 0, x: -180 });
    gsap.set(crossLRef.current, { opacity: 0, scale: 0 });
    gsap.set(crossRRef.current, { opacity: 0, scale: 0 });

    if (navbarRef?.current) {
      gsap.set(navbarRef.current, { opacity: 0 });
    }

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      },
    });

    tl.to([letters[0], letters[1], letters[2]], {
      x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.04,
    })
      .to([letters[4], letters[5], letters[6]], {
        x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.04,
      }, "-=0.5")
      .to(letters[3], {
        x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
      }, "-=0.4")
      .to(letters[3], { scaleX: 1.7, scaleY: 0.75, duration: 0.4, ease: "power3.out" })
      .to(letters[3], { scaleX: 1.55, scaleY: 1, duration: 0.7, ease: "elastic.out(1, 0.45)" });

    if (navbarRef?.current) {
      tl.to(navbarRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3");
    }

    tl.to([crossLRef.current, crossRRef.current], {
      scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.5)", stagger: 0.08,
    }, "-=0.3");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const CrosshairSVG = () => (
    <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="12" height="12" fill="#0a0a0a" />
      <line x1="20" y1="0" x2="20" y2="12" stroke="#0a0a0a" strokeWidth="1" />
      <line x1="20" y1="28" x2="20" y2="40" stroke="#0a0a0a" strokeWidth="1" />
      <line x1="0" y1="20" x2="12" y2="20" stroke="#0a0a0a" strokeWidth="1" />
      <line x1="28" y1="20" x2="40" y2="20" stroke="#0a0a0a" strokeWidth="1" />
    </svg>
  );

  return (
    // ✅ home-section class + sticky top-0 add kiya
    <div
  className="home-section sticky top-0 z-10 bg-[#f5f0e8] h-screen overflow-hidden"
  style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <UpperNavbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Exo+2:ital,wght@1,900&display=swap');
      `}</style>

      <div ref={crossLRef} className="absolute left-8 top-1/2 -translate-y-1/2">
        <CrosshairSVG />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%]">
        <h1 className="flex items-center" style={{ gap: "0.12em" }}>
          {["W", "E", "B"].map((ch, i) => (
            <span
              key={i}
              ref={(el) => { if (el) lettersRef.current[i] = el; }}
              className="inline-block"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px, 11vw, 160px)", lineHeight: 1, color: "#0a0a0a" }}
            >
              {ch}
            </span>
          ))}

          <span
            ref={(el) => { if (el) lettersRef.current[3] = el; }}
            className="inline-block"
            style={{
              fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontStyle: "italic",
              fontSize: "clamp(76px, 11vw, 175px)", lineHeight: 1, color: "#e31717",
              transformOrigin: "center center", marginInline: "0.09em",
            }}
          >
            S
          </span>

          {["Y", "N", "C"].map((ch, i) => (
            <span
              key={i + 4}
              ref={(el) => { if (el) lettersRef.current[i + 4] = el; }}
              className="inline-block"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px, 11vw, 160px)", lineHeight: 1, color: "#0a0a0a" }}
            >
              {ch}
            </span>
          ))}
        </h1>
      </div>

      <div ref={crossRRef} className="absolute right-8 top-1/2 -translate-y-1/2">
        <CrosshairSVG />
      </div>
    </div>
  );
}