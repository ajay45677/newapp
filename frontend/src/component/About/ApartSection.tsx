import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ApartItem {
  title: string;
  description: string;
  imageUrl: string;
}

interface ApartData {
  heading: string;
  paragraph: string;
  items: ApartItem[];
}

const ApartSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [typedHeading, setTypedHeading] = useState("");
  const [data, setData] = useState<ApartData | null>(null);

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/api/apart")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching values:", error));
  }, []);

  // Typing Effect for Heading
    useEffect(() => {
    if (!data?.heading) return;
  
    setTypedHeading(""); // reset before typing starts
  
    let current = 0;
    const interval = setInterval(() => {
      setTypedHeading((prev) => {
        const nextChar = data.heading[current];
        current++;
        if (current >= data.heading.length) clearInterval(interval);
        return prev + nextChar;
      });
    }, 100);
  
    return () => clearInterval(interval);
  }, [data?.heading]);

  // GSAP animations
  useEffect(() => {
    if (!data) return;

    // Animate paragraph
    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animate boxes
    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, [data]);

  return (
    <div className="value-section aout-ss bg-white h-auto">
      <div className="container container-custom">
        <h2 ref={headingRef}>{typedHeading}</h2>
        <p ref={paragraphRef} className="heading-text">
          {data?.paragraph}
        </p>
        <div className="row set-box">
          {data?.items.map((item, index) => (
            <div
              key={index}
              className="col-md-3"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              <div className="circle-grey">
                <img src={item.imageUrl} alt={item.title} />
              </div>
              <h6>{item.title}</h6>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApartSection;
