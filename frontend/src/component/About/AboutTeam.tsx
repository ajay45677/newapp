import React, { useEffect, useState, useRef } from "react";
import "animate.css";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamData {
  heading: string;
  paragraph: string;
  items: TeamMember[];
}

const AboutTeam: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<TeamData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/team")
    .then((response) => response.json())
    .then((data) => setData(data))
      .catch(error => console.error("Error fetching values:", error));
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
    <div className="value-section bg-white about-team h-auto pt-0" ref={sectionRef}>
      <div className="container container-custom">
        <h2
           className={`${
            isVisible
              ? "opacity-100 animate__animated animate__flipInX animate__slower"
              : "opacity-0"
          }`}
        >{data?.heading}</h2>
        <p
          className={`heading-text ${
            isVisible
              ? "opacity-100 animate__animated animate__slideInRight animate__slower"
              : "opacity-0"
          }`}
        >{data?.paragraph}</p>
        <div
           className={`row teams ${
            isVisible
              ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
              : "opacity-0"
          }`}
        >
          {data?.items.map((member, index) => (
            <div key={index} className="col-md-4 col-6">
              <div className="team-box">
                <img alt={member.name} src={member.image} />
                <div className="team-more">
                  <h5>{member.name}</h5>
                  <p>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;
