import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<WhyChooseUsData | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ajay45677/webapi/main/choose-us.json"
    )
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
    if (!data) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { autoAlpha: 0, y: -40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, x: -60 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Reasons box animation
      if (reasonsRef.current) {
        gsap.fromTo(
          reasonsRef.current,
          { autoAlpha: 0, x: 60 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: reasonsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <div className="value-section h-auto" ref={sectionRef}>
      <div className="container container-custom">
        {!data ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 ref={titleRef}>{data.title}</h2>
            <p className="heading-text" ref={subtitleRef}>
              {data.subtitle}
            </p>
            <div className="row">
              <div className="col-md-6 d-flex align-items-stretch">
                <img
                  alt="Drupal development services"
                  src={data.image}
                  className="img-fluid"
                  ref={imageRef}
                />
              </div>
              <div className="col-md-6 d-flex align-items-stretch">
                <div className="w-100 mt-4" ref={reasonsRef}>
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
