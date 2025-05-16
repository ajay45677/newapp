import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

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

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/a19ed5f5-b25c-42f0-8429-eab9bc935422')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch portfolio data");
        return res.json();
      })
      .then((data) => setPortfolioDatas(data))
      .catch((err) => {
        console.error(err);
        setError("Error fetching portfolio data. Please try again.");
      });
  }, []);

  useEffect(() => {
    if (portfolioDatas.length === 0) return;

    // Animate main sections
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Animate bottom detail boxes
    detailRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [portfolioDatas]);

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {portfolioDatas.map((item, index) => {
        const orderImage = index % 2 === 0 ? 'order-md-1' : 'order-md-2';
        const orderText = index % 2 === 0 ? 'order-md-2' : 'order-md-1';

        return (
          <div key={item.id} className={`portfolio-${index + 1}`}>
            <div className="container container-custom">
              <div
                className="row align-items-center"
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
              >
                <div className={`col-md-7 ${orderText}`}>
                  <div>
                    <h2>
                      <span className="color-11">{item.title.split(' ')[0]}</span>{" "}
                      <span className="color-12">{item.title.split(' ')[1]}</span>
                    </h2>
                    <ul>
                      {item.category.map((cat, idx) => <li key={idx}>{cat}</li>)}
                    </ul>
                    <p><span>Business challenge:</span> {item.businessChallenge}</p>
                    <p><span>Solution:</span> {item.solution}</p>
                    <p>
                      <span>Find it here:</span>{" "}
                      <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                    </p>
                  </div>
                </div>
                <div className={`col-md-5 ${orderImage} d-flex justify-content-center`}>
                  <img
                    alt="Portfolio"
                    src={item.websiteImages[0]}
                    className="img-fluid rounded"
                  />
                </div>
              </div>

              <div
                className={`portfolio-details colors-${index + 1}`}
                ref={(el) => {
                  detailRefs.current[index] = el;
                }}
              >
                <div className="row">
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
                        <img key={idx} alt="Tech" src={img} className="me-3" />
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
