import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

const PortfolioSlider: React.FC = () => {
  const [typedTitle, setTypedTitle] = useState('');
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const fullTitle = 'Portfolio';

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
          centerMode: true,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 800,
        settings: {}, // unslick
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

  // Typing effect
  useEffect(() => {
    let current = 0;
    const delay = 2000; // Delay before typing starts
  
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedTitle(fullTitle.slice(0, current + 1));
        current++;
        if (current === fullTitle.length) {
          clearInterval(interval);
        }
      }, 100); // Adjust speed as needed
    }, delay);
  
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // Animate slider wrapper
  useEffect(() => {
    const logoSlides = document.querySelectorAll(".port-slide");
    if (!logoSlides.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".port-slide",
        { autoAlpha: 0, y: 30 , stagger: 6},
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Animate subtitle & paragraph
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
            },
          }
        );
      }
      
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 4.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="ceo-section-3 h-auto ps-0 pe-0" ref={sectionRef}>
      <div className="container container-custom">
        <h2>{typedTitle}</h2>
        <p className="heading-text" ref={subtitleRef}>
          Discover Our Projects
        </p>
      </div>
      <div ref={wrapperRef}>
        <Slider {...settings} className="slider4 row">
          {projects.map((project, index) => (
            <div key={index} className="col-6 port-slide">
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
      <div ref={buttonRef}>
        <a href="/portfolio" className="see-more-blue">
          See all
          <img
            alt="Drupal development services"
            src="https://www.techinventive.com/img/lucide_move-right-blue.png"
          />
        </a>
      </div>
      <div className="container container-custom">
        <div className="portfolio-text" ref={paragraphRef}>
          Welcome to Techinventive Software's portfolio, where we proudly showcase
          our expertise in Drupal development services, web designing, web
          development, and app development. Our portfolio features a diverse
          range of projects that highlight our innovative solutions and
          commitment to excellence. Explore our work and see how we've helped
          businesses like yours succeed in the digital world.
        </div>
      </div>
    </div>
  );
};

export default PortfolioSlider;
