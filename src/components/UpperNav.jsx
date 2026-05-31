export function UpperNavbar({ navbarRef }) {
  const handleBookCall = () => {
    window.open(
      "https://cal.com/websync-9sou69/bookcall",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const ArrowCircleSVG = () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="21" cy="21" r="20" stroke="#0a0a0a" strokeWidth="1.5" />
      <line x1="14" y1="28" x2="28" y2="14" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="18,14 28,14 28,24" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );

  return (
    <div
      ref={navbarRef}
      className="sticky top-0 left-0 right-0 flex justify-between items-center px-5 sm:px-9 py-4 sm:py-6 z-50"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {/* Left: MENU */}
      <span className="text-[13px] sm:text-[21px] tracking-[0.25em] uppercase text-[#0a0a0a] cursor-pointer hover:opacity-60 transition-opacity">
        Menu
      </span>

      {/* Right: LET'S TALK — mobile: stacked vertically, desktop: side by side */}
      <div
        className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        onClick={handleBookCall}
      >
        {/* Text: on mobile top/bottom, on desktop left of arrow */}
        <div className="flex flex-col items-end leading-none">
          <span className="text-[13px] sm:text-[21px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">
            Let's
          </span>
          <span className="text-[13px] sm:text-[21px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">
            Talk
          </span>
        </div>

        {/* Arrow circle */}
        <div className="group-hover:scale-110 transition-transform flex-shrink-0">
          <ArrowCircleSVG />
        </div>
      </div>
    </div>
  );
}