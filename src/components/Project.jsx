import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bakery from "../assets/Bakery.png";
import ecommerce from "../assets/ecommerce.png";
import gym from "../assets/gym.png";
import salon from "../assets/salon.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    name: "GLOW RITUALS",
    tag: "E-Commerce",
    url: "https://glow-rituals-xdvx.vercel.app/",
    image: ecommerce,
    year: "2026",
  },
  {
    id: "02",
    name: "IRON GYM",
    tag: "Fitness",
    url: "https://gym-template-ruby.vercel.app/",
    image: gym,
    year: "2026",
  },
  {
    id: "03",
    name: "THE BAKERY",
    tag: "Food & Beverage",
    url: "https://bakery-template-six.vercel.app/",
    image: bakery,
    year: "2025",
  },
  {
    id: "04",
    name: "SALON LUXE",
    tag: "Beauty & Wellness",
    url: "https://salon-gamma-two.vercel.app/",
    image: salon,
    year: "2025",
  },
];

const pages = [];
for (let i = 0; i < projects.length; i += 2) {
  pages.push(projects.slice(i, i + 2));
}

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col bg-white border border-gray-100 hover:border-[#b3f000]/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 shadow-sm hover:shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-500"
          style={{ opacity: hovered ? 0.75 : 0.5 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
          <span
            className="text-white/90 text-[10px] uppercase tracking-widest"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {project.id}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-medium transition-all duration-300 ${
              hovered ? "bg-[#b3f000] text-black" : "bg-white/90 text-black"
            }`}
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {project.year}
          </span>
        </div>

        {/* Hover CTA — desktop only */}
        <div
          className="absolute inset-0 items-center justify-center transition-all duration-300 hidden sm:flex"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-medium shadow-md">
            View Project
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3
            className="uppercase text-black text-lg leading-none mb-0.5"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {project.name}
          </h3>
          <p className="text-xs text-neutral-500">{project.tag}</p>
        </div>
        <span className="text-black/30 text-lg sm:hidden">↗</span>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goToPage = (idx) => {
    if (idx === currentPage) return;
    setCurrentPage(idx);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setMobilePage((p) => Math.min(pages.length - 1, p + 1));
    if (diff < -50) setMobilePage((p) => Math.max(0, p - 1));
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="project relative z-20 bg-[#f5f0e8] px-4 sm:px-8 md:px-16 lg:px-24 pt-14 pb-14 sm:pt-20 sm:pb-20"
      style={{ boxShadow: "0 -32px 80px rgba(0,0,0,0.08)" }}
    >
      {/* Top border */}
      <div
        className={`absolute top-0 left-0 h-[2px] bg-black transition-all duration-1000 origin-left ${
          visible ? "w-full" : "w-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      />

      <div className="w-full max-w-6xl mx-auto">

        {/* Header */}
        <div
          className={`flex items-end justify-between mb-6 sm:mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <p className="uppercase tracking-[0.4em] text-[10px] text-neutral-500 mb-1">
              Our Work
            </p>
            <h2
              className="uppercase text-black leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)",
                letterSpacing: "0.03em",
              }}
            >
              Projects
            </h2>
          </div>

          {/* Page counter — desktop only */}
          <span
            className="hidden sm:block text-black leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.5rem, 5vw, 3.4rem)",
            }}
          >
            0{currentPage + 1}
            <span className="text-neutral-400"> / 0{pages.length}</span>
          </span>
        </div>

        {/* ── MOBILE: horizontal swipe 2 per page + video ── */}
        <div className="sm:hidden">

          {/* Swipeable area */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${mobilePage * 100}%)` }}
            >
              {pages.map((page, pageIdx) => (
                <div
                  key={pageIdx}
                  className="min-w-full flex flex-col gap-4"
                >
                  {page.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobilePage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === mobilePage ? "w-8 bg-black" : "w-2 bg-black/25"
                }`}
              />
            ))}
          </div>

        

        </div>

        {/* ── DESKTOP: paginated 2-col grid ── */}
        <div
          className={`hidden sm:grid sm:grid-cols-2 gap-8 md:gap-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {pages[currentPage].map((project) => (
            <ProjectCard key={`${project.id}-${currentPage}`} project={project} />
          ))}
        </div>

        {/* ── Pagination — desktop only ── */}
        <div
          className={`hidden sm:flex mt-14 items-center justify-between transition-all duration-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentPage ? "w-8 bg-black" : "w-2 bg-black/25 hover:bg-black/50"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => goToPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-5 py-3 border border-black rounded-xl text-sm disabled:opacity-30 hover:bg-black hover:text-white transition-all"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              ← Prev
            </button>
            <button
              onClick={() => goToPage(Math.min(pages.length - 1, currentPage + 1))}
              disabled={currentPage === pages.length - 1}
              className="px-5 py-3 border border-black rounded-xl text-sm disabled:opacity-30 hover:bg-black hover:text-white transition-all"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Next →
            </button>
          </div>
        </div>

      </div>

      {/* Decorative corners */}
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-black/20" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-black/20" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}