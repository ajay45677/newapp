import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

interface ValueItem {
  title: string;
  description: string;
}

const ValuesSection: React.FC = () => {
  const [values, setValues] = useState<ValueItem[]>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/1a7407ff-f536-43c1-893d-fdf0415c7822")
      .then((response) => response.json())
      .then((data) => setValues(data))
      .catch((error) => console.error("Error fetching values:", error));
  }, []);

  useEffect(() => {
    if (!values.length) return;

    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { autoAlpha: 0, x: 50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Animate value items
      valueRefs.current.forEach((ref, i) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              delay: i * 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 90%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [values]);

  return (
    <div className="value-section aout-ss" ref={sectionRef}>
      <div className="container container-custom">
        <h2 ref={titleRef}>Our Values</h2>
        <p className="heading-text" ref={subtitleRef}>
          Innovative Solutions Tailored to Your Needs: What Makes Us Unique
        </p>

        <div className="row">
          <div className="col-md-6 d-flex align-items-stretch order-smd-1">
            <div className="w-100 mt-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    valueRefs.current[index] = el;
                  }}
                  style={{ marginBottom: "1.5rem" }}
                >
                  <h6>{value.title}</h6>
                  <p className="para-text">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-stretch">
            <img
              ref={imageRef}
              alt="Drupal development services"
              src="https://www.techinventive.com/img/b6f2116b1c88f9be2de2af548ac092d6.jpg"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
