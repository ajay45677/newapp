import React, { useEffect, useState, useRef } from "react";
import "animate.css";

// Interfaces
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

// Counter component
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

// Main Section Component
const AboutCounterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<CounterSectionData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/about")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="counter" className="achiement-section" ref={sectionRef}>
      <div className="container mx-auto text-center">
        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2
              className={`${
                isVisible
                  ? "opacity-100 animate__animated animate__flipInX animate__slower"
                  : "opacity-0"
              }`}
            >
              {data.aboutContent.heading}
            </h2>
            <p
              className={`heading-text ${
                isVisible
                  ? "opacity-100 animate__animated animate__slideInRight animate__slower"
                  : "opacity-0"
              }`}
            >
              {data.aboutContent.paragraph}
            </p>

            <div
              className={`row ${
                isVisible
                  ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                  : "opacity-0"
              }`}
            >
              <div className="col-md-4">
                <div className="box-ach-2">
                  <h5 className="count percent">
                    <Counter {...data.counterData.countries} />
                  </h5>
                  <p>countries</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box-ach-2">
                  <h5 className="count percent">
                    <Counter {...data.counterData.workingHours} />
                  </h5>
                  <p>working hours</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box-ach-2">
                  <h5 className="count percent">
                    <Counter {...data.counterData.liveProjects} />
                  </h5>
                  <p>Live projects</p>
                </div>
              </div>
            </div>

            <div className="row box-ach">
              <div className="col-md-6 d-flex align-items-center order-smd-1">
                <div
                  className={`w-100 ${
                    isVisible
                      ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                      : "opacity-0"
                  }`}
                >
                  {data.aboutContent.additionalContent.map((text, index) => (
                    <p
                      key={index}
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
              <div
                className={`col-md-6 ${
                  isVisible
                    ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                    : "opacity-0"
                }`}
              >
                <img
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
