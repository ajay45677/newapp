import React, { useEffect, useState, useRef } from "react";
import "animate.css";

interface PortfolioItem {
  id: string;
  image: string;
  category: string;
  alt: string;
}

interface PortfolioData {
  portfolioItems: PortfolioItem[];
  paragraph: string;
}

const PortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setPortfolioData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/3a730933-cc3e-4790-9e7b-100b91524c66")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPortfolioData(data))
      .catch((error) => console.error("Error fetching portfolio data:", error));
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
    <div className="portfolio-section" ref={sectionRef}>
      <div className="container container-custom">
      {!data ? (
          <p>Loading...</p>
        ) : (
          <>
          <ul
             className={`row set-box ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                : "opacity-0"
            }`}
          >
            {data.portfolioItems.map((item) => (
              <li key={item.id}>
                <div className="portfolio-sec">
                  <div className="portfolio-grey">
                    <img alt={item.alt} src={item.image} />
                  </div>
                  <p>{item.category}</p>
                </div>
              </li>
            ))}
          </ul>
          <p 
            className={`heading-text ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                : "opacity-0"
            }`}
          >{data.paragraph}</p>
          </>
      )}
      </div>

      
    </div>
  );
};

export default PortfolioSection;
