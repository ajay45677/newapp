import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  const [typedTitle, setTypedTitle] = useState('');
  const [showWordSwap, setShowWordSwap] = useState(false);
  const staticPart = 'Welcome to 24/7 ';
  const word = 'Artists';

  // Typing effect for heading
  useEffect(() => {
    let current = 0;
    const fullText = staticPart + word;
    const interval = setInterval(() => {
      setTypedTitle(fullText.slice(0, current + 1));
      current++;
      if (current === fullText.length) {
        clearInterval(interval);

        // Animate the word change after 1s delay
        setTimeout(() => {
          setShowWordSwap(true);
          gsap.fromTo(
            wordRef.current,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }
          );

          // Animate the paragraph
          gsap.to(pRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => {
              // Then animate the button
              gsap.to(buttonRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out',
              });
            },
          });
        }, 1000);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.set(pRef.current, { autoAlpha: 0, x: -50 });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 50 });
      gsap.set(wordRef.current, { autoAlpha: 0, y: 10 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        padding: '150px 20px',
        background: '#f0f0f0',
        position: 'relative',
      }}
    >
      <div ref={contentRef}>
        <h2 style={{ fontSize: '2rem', minHeight: '2.5rem' }}>
          {showWordSwap ? (
            <>
              {staticPart}
              <span ref={wordRef} style={{ display: 'inline-block' }}>
                New Artists
              </span>
            </>
          ) : (
            typedTitle
          )}
        </h2>
        <p ref={pRef} style={{ marginTop: '20px' }}>
          Empowering artists around the globe.
        </p>
        <button
          ref={buttonRef}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
          }}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default AnimatedSection;
