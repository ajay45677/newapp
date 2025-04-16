import React, { useEffect, useState, useRef } from "react";
import "animate.css";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<ApartData | null>(null);

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/api/apart")
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error("Error fetching values:", error));
  }, []);

  // Animate on scroll
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
    <div className="value-section aout-ss bg-white h-auto" ref={sectionRef}>
      <div className="container container-custom">
        <h2
          className={`${
            isVisible
              ? "opacity-100 animate__animated animate__flipInX animate__slower"
              : "opacity-0"
          }`}
        >
          {data?.heading}
        </h2>
        <p
          className={`heading-text ${
            isVisible
              ? "opacity-100 animate__animated animate__slideInRight animate__slower"
              : "opacity-0"
          }`}
        >
          {data?.paragraph}
        </p>
        <div
          className={`row set-box ${
            isVisible
              ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
              : "opacity-0"
          }`}
        >
          {data?.items.map((item, index) => (
            <div key={index} className="col-md-3">
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
