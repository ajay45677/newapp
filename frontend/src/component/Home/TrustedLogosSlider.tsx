import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { id: 1, title: "Web development company in Noida India", img: "https://www.techinventive.com/img/nasscom.png" },
  { id: 2, title: "Drupal development services", img: "https://www.techinventive.com/img/01-primary-blue-docker-logo%201.png" },
  { id: 3, title: "web development service in Delhi", img: "https://www.techinventive.com/img/Asset%204%201.png" },
  { id: 4, title: "app development company in Delhi NCRa", img: "https://www.techinventive.com/img/Group%201.png" },
  { id: 5, title: "Top App Development Company in Noida India", img: "https://www.techinventive.com/img/IBM%201.png" },
  { id: 6, title: "mobile app development company Delhi", img: "https://www.techinventive.com/img/aws.png" }
];

const TrustedLogosSlider: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 1008, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, centerMode: false } }
    ]
  };

  useEffect(() => {
    const logoSlides = document.querySelectorAll(".logo-slide");
    if (!logoSlides.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.logo-slide',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <Slider {...sliderSettings} className="slider2">
        {logos.map((url) => (
          <div key={url.id} className="px-4 logo-slide">
            <img src={url.img} alt={url.title} className="w-40 h-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrustedLogosSlider;
