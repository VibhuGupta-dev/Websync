import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { HowItWork } from "./components/HowItworks";
import { Projects } from "./components/Project";
import { Services } from "./components/Services";
import { ClientReviews } from "./components/ClientReviews";
import { Footer } from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const navbarRef = useRef(null);
  const navLinksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".home-section",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".howitwork",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".project",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".service",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Home navbarRef={navbarRef} navLinksRef={navLinksRef} />
      <Navbar navbarRef={navbarRef} navLinksRef={navLinksRef} />
      <HowItWork />
      <Projects />
      <Services />
      <ClientReviews />
      <Footer />
    </div>
  );
}