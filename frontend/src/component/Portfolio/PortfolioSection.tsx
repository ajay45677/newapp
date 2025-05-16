import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
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
    if (data && sectionRef.current) {
      // Animate portfolio items
      gsap.fromTo(
        itemsRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate paragraph
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          {
            opacity: 0,
            x: 100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }
  }, [data]);

  return (
    <div className="portfolio-section" ref={sectionRef}>
      <div className="container container-custom">
        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul className="row set-box">
              {data.portfolioItems.map((item, index) => (
                <li
                  key={item.id}
                  ref={(el) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                >
                  <div className="portfolio-sec">
                    <div className="portfolio-grey">
                      <img alt={item.alt} src={item.image} />
                    </div>
                    <p>{item.category}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="heading-text" ref={paragraphRef}>
              {data.paragraph}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;
