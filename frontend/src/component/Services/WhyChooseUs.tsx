import React, { useEffect, useState, useRef } from "react";
import "animate.css";

interface Reason {
  title: string;
  description: string;
}

interface WhyChooseUsData {
  title: string;
  subtitle: string;
  image: string;
  reasons: Reason[];
}

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<WhyChooseUsData | null>(null);

  useEffect(() => {
        fetch("https://raw.githubusercontent.com/ajay45677/webapi/main/choose-us.json")
          .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
          })
          .then((jsonData: WhyChooseUsData) => {
            setData(jsonData);
          })
          .catch((err) => console.error("Error fetching data:", err));
  }, []);

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
    <div className="value-section h-auto" ref={sectionRef}>
      <div className="container container-custom">
        {!data ? ( <p>Loading...</p> ) : (
          <>
            <h2
              className={` ${
                isVisible
                  ? "opacity-100 animate__animated animate__flipInX animate__slower"
                  : "opacity-0"
              }`}
            >{data.title}</h2>
            <p
              className={`heading-text ${
                isVisible
                  ? "opacity-100 animate__animated animate__slideInRight animate__slower"
                  : "opacity-0"
              }`}
            >{data.subtitle}</p>
            <div className="row">
              <div className="col-md-6 d-flex align-items-stretch">
                <img alt="Drupal development services" src={data.image}
                  className={`h-auto ${
                    isVisible
                      ? "opacity-100 animate__animated animate__slideInLeft animate__slower"
                      : "opacity-0"
                  }`}
              />
              </div>
              <div className="col-md-6 d-flex align-items-stretch">
                <div 
                    className={`w-100 mt-4 ${
                      isVisible
                        ? "opacity-100 animate__animated animate__slideInRight animate__slower"
                        : "opacity-0"
                    }`}
                >
                  {data.reasons.map((reason, index) => (
                    <div key={index}>
                      <h6>{reason.title}</h6>
                      <p className="para-text">{reason.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </>
        )}
      </div>    
    </div>
  );
};

export default WhyChooseUs;
