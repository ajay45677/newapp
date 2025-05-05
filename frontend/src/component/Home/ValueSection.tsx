import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import LogoSlider from "./LogoSlider";


const testimonials = [
  {
    img: "https://www.techinventive.com/img/Frame 16.png",
    text: "Techinventive Software exceeded our expectations with their web development service. Their attention to detail and commitment to delivering a high-quality product were impressive.",
    name: "Satyapal",
    company: "NASSCOM"
  },
  {
    img: "https://www.techinventive.com/img/Frame 16.png",
    text: "Techinventive Software is a top-notch web designing company. Their team is incredibly talented and creative, and they delivered exactly what we were looking for.",
    name: "Anderson",
    company: "SONY"
  }
];



const testimonialSettings = {
  dots: false,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 1000,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerMode: false,
  arrows: true,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 2, infinite: true } },
    { breakpoint: 1008, settings: { slidesToShow: 2, infinite: true } },
    { breakpoint: 800, settings: { slidesToShow: 1 } }
  ]
};

const ValueSection: React.FC = () => {
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
    <div className="value-section bg-white h-auto p-6 min-h-[100px]" ref={sectionRef}>
      <div className="container">
         <LogoSlider />
        <div
          className={`transition-opacity duration-700 mb-6 ${
            isVisible
              ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
              : "opacity-0"
          }`}
        >
            <Slider {...testimonialSettings} className="mb-6 slider3">
              {testimonials.map((testimonial, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4">
                    <img src={testimonial.img} alt="testimonial" className="w-12 h-12" />
                    <div>
                      <p className="text-gray-700">{testimonial.text}</p>
                      <h5 className="font-bold mt-2">{testimonial.name}</h5>
                      <h6 className="text-sm text-gray-500">{testimonial.company}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

        </div>
        
        <div 
             className={`text-center ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                : "opacity-0"
            }`}>
          <a href="/portfolio" className="see-more-blue padding-dd inline-flex items-center gap-2 text-blue-600 font-semibold">
            View Our Portfolio 
            <img
              src="https://www.techinventive.com//img/lucide_move-right-blue.png"
              alt="Responsive Website Design Company in Delhi NCR"
              className="w-4 h-4"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ValueSection;
