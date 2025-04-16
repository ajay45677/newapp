import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

const PortfolioSlider: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    vertical: false,
    centerPadding: "200px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {}, // "unslick" should be an empty object
      },
    ],
  };

  const projects = [
    {
      img: "https://www.techinventive.com/img/SKAI.png",
      title: "SKAI",
      description: "Web development",
    },
    {
      img: "https://www.techinventive.com/img/DSCI.png",
      title: "DSCI",
      description: "Web application",
    },
    {
      img: "https://www.techinventive.com/img/M_exclusife.png",
      title: "M Exclusife",
      description: "Web / Mobile",
    },
    {
      img: "https://www.techinventive.com/img/NewsUSA.svg",
      title: "NewsUSA",
      description: "Web development",
    },
  ];
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
    
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
    <div className="ceo-section-3 h-auto ps-0 pe-0" ref={sectionRef}>
      <div className="container container-custom">
        <h2
          className={` ${
            isVisible
              ? "opacity-100 animate__animated animate__flipInX animate__slower"
              : "opacity-0"
          }`}
        >Portfolio</h2>
        <p 
           className={`heading-text ${
            isVisible
              ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
              : "opacity-0"
          }`}>Discover Our Projects</p>
      </div>
      <div  className={` ${
            isVisible
              ? "opacity-100 animate__animated animate__zoomIn animate__slower"
              : "opacity-0"
        }`}>
        <Slider {...settings} className="slider4 row">
          {projects.map((project, index) => (
            <div key={index} className="col-6">
              <div className="prtfolio-box">
                <img alt={project.title} src={project.img} />
                <div className="prtfolio-more">
                  <h5>{project.title}</h5>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>   
        <a href="/portfolio" 
            className={`see-more-blue ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                : "opacity-0"
            }`}>
          See all{" "}
          <img
            alt="Drupal development services"
            src="https://www.techinventive.com/img/lucide_move-right-blue.png"
          />
        </a>
        <div className="container container-custom">
          <div 
             className={`portfolio-text ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                : "opacity-0"
            }`}>
            Welcome to Techinventive Software's portfolio, where we proudly
            showcase our expertise in Drupal development services, web designing,
            web development, and app development. Our portfolio features a diverse
            range of projects that highlight our innovative solutions and
            commitment to excellence. Explore our work and see how we've helped
            businesses like yours succeed in the digital world.
          </div>
        </div>
       
    </div>
  );
};

export default PortfolioSlider;
