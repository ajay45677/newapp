import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  start: number;
  end: number;
  duration: number;
}

const Counter: React.FC<CounterProps> = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(start + progress * (end - start)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startTime = null;
            animationFrame = requestAnimationFrame(updateCounter);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      if (observer) observer.disconnect();
    };
  }, [start, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const CounterSection: React.FC = () => {
const titleRef = useRef<HTMLHeadingElement>(null);
const subtitleRef = useRef<HTMLParagraphElement>(null);
const counterBoxesRef = useRef<(HTMLDivElement | null)[]>([]);
const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
const imageRef = useRef<HTMLImageElement>(null);
const linkRef = useRef<HTMLParagraphElement>(null);
const sectionRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    // Typewriter for title
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split("") || [];
      titleRef.current.innerHTML = "";
      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0";
        titleRef.current?.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          delay: i * 0.05,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        });
      });
    }

    // Subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
          },
        }
      );
    }

    // Counter boxes
    counterBoxesRef.current.forEach((box, i) => {
      if (box) {
        gsap.fromTo(
          box,
          { autoAlpha: 0, scale: 0.8 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.5,
            delay: i * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: box,
              start: "top 90%",
            },
          }
        );
      }
    });

    // Paragraphs
    paragraphsRef.current.forEach((p, i) => {
      if (p) {
        gsap.fromTo(
          p,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
            },
          }
        );
      }
    });

    // Image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: 50 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
          },
        }
      );
    }

    // Link
    if (linkRef.current) {
      gsap.fromTo(
        linkRef.current,
        { autoAlpha: 0, scale: 0.8 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: linkRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, sectionRef);

  return () => ctx.revert();
}, []);

return (
    <div id="counter" className="achiement-section py-12" ref={sectionRef}>
      <div className="container mx-auto text-center">
        <h2 ref={titleRef} className="text-3xl font-bold mb-2">
          About US
        </h2>

        <p ref={subtitleRef} className="heading-text text-lg mb-8">
          Innovative Software Solutions Tailored to Your Business Needs.
        </p>

        <div className="row">
          {[50, 100000, 500].map((value, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="box-ach-2"
                ref={(el) => {
                  counterBoxesRef.current[index] = el;
                }}
              >
                <h5 className="count percent">
                  <Counter start={0} end={value} duration={10000} />
                </h5>
                <p>{["countries", "working hours", "Live projects"][index]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row box-ach mt-12">
          <div className="col-md-6 d-flex align-items-center order-smd-1">
            <div className="w-100 dc-br">
              {[
                "At Techinventive Software, we don’t just build websites — we craft digital experiences that captivate, convert, and grow your business. From sleek web designs to powerful apps, our expert team delivers innovative, tailor-made solutions that make your brand stand out.",
                "Whether you're reimagining your current site or launching something new, our mission is simple: turn your vision into a high-performing digital reality. With a commitment to creativity, quality, and customer success — we're here to elevate your online presence like never before.",
              ].map((text, i) => (
                <p
                  key={i}
                  ref={(el) => {
                    paragraphsRef.current[i] = el;
                  }}
                  className="achive-text text-left text-base mb-4"
                >
                  {text}
                </p>
              ))}

              <p
                ref={linkRef}
                className="achive-text text-left text-base"
              >
                <a
                  href="about-us"
                  className="text-blue-600 font-semibold inline-flex items-center gap-1"
                >
                  View more{" "}
                  <img
                    alt="Responsive Website Design Company in Delhi NCR"
                    src="https://www.techinventive.com/img/lucide_move-right.png"
                    className="w-4 h-4"
                  />
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-6">
            {/*<img
              ref={imageRef}
              src="https://www.techinventive.com/img/7f3fddff1de1556bba6e8ae55707a1dd.jpg"
              alt="Responsive Website Design"
              className="rounded-lg shadow-lg w-full"
            />*/}
            <div className="experience-box simple-shadow bounce-in">
                <div className="experience-body d-flex align-items-center">
                    <img decoding="async" src="https://wpriverthemes.com/synck/wp-content/uploads/2023/11/icon1-1.svg" alt="" />
                    <div className="experience-content d-flex align-items-center">
                        <h1>+8</h1>
                        <p>Years  <span>Experience</span></p>
                    </div>
                </div>
            </div>
            <div className="bottom-content d-flex mt-4">
                <div className="our-expert-team-box simple-shadow bounce-in delay-2">
                    <a href="">
                        <div className="our-expert-team-box-inner d-flex align-items-center">
                            <div className="imgs imgs1 d-flex align-items-center">
                                <img decoding="async" src="https://wpriverthemes.com/synck/wp-content/uploads/2023/11/small-img-4-1.png" alt="" />
                                <img decoding="async" src="https://wpriverthemes.com/synck/wp-content/uploads/2023/11/small-img-3-1.png" alt="" />
                                <img decoding="async" src="https://wpriverthemes.com/synck/wp-content/uploads/2023/11/small-img-2-1.png" alt="" />
                                <img decoding="async" src="https://wpriverthemes.com/synck/wp-content/uploads/2023/11/small-img-1-1.png" alt="" />
                            </div>
                            <p>Meet <span>Our Experts</span></p>
                        </div>
                    </a>
                </div>
            
                <div className="google-reviews-box simple-shadow bounce-in delay-3">
                    <div className="left">
                        <span>Verified by</span>
                        <img decoding="async" src="https://wpriverthemes.com/synck/wp-content/uploads/2023/11/icon2-1.svg" alt="" />
                    </div>
                    <div className="right">
                        <div className="stars d-flex align-items-center">
                            ★★★★★                              
                        </div>
                        <p>3245  <span>Reviews</span></p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
