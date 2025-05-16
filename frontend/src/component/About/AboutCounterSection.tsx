import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  start: number;
  end: number;
  duration: number;
}

interface AboutContent {
  heading: string;
  paragraph: string;
  additionalContent: string[];
}

interface CounterSectionData {
  aboutContent: AboutContent;
  counterData: {
    countries: CounterProps;
    workingHours: CounterProps;
    liveProjects: CounterProps;
  };
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

const AboutCounterSection = () => {
  const [data, setData] = useState<CounterSectionData | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const counterBoxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch data
  useEffect(() => {
    fetch("https://run.mocky.io/v3/ee45fde5-c7f0-47a9-8dff-a28e33980c19")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Run animations AFTER data is loaded
  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      // Animate title spans
      const spans = titleRef.current?.querySelectorAll("span");
      if (spans) {
        gsap.to(spans, {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        });
      }

      // Subtitle animation
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
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  // Utility to render title as spans
  const renderTitleSpans = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} style={{ opacity: 0, display: "inline-block" }}>
        {char}
      </span>
    ));

  return (
    <div id="counter" className="achiement-section" ref={sectionRef}>
      <div className="container mx-auto text-center">
        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 ref={titleRef}>
              {renderTitleSpans(data.aboutContent.heading)}
            </h2>
            <p className="heading-text" ref={subtitleRef}>
              {data.aboutContent.paragraph}
            </p>

            <div className="row">
              {[
                { label: "countries", ...data.counterData.countries },
                { label: "working hours", ...data.counterData.workingHours },
                { label: "Live projects", ...data.counterData.liveProjects },
              ].map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div
                    className="box-ach-2"
                    ref={(el) => {
                      counterBoxesRef.current[index] = el;
                    }}
                  >
                    <h5 className="count percent">
                      <Counter
                        start={item.start}
                        end={item.end}
                        duration={item.duration}
                      />
                    </h5>
                    <p>{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="row box-ach">
              <div className="col-md-6 d-flex align-items-center order-smd-1">
                <div className="w-100">
                  {data.aboutContent.additionalContent.map((text, index) => (
                    <p
                      key={index}
                      ref={(el) => {
                        paragraphsRef.current[index] = el;
                      }}
                      className={`achive-text ${
                        index === data.aboutContent.additionalContent.length - 1
                          ? "fw-bold"
                          : ""
                      }`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <img
                  ref={imageRef}
                  src="https://www.techinventive.com/img/7f3fddff1de1556bba6e8ae55707a1dd.jpg"
                  alt="Responsive Website Design"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutCounterSection;
