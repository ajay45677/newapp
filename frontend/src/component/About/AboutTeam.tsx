import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

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
  const [data, setData] = useState<TeamData | null>(null);
  const [typedHeading, setTypedHeading] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const teamBoxesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/team")
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



  // GSAP Animations for Paragraph and Boxes
  useEffect(() => {
    if (!data) return;

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

    teamBoxesRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
  }, [data]);

  return (
    <div className="value-section bg-white about-team h-auto pt-0">
      <div className="container container-custom">
        <h2 ref={headingRef}>{typedHeading}</h2>
        <p ref={paragraphRef} className="heading-text">
          {data?.paragraph}
        </p>
        <div className="row teams">
          {data?.items.map((member, index) => (
            <div
              key={index}
              className="col-md-4 col-6"
              ref={(el) => {
                teamBoxesRef.current[index] = el;
              }}
            >
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
