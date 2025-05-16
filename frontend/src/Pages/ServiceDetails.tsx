import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import ExpertCallForm from "../component/ExpertCallForm";
import PopupForm from "../component/PopupForm";
import "animate.css";

interface HighlightItem {
  label: string;
  text: string;
  image: string;
}

interface TechStackItem {
  label: string;
  image: string;
}

interface ProjectsItem {
  id: number;
  title: string;
  category: string[];
  businessChallenge: string;
  solution: string;
  link: string;
  websiteImages: string[];
}

interface RelatedServicesItem {
  id: number;
  title: string;
  description: string;
  link: string;
  image?: string;
}

interface WebserviceType {
  id: number;
  title: string;
  intro: {
    title: string;
    description: string;
    image: string;
  };
  counters: { label: string; start: number; end: number; duration: number }[];
  highlights: {
    title: string;
    subtitle: string;
    items: HighlightItem[];
  };
  techStack: {
    title: string;
    items: TechStackItem[];
  };
  projects: {
    title: string;
    items: ProjectsItem[];
  };
  contact: {
    title: string;
    link: string;
  };
  relatedServices: {
    title: string;
    items: RelatedServicesItem[];
  };
}

const processRows = (services: RelatedServicesItem[]) => {
  let rows: RelatedServicesItem[][] = [];
  for (let i = 0; i < services.length; i += 3) {
    let group = services.slice(i, i + 3);
    while (group.length < 3) {
      group.push({ id: -1, title: "", description: "", link: "#" });
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


const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")         // Replace spaces with -
    .replace(/[^\w-]+/g, "");
  
    

const ServiceDetails: React.FC = () => {
  const { title } = useParams();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [service, setService] = useState<WebserviceType | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch("https://raw.githubusercontent.com/ajay45677/webapi/main/web-services.json");
        const data = await res.json();
        if (Array.isArray(data.services)) {
          const matched = data.services.find(
            (item: WebserviceType) => slugify(item.title) === slugify(title || "")
          );
          setService(matched || null);
        } else {
          setService(null);
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
        setService(null);
      }
    };
    fetchService();
  }, [title]);

  useEffect(() => {
    if (service) {
      setIsVisible(new Array(6).fill(false));
    }
  }, [service]);

  useEffect(() => {
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
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isVisible]);

  return (
    <div>
      <div className="fixed-icon">
        {["linkedin", "facebook-f", "twitter", "instagram"].map((icon, index) => (
          <div
            key={index}
            className={`imgborder ${hoveredIndex === index ? "show-text" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a href="#" rel="noreferrer" target="_blank">
              <i className={`fa-brands fa-${icon}`}></i>
              <span className={`social-text ${hoveredIndex === index ? "visible" : ""}`}>{icon}</span>
            </a>
          </div>
        ))}
      </div>
      {!service ? ( <p>Loading...</p>  ) : (
      <>
      <div className="breadcrumb-sec py-3 bg-gray-100">
        <div className="container container-custom">
          <nav aria-label="breadcrumb" 
            ref={(el) => {
              sectionRefs.current[0] = el as HTMLDivElement;
            }}
            className={` ${
              isVisible [0]
                ? "opacity-100 animate__animated animate__slideInUp animate__fast"
                : "opacity-0"
            }`}
          >
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/services">Services</a></li>
              <li className="breadcrumb-item active">{service.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="service-detail-head py-10"
          ref={(el) => {
            sectionRefs.current[1] = el as HTMLDivElement;
          }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-center">
              <h2 
                 className={` ${
                  isVisible[1]
                    ? "opacity-100 animate__animated animate__flipInX animate__slower"
                    : "opacity-0"
                }`}
              >{service.intro.title}</h2>
              <p 
                  className={`para-text ${
                    isVisible[1]
                      ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                      : "opacity-0"
                  }`}
              >{service.intro.description}</p>
              <button 
                  className={`blue-btn d-table mt-3 ${
                    isVisible[1]
                      ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                      : "opacity-0"
                  }`}
                 data-bs-toggle="modal" data-bs-target="#topGetTouch">Get In Touch</button>
            </div>
            <div className="col-md-6 mt-5 mt-md-0">
              {service?.intro?.image && <img src={service.intro.image} alt={service.intro.title} 
                  className={`img-fluid ${
                    isVisible[1]
                      ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                      : "opacity-0"
                  }`} 
              />}
            </div>
          </div>
        </div>
      </section>

      <section className="service-working-hour py-10 bg-gray-50">
        <div className="container">
          <div 
              ref={(el) => {
                sectionRefs.current[2] = el as HTMLDivElement;
              }}
               className={`row ${
                isVisible[2]
                  ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                  : "opacity-0"
              }`}
          >
            {service?.counters?.map((counter, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="box-ach-2 text-center">
                  <h5 className="count percent text-3xl font-bold text-blue-700">
                    <CountUp start={counter.start} end={counter.end} duration={counter.duration / 50} />+
                  </h5>
                  <p>{counter.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="value-section h-auto service-details-blocks">
        <div 
             ref={(el) => {
              sectionRefs.current[3] = el as HTMLDivElement;
            }}
           className="container container-custom"
        >
          <h2
             className={` ${
              isVisible[3]
                ? "opacity-100 animate__animated animate__flipInX animate__slower"
                : "opacity-0"
            }`}
          >{service?.highlights?.title}</h2>
          <p  
               className={`heading-text ${
                isVisible[3]
                  ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                  : "opacity-0"
              }`}
          >{service?.highlights?.subtitle}</p>
          {service?.highlights?.items?.map((item, idx) => (
            <div key={idx} className="row mb-40">
              <div className={`col-md-6 ml-35 ${idx % 2 === 1 ? "order-md-2" : ""}`}>
                <img src={item.image} alt={item.label} 
                      className={`img-fluid ${
                        isVisible[3]
                          ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                          : "opacity-0"
                      }`} 
                 />
              </div>
              <div className={`col-md-6 align-center ${idx % 2 === 1 ? "order-md-1" : ""}`}>
                <h6 
                   className={` ${
                    isVisible[3]
                      ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                      : "opacity-0"
                  }`} 
                >{item.label}</h6>
                <p 
                   className={`para-text ${
                    isVisible[3]
                      ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                      : "opacity-0"
                  }`} 
                >{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section 
          ref={(el) => {
            sectionRefs.current[4] = el as HTMLDivElement;
          }}
         className="languages"
      >
        <div className="container container-custom">
          <h2 
            className={`h2 ${
              isVisible[4]
                ? "opacity-100 animate__animated animate__flipInX animate__slower"
                : "opacity-0"
            }`}
          >{service?.techStack?.title}</h2>
          <div 
              className={`row ${
                isVisible[4]
                  ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                  : "opacity-0"
              }`}
          >
            {service?.techStack?.items?.map((item, idx) => (
              <div key={idx} className="col-lg-3 col-xl-2 col-6 padd_8">
                <div className="bg-white d-flex">
                  <img src={item.image} alt={item.label} className="mb-2" />
                  <h3>{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
         className="development-bg-color"
         ref={(el) => {
          sectionRefs.current[5] = el as HTMLDivElement;
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2
                className={`h2 ${
                  isVisible[5]
                    ? "opacity-100 animate__animated animate__flipInLeft animate__slower"
                    : "opacity-0"
                }`}
              >{service?.contact?.title}</h2>
              <button 
                   className={`transparent-btn ${
                    isVisible[5]
                      ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                      : "opacity-0"
                  }`}
                 data-bs-toggle="modal" data-bs-target="#topGetTouch">{service?.contact?.link}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section 
         ref={(el) => {
          sectionRefs.current[6] = el as HTMLDivElement;
        }}
        className="projects"
      >
        <div className="container">
          <h2 
              className={`h2 ${
                isVisible[6]
                  ? "opacity-100 animate__animated animate__flipInX animate__slower"
                  : "opacity-0"
              }`}
          >
            {service?.projects?.title}</h2>
          {service?.projects?.items?.map((item, idx) => (
            <div key={item.id} className={idx === 1 ? "portfolio-5" : "portfolio-2"}>
              <div className="container container-custom">
                <div key={idx} 
                    className={`row ${
                      isVisible[6]
                        ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                        : "opacity-0"
                    }`}
                >
                  <div className={`col-md-7 ${idx % 2 === 1 ? "order-md-2" : ""}`}>
                    <h2>{item.title}</h2>
                    <ul>
                      {item.category.map((cat, idx) => (
                        <li key={idx}>{cat}</li>
                      ))}
                    </ul>
                    <p><span>Business challenge:</span> {item.businessChallenge}</p>
                    <p><span>Solution:</span> {item.solution}</p>
                    <p>
                      <span>Find it here: </span>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">{item.link}</a>
                    </p>
                  </div>
                  <div className={`col-md-5 d-flex justify-content-start ${idx % 2 === 1 ? "order-md-1" : ""}`}>
                    {item.websiteImages[0] && <img src={item.websiteImages[0]} alt={item.title} className="img-fluid ms-auto" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section 
         ref={(el) => {
          sectionRefs.current[7] = el as HTMLDivElement;
        }}
        className="services-bg-color py-10"
      >
        <div className="container">
          <h2 
              className={`h2 ${
                isVisible[7]
                  ? "opacity-100 animate__animated animate__flipInX animate__slower"
                  : "opacity-0"
              }`}
          >{service?.relatedServices?.title}</h2>
          {processRows(service?.relatedServices?.items || []).map((row, rowIndex) => (
            <Row 
              className={` ${
                isVisible[7]
                  ? "opacity-100 animate__animated animate__slideInUp animate__slower"
                  : "opacity-0"
              }`}
              key={rowIndex}
            >
              {row.map((item, colIdx) => {
                if (item.id === -1) return null;
                const colSize = colIdx === (rowIndex % 2 === 0 ? 0 : 2) ? 6 : 3;
                const serviceSlug = item.title.toLowerCase().replace(/\s+/g, "-");
                const bgClass = colIdx === 1 ? "color-4" : colIdx === 2 ? "color-2" : "color-5";
                return (
                  <Col key={item.id} md={colSize} xs={12} className="d-flex align-items-stretch mb-4">
                    <div className={`drupal-dev ${bgClass} w-100`}>
                      {item.image && <img src={item.image} alt={item.title} className="img-fluid mb-3 rounded" style={{ height: "200px", objectFit: "cover", width: "100%" }} />}
                      <div className="drupal-text for-drupal">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <Link to={`/services/${serviceSlug}`} className="text-blue-600 mt-2 inline-block">
                          View Service <img alt="Arrow icon" src="https://www.techinventive.com/img/lucide_move-right.png" />
                        </Link>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          ))}
        </div>
      </section>
    </>
  )}
      <ExpertCallForm />
      <PopupForm />
    </div>
  );
};

export default ServiceDetails;
