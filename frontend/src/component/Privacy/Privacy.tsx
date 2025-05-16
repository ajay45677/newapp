import React, { useEffect, useState, useRef } from "react";
import "animate.css";

interface SectionType {
  heading: string;
  subheading?: string;
  points?: string[];
  content?: string;
}

interface PrivacyPolicyData {
  title: string;
  sections: SectionType[];
}

const Privacy: React.FC = () => {
  const [data, setData] = useState<PrivacyPolicyData | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState<boolean[]>([]);
  
  
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ajay45677/webapi/main/privacy-policy.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((jsonData: PrivacyPolicyData) => {
        setData(jsonData);
        setIsVisible(new Array(jsonData.sections.length).fill(false));
      })
      .catch((err) => console.error("Error fetching privacy policy:", err));
  }, []);

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setIsVisible((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [data]);

  if (!data) return <p>Loading...</p>;

  return (
    <section className="terms-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="animate__animated animate__fadeInUp animate__slower">
              {data.title}
            </h2>
            {data.sections.map((section, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => {
                  sectionRefs.current[index] = el;
                }}
                className={`${
                  isVisible[index]
                    ? "opacity-100 animate__animated animate__fadeInUp animate__slower"
                    : "opacity-0"
                }`}
              >
                <h3>{section.heading}</h3>
                {section.subheading && <h4>{section.subheading}</h4>}
                {section.points ? (
                  <ul>
                    {section.points.map((point, i) => (
                      <li key={i}>
                        <p className="para-text">{point}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="para-text">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
