export function Navbar({ navbarRef, navLinksRef }) {
  const handleScroll = (link) => {
    const sectionMap = {
      "How It Works": ".howitwork",
      "Projects": ".project",
      "Services": ".service",
      "Client Reviews": ".client-reviews",
    };

    const selector = sectionMap[link];
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={navbarRef}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/25 z-50"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-4 sm:py-5 overflow-x-auto hide-scrollbar">
          {["How It Works", "Projects", "Services", "Client Reviews"].map((link, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) navLinksRef.current[i] = el;
              }}
              onClick={() => handleScroll(link)}
              className="text-[13px] sm:text-[14px] lg:text-[15px] 
                         font-medium tracking-[0.18em] uppercase text-[#0a0a0a] 
                         cursor-pointer hover:opacity-70 active:opacity-50 
                         transition-all whitespace-nowrap px-3 sm:px-4 py-2
                         flex-shrink-0"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}