import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import FlowingMenu from "./Flowingmenu";

const services = [
  {
    link: "#",
    text: "SEO Optimization",
    image: "https://www.agiledigitalagency.com/wp-content/uploads/2023/08/technical-seo-optimisation-hero-image-1536x1054.jpg",
  },
  {
    link: "#",
    text: "Landing Page",
    image: "https://cdn.prod.website-files.com/5b5729421aca332c60585f78/63f5fa23da820b87c87958be_61ba503872080311dde1ea56_long-form-landing-page-examples.png",
  },
  {
    link: "#",
    text: "Website Optimization",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2070",
  },
  {
    link: "#",
    text: "UI/UX Design",
    image: "https://cdn.dribbble.com/userupload/38651611/file/original-c90803d4fa08a1724420efd6fa540188.png?resize=752x&vertical=center",
  },
  {
    link: "#",
    text: "Full Stack Development",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070",
  },
];

const mobileServices = [
  { id: "01", title: "SEO Optimization" },
  { id: "02", title: "Website Development" },
  { id: "03", title: "Website Optimization" },
  { id: "04", title: "UI/UX Design" },
  { id: "05", title: "Full Stack Development" },
];

export function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mobileItemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
    mobileItemRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: i * 0.08 }
        );
      }
    });
  }, [visible]);

  const menuHeight = services.length * 120;

  return (
    <section
      ref={sectionRef}
      className="service relative z-40 bg-[#f5f0e8] overflow-visible mb-20 pb-20"
      style={{ boxShadow: "0 -32px 80px rgba(0,0,0,0.14)" }}
    >
      <div
        className={`absolute top-0 left-0 h-[2px] bg-black transition-all duration-1000 origin-left ${
          visible ? "w-full" : "w-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      />

      <div ref={headerRef} className="pt-24 pb-10 px-6 lg:px-16 text-center opacity-0">
        <p className="uppercase tracking-[0.5em] text-sm text-black mb-3">
          SERVICES
        </p>
        <h1
          className="text-[38px] md:text-[48px] lg:text-[80px] leading-none font-bold text-red-600"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          WHAT WE OFFER
        </h1>
      </div>

      {/* FlowingMenu wrapper — height px mein fixed but zoom-safe */}
      <div
        className="hidden md:block w-full"
        style={{  height: `${services.length * 13}vh` }}
      >
        <FlowingMenu
          items={services}
          speed={18}
          textColor="#0a0a0a"
          bgColor="#f5f0e8"
          marqueeBgColor="#0a0a0a"
          marqueeTextColor="#f5f0e8"
          borderColor="#0a0a0a"
        />
      </div>

      <div className="md:hidden px-6 pb-20">
        {mobileServices.map((service, i) => (
          <div
            key={i}
            ref={(el) => (mobileItemRefs.current[i] = el)}
            className="opacity-0 flex items-center gap-5 py-7 border-t border-black/10 first:border-t-0"
          >
            <span className="text-[#b3f000] text-xl font-mono font-medium w-10 shrink-0">
              {service.id}
            </span>
            <h2
              className="text-[34px] uppercase tracking-tight text-black leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {service.title}
            </h2>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-8 w-5 h-5 border-b-2 border-l-2 border-black/20" />
      <div className="absolute bottom-8 right-8 w-5 h-5 border-b-2 border-r-2 border-black/20" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .menu__item-link {
          font-family: 'Bebas Neue', sans-serif !important;
          letter-spacing: 0.05em;
          font-size: clamp(32px, 5vh, 60px) !important;
        }
        .marquee span {
          font-family: 'Bebas Neue', sans-serif !important;
          font-size: clamp(32px, 5vh, 60px) !important;
        }
      `}</style>
    </section>
  );
}