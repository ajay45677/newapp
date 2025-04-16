import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "animate.css";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<ServicesData | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/services/custom")
      .then((response) => response.json())
      .then((data: ServicesData) => setData(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const services = data?.services || [];

  // Function to structure services into rows of 3
  const processRows = (services: ServiceType[]) => {
    let rows: ServiceType[][] = [];
    for (let i = 0; i < services.length; i += 3) {
      let group = services.slice(i, i + 3);

      // Ensure every row has exactly 3 items
      while (group.length < 3) {
        group.push({ id: -1, name: "", description: "", path: "#" }); // Placeholder
      }

      // For even rows (1st, 3rd, 5th), ensure image (col-md-6) is **first**
      if ((i / 3) % 2 === 0) {
        group = [group[0], group[1], group[2]];
      } 
      // For odd rows (2nd, 4th, 6th), ensure image (col-md-6) is **last**
      else {
        group = [group[1], group[0], group[2]];
      }

      rows.push(group);
    }
    return rows;
  };

  const serviceRows = processRows(services);
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
    <div className="value-section bg-white h-auto home-service" ref={sectionRef}>
      <Container className="container-custom">
        {/* Dynamically Fetched Title & Subtitle */}
        <h2
          className={` ${
            isVisible
              ? "opacity-100 animate__animated animate__flipInX animate__slower"
              : "opacity-0"
          }`}
        >{data?.title || "Loading..."}</h2>
        <p
          className={`heading-text ${
            isVisible
              ? "opacity-100 animate__animated animate__slideInRight animate__slower"
              : "opacity-0"
          }`}
        >{data?.subtitle || "Fetching data..."}</p>

        {services.length > 0 ? (
          serviceRows.map((row, rowIndex) => (
            <Row 
              key={rowIndex}
              className={` ${
                isVisible
                  ? "opacity-100 animate__animated animate__bounce animate__slower"
                  : "opacity-0"
              }`}
            >
              {row.map((service, index) => {
                // Check if it's an image-containing service
                const isImageService = Boolean(service.image);
                const serviceSlug = service.name.toLowerCase().replace(/\s+/g, "-");
                // Assign `col-md-6` to first service in odd rows, last in even rows
                const columnSize = index === (rowIndex % 2 === 0 ? 0 : 2) ? 6 : 3;
                
                return (
                  <Col 
                    key={service.id} 
                    md={columnSize} 
                    xs={6} 
                    className="d-flex align-items-stretch ps-0 pe-0"
                  >
                    {service.id !== -1 && ( // Skip placeholder items
                      <div className={`drupal-dev ${index === 1 ? "color-4" : index === 2 ? "color-2" : "color-5"}`}>
                        {isImageService && <img alt={service.name} src={service.image} />}
                        <div className={`drupal-text ${isImageService ? "for-drupal" : ""}`}>
                          <h3>{service.name}</h3>
                          <p>{service.description}</p>
                          <Link to={`/services/${serviceSlug}`}>
                            View more <img alt="Arrow icon" src="https://www.techinventive.com/img/lucide_move-right.png" />
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
