import React, { useEffect, useState, useRef } from 'react';
import "animate.css";

interface PortfolioData {
  id: number;
  title: string;
  category: string[];
  businessChallenge: string;
  solution: string;
  link: string;
  platformImages: string[];
  websiteImages: string[];
  techStackImages: string[];
  timeline: string;
  team: string;
}

const PortfolioMain: React.FC = () => {
  const [portfolioDatas, setPortfolioDatas] = useState<PortfolioData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/portfoliodata')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio data");
        }
        return response.json();
      })
      .then((data) => {
        setPortfolioDatas(data.portfolioDatas);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        setError("Error fetching portfolio data. Please try again.");
      });
  }, []);

  // Create a ref for each portfolio section
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]); // This is correct for an array of refs.
  const [isVisible, setIsVisible] = useState<boolean[]>(new Array(portfolioDatas.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
        if (index !== -1 && entry.isIntersecting) {
          const updatedVisibility = [...isVisible];
          updatedVisibility[index] = true;
          setIsVisible(updatedVisibility);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    // Observing each section
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [portfolioDatas, isVisible]);

  return (
    <div>
      {error && <div className="error-message">{error}</div>} {/* Error display */}
      {portfolioDatas.map((item, index) => {
        const layoutClass = index % 2 === 0 ? "flex-row-reverse" : "flex-row";
        const orderClassForImage = index % 2 === 0 ? 'order-md-1' : 'order-md-2';
        const orderClassForText = index % 2 === 0 ? 'order-md-2' : 'order-md-1';

        return (
          <div key={item.id} className={`portfolio-${index + 1}`}>
            <div className="container container-custom">
              <div
                className={`row ${isVisible[index] ? "opacity-100 animate__animated animate__fadeInLeft animate__slower" : "opacity-0"}`}
                ref={(el) => { sectionRefs.current[index] = el }} // Assign ref correctly here
              >
                <div className={`col-md-7 ${orderClassForText} ${layoutClass}`}>
                  <div className="w-100">
                    <h2>
                      <span className="color-11">{item.title.split(' ')[0]}</span>
                      <span className="color-12">{item.title.split(' ')[1]}</span>
                    </h2>
                    <ul>
                      {item.category.map((cat, idx) => (
                        <li key={idx}>{cat}</li>
                      ))}
                    </ul>
                    <p><span>Business challenge:</span> {item.businessChallenge}</p>
                    <p><span>Solution:</span> {item.solution}</p>
                    <p><span>Find it here: </span>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                    </p>
                  </div>
                </div>
                <div className={`col-md-5 ${orderClassForImage} d-flex justify-content-md-center ${layoutClass === 'flex-row-reverse' ? 'justify-content-end' : 'justify-content-start'}`}>
                  <img
                    alt="Portfolio Image"
                    src={item.websiteImages[0]}
                  />
                </div>
              </div>

              <div className={`portfolio-details colors-${index + 1}`}>
                <div
                  className={`row ${isVisible[index] ? "opacity-100 animate__animated animate__fadeInRight animate__slower" : "opacity-0"}`}
                >
                  <div className="col-md-2 col-4 br-32">
                    <p>Platform</p>
                    <div className="portfolio-technology">
                      {item.platformImages.map((img, idx) => (
                        <img key={idx} alt="Platform" src={img} />
                      ))}
                    </div>
                  </div>
                  <div className="col-md-3 col-4 br-32 ps-32">
                    <p>Timeline</p>
                    <h6>{item.timeline} <span>months</span></h6>
                  </div>
                  <div className="col-md-3 col-4 ps-32 br-32">
                    <p>Team</p>
                    <h6>{item.team} <span>members</span></h6>
                  </div>
                  <div className="col-md-4 ps-32">
                    <p>Stack</p>
                    <div className="portfolio-technology custom-for-class">
                      {item.techStackImages.map((img, idx) => (
                        <img key={idx} alt="Technology Stack" src={img} className="me-3" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioMain;
