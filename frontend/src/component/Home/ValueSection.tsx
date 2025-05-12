import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LogoSlider from "./LogoSlider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    img: "https://www.techinventive.com/img/Frame 16.png",
    text: "Techinventive Software exceeded our expectations with their web development service. Their attention to detail and commitment to delivering a high-quality product were impressive.",
    name: "Satyapal",
    company: "NASSCOM",
  },
  {
    img: "https://www.techinventive.com/img/Frame 16.png",
    text: "Techinventive Software is a top-notch web designing company. Their team is incredibly talented and creative, and they delivered exactly what we were looking for.",
    name: "Anderson",
    company: "SONY",
  },
];

const testimonialSettings = {
  dots: false,
  infinite: false,
  autoplay: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 2, infinite: true } },
    { breakpoint: 1008, settings: { slidesToShow: 2, infinite: true } },
    { breakpoint: 800, settings: { slidesToShow: 1 } },
  ],
};

const ValueSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const featureTitleRefs = useRef<HTMLHeadingElement[]>([]);
  const featureTextRefs = useRef<HTMLParagraphElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  

  // Parallax & Fade Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (pRef.current) {
        gsap.fromTo(
          pRef.current,
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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

      featureTitleRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              delay: i * 0.2,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
              },
            }
          );
        }
      });

      featureTextRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              delay: i * 0.2 + 0.2,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  

  // Testimonial slider GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-slide",
        { autoAlpha: 0, y: 30 , stagger: 6,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 1.5,
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

  return (
    <div className="value-section bg-white h-auto p-6 min-h-[100px]" ref={sectionRef}>
      <div className="container" ref={contentRef}>
        <LogoSlider />

        {/* Testimonial Slider */}
        <div className="transition-opacity duration-700 mb-6" ref={wrapperRef}>
          <Slider {...testimonialSettings} className="mb-6 slider3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-slide">
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

        <div ref={buttonRef} className="text-center mt-4">
          <a
            href="/portfolio"
            className="see-more-blue padding-dd inline-flex items-center gap-2 text-blue-600 font-semibold"
          >
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
