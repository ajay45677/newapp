import React, { useEffect, useState, useRef } from "react";
import "animate.css";

interface ValueItem {
  title: string;
  description: string;
}

const ValuesSection: React.FC = () => {
  const [values, setValues] = useState<ValueItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/values") // Ensure server is running
      .then((response) => response.json())
      .then((data) => setValues(data))
      .catch((error) => console.error("Error fetching values:", error));
  }, []);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
      
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="value-section aout-ss" ref={sectionRef}>
      <div className="container container-custom">
        <h2
           className={` ${
            isVisible
              ? "opacity-100 animate__animated animate__flipInX animate__slower"
              : "opacity-0"
          }`}
        >Our Values</h2>
        <p 
          className={`heading-text ${
            isVisible
              ? "opacity-100 animate__animated animate__slideInRight animate__slower"
              : "opacity-0"
          }`}
        >
          Innovative Solutions Tailored to Your Needs: What Makes Us Unique
        </p>
        <div className="row">
          <div className="col-md-6 d-flex align-items-stretch order-smd-1">
            <div 
                className={`w-100 mt-4 ${
                  isVisible
                    ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                    : "opacity-0"
              }`}
            >
              {values.map((value, index) => (
                <div key={index}>
                  <h6>{value.title}</h6>
                  <p className="para-text">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div
             className={` col-md-6 d-flex align-items-stretch ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                : "opacity-0"
            }`}
          >
            <img
              alt="Drupal development services"
              src="https://www.techinventive.com/img/b6f2116b1c88f9be2de2af548ac092d6.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
