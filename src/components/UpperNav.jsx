// UpperNavbar.jsx
import { useRef } from "react";
import { StaggeredMenu } from "./StaggeredMenu";

const socialItems = [
  { label: "Twitter",  link: "https://twitter.com" },
  { label: "GitHub",   link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const ArrowCircleSVG = () => (
  <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="20" stroke="#0a0a0a" strokeWidth="1.5" />
    <line x1="14" y1="28" x2="28" y2="14" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="18,14 28,14 28,24" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// Section scroll map — same as Navbar
const sectionMap = {
  "How It Works":   ".howitwork",
  "Projects":       ".project",
  "Services":       ".service",
  "Client Reviews": ".client-reviews",
};

export function UpperNavbar({ navbarRef }) {
  const menuToggleRef = useRef(null);

  const handleBookCall = () => {
    window.open("https://cal.com/vibhu-gupta-d2rvc8/websync", "_blank", "noopener,noreferrer");
  };

  // Scroll to section + close menu
  const handleMenuItemClick = (label) => {
    // Close menu first
    menuToggleRef.current?.close?.();

    // Small delay so close animation starts before scroll
    setTimeout(() => {
      const selector = sectionMap[label];
      if (selector) {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 320); // matches playClose duration (0.32s)
  };

  const menuItems = [
    { label: "How It Works",   ariaLabel: "Go to How It Works section",   link: "#", onClick: () => handleMenuItemClick("How It Works") },
    { label: "Projects",       ariaLabel: "Go to Projects section",        link: "#", onClick: () => handleMenuItemClick("Projects") },
    { label: "Services",       ariaLabel: "Go to Services section",        link: "#", onClick: () => handleMenuItemClick("Services") },
    { label: "Client Reviews", ariaLabel: "Go to Client Reviews section",  link: "#", onClick: () => handleMenuItemClick("Client Reviews") },
  ];

  return (
    <div
      ref={navbarRef}
      className="sticky top-0 left-0 right-0 z-50"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {/* ── Navbar bar ── */}
      <div className="flex justify-between items-center px-5 sm:px-9 py-4 sm:py-6">
        {/* Left: MENU */}
        <span
          onClick={() => menuToggleRef.current?.toggle?.()}
          className="text-[13px] sm:text-[21px] tracking-[0.25em] uppercase text-[#0a0a0a] cursor-pointer hover:opacity-60 transition-opacity select-none"
        >
          Menu
        </span>

        {/* Right: LET'S TALK */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          onClick={handleBookCall}
        >
          <div className="flex flex-col items-end leading-none">
            <span className="text-[13px] sm:text-[21px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">
              Let's
            </span>
            <span className="text-[13px] sm:text-[21px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#0a0a0a] group-hover:opacity-60 transition-opacity">
              Talk
            </span>
          </div>
          <div className="group-hover:scale-110 transition-transform flex-shrink-0">
            <ArrowCircleSVG />
          </div>
        </div>
      </div>

      {/* ── StaggeredMenu ── */}
      <StaggeredMenu
        isFixed
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        colors={["#0a0a0a", "#1a1a1a"]}
        accentColor="#b3f000"
        menuButtonColor="#0a0a0a"
        openMenuButtonColor="#0a0a0a"
        changeMenuColorOnOpen={false}
        customToggle={({ toggle, close }) => {
          // Expose both toggle and close to the ref
          menuToggleRef.current = { toggle, close };
          return null;
        }}
      />
    </div>
  );
}