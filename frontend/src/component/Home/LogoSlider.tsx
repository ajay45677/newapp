import React, { useEffect, useRef, useState } from "react";
import TrustedLogosSlider from "./TrustedLogosSlider";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LogoSlider: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [typedTitle, setTypedTitle] = useState("");
  const fullTitle = "Trusted by leading companies";

  // Typing effect
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, current + 1));
      current++;
      if (current === fullTitle.length) clearInterval(interval);
    }, 260);
    return () => clearInterval(interval);
  }, []);

    
 

  // GSAP fade-in animation on scroll
  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef}>
      <h2 ref={headingRef}>{typedTitle}</h2>
      <TrustedLogosSlider />
    </div>
  );
};

export default LogoSlider;
