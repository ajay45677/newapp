import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceType {
  id: number;
  name: string;
  description: string;
  image?: string;
  path: string;
}

interface ServicesData {
  title: string;
  subtitle: string;
  services: ServiceType[];
}

const MainServices: React.FC = () => {
  const [data, setData] = useState<ServicesData | null>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/da32e9e8-0431-430e-b69c-ec79003bbf2d")
      .then((response) => response.json())
      .then((data: ServicesData) => setData(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const services = data?.services || [];

  const processRows = (services: ServiceType[]) => {
    let rows: ServiceType[][] = [];
    for (let i = 0; i < services.length; i += 3) {
      let group = services.slice(i, i + 3);
      while (group.length < 3) {
        group.push({ id: -1, name: "", description: "", path: "#" });
      }
      if ((i / 3) % 2 === 0) {
        group = [group[0], group[1], group[2]];
      } else {
        group = [group[1], group[0], group[2]];
      }
      rows.push(group);
    }
    return rows;
  };

  const serviceRows = processRows(services);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation (typewriter)
      if (titleRef.current) {
        const text = titleRef.current.textContent || "";
        titleRef.current.innerHTML = "";
        text.split("").forEach((char, i) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.opacity = "0";
          titleRef.current?.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            delay: i * 0.05,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          });
        });
      }

      // Subtitle fade-in
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
            },
          }
        );
      }

      // Service boxes animation
      boxesRef.current.forEach((box, i) => {
        if (box) {
          gsap.fromTo(
            box,
            { autoAlpha: 0, y: 50 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: box,
                start: "top 95%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  return (
    <div
      className="value-section bg-white h-auto home-service"
      ref={sectionRef}
    >
      <Container className="container-custom">
        <h2 ref={titleRef} className="text-3xl font-bold mb-2">
          {data?.title || "Loading..."}
        </h2>

        <p ref={subtitleRef} className="heading-text text-lg mb-5">
          {data?.subtitle || "Fetching data..."}
        </p>

        {services.length > 0 ? (
          serviceRows.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((service, index) => {
                const isImageService = Boolean(service.image);
                const columnSize = index === (rowIndex % 2 === 0 ? 0 : 2) ? 6 : 3;

                return (
                  <Col
                    key={`${rowIndex}-${index}`}
                    md={columnSize}
                    xs={6}
                    className="d-flex align-items-stretch ps-0 pe-0"
                  >
                    {service.id !== -1 && (
                      <div
                        ref={(el) => {
                          boxesRef.current[rowIndex * 3 + index] = el;
                        }}
                        className={`drupal-dev ${index === 1 ? "color-4" : index === 2 ? "color-2" : "color-5"}`}
                      >
                        {isImageService && (
                          <img alt={service.name} src={service.image} />
                        )}
                        <div
                          className={`drupal-text ${
                            isImageService ? "for-drupal" : ""
                          }`}
                        >
                          <h3>{service.name}</h3>
                          <p>{service.description}</p>
                          <Link to={service.path}>
                            View more{" "}
                            <img
                              alt="Arrow icon"
                              src="https://www.techinventive.com/img/lucide_move-right.png"
                            />
                          </Link>
                        </div>
                      </div>
                    )}
                  </Col>
                );
              })}
            </Row>
          ))
        ) : (
          <p>Loading services...</p>
        )}
      </Container>
    </div>
  );
};

export default MainServices;
