import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: "01",
    name: "Priya Sharma",
    company: "Glow Rituals",
    role: "Founder",
    review: "WebSync transformed our online presence completely. The attention to detail and the speed of delivery was beyond our expectations. Our sales increased by 40% within the first month.",
    rating: 5,
    avatar: "PS",
  },
  {
    id: "02",
    name: "Rohan Mehta",
    company: "Iron Gym",
    role: "Owner",
    review: "Absolutely professional team. They understood our brand vision instantly and delivered a website that feels premium and performs even better. Highly recommended.",
    rating: 5,
    avatar: "RM",
  },
  {
    id: "03",
    name: "Anjali Verma",
    company: "The Bakery",
    role: "Co-Founder",
    review: "From the first call to the final delivery, the experience was seamless. The website they built for us gets compliments from every customer who visits.",
    rating: 5,
    avatar: "AV",
  },
  {
    id: "04",
    name: "Kabir Singh",
    company: "Salon Luxe",
    role: "Director",
    review: "WebSync delivered a stunning website in record time. The mobile experience is flawless and our bookings have doubled since the launch. Worth every rupee.",
    rating: 5,
    avatar: "KS",
  },
  {
    id: "05",
    name: "Neha Joshi",
    company: "FitLife Studio",
    role: "CEO",
    review: "The team at WebSync is incredibly talented. They brought our brand to life digitally. The animations and interactions on our site wow every visitor.",
    rating: 5,
    avatar: "NJ",
  },
  {
    id: "06",
    name: "Arjun Patel",
    company: "TechFlow SaaS",
    role: "CTO",
    review: "We needed a complex web app built fast. WebSync delivered clean code, great UI, and on-time deployment. They are our go-to dev partner now.",
    rating: 5,
    avatar: "AP",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#0a0a0a">
          <path d="M7 0l1.8 3.6L13 4.3l-3 2.9.7 4.1L7 9.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col justify-between bg-white border border-black/8 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-black/20 hover:shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <StarRating count={review.rating} />
        <span
          className="text-[10px] text-black/25 tracking-widest"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {review.id}
        </span>
      </div>

      <p
        className="text-black/75 text-sm sm:text-base leading-relaxed flex-1 mb-6"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        "{review.review}"
      </p>

      <div className="flex items-center gap-3 pt-5 border-t border-black/8">
        <div
          className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center text-[#f5f0e8] text-xs font-medium flex-shrink-0"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {review.avatar}
        </div>
        <div>
          <p
            className="text-black text-sm font-medium leading-none mb-0.5"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {review.name}
          </p>
          <p
            className="text-black/40 text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {review.role}, {review.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ClientReviews() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mobilePage, setMobilePage] = useState(0);
  const touchStartX = useRef(null);

  const mobilePages = [];
  for (let i = 0; i < reviews.length; i += 2) {
    mobilePages.push(reviews.slice(i, i + 2));
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, [visible]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setMobilePage((p) => Math.min(mobilePages.length - 1, p + 1));
    if (diff < -50) setMobilePage((p) => Math.max(0, p - 1));
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="client-reviews relative z-50 bg-[#f5f0e8] px-4 sm:px-8 md:px-16 lg:px-24 pt-14 pb-20 sm:pt-20 sm:pb-28"
      style={{ boxShadow: "0 -32px 80px rgba(0,0,0,0.14)" }}
    >
      <div
        className={`absolute top-0 left-0 h-[2px] bg-black transition-all duration-1000 origin-left ${
          visible ? "w-full" : "w-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      />

      <div className="w-full max-w-6xl mx-auto">

        <div ref={headingRef} className="flex items-end justify-between mb-10 sm:mb-16 opacity-0">
          <div>
            <p
              className="uppercase tracking-[0.4em] text-[10px] text-neutral-500 mb-1"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Testimonials
            </p>
            <h2
              className="uppercase text-black leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)",
                letterSpacing: "0.03em",
              }}
            >
              Client Reviews
            </h2>
          </div>
          <span
            className="hidden sm:block text-black/20 leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.5rem, 5vw, 3.4rem)",
            }}
          >
            {reviews.length} Reviews
          </span>
        </div>

        {/* MOBILE: swipeable */}
        <div className="sm:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${mobilePage * 100}%)` }}
            >
              {mobilePages.map((page, pageIdx) => (
                <div key={pageIdx} className="min-w-full flex flex-col gap-4">
                  {page.map((review, i) => (
                    <ReviewCard key={review.id} review={review} index={i} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {mobilePages.map((_, i) => (
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

        {/* DESKTOP: 3 col grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

      </div>

      <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-black/20" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-black/20" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}