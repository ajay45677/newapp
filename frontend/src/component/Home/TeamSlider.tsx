import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { name: "Diksha", role: "HR Manager", img: "https://www.techinventive.com/team/HR.jpg" },
  { name: "Surender", role: "Account Manager / Sr. Developer", img: "https://www.techinventive.com/team/surender.png" },
  { name: "Saurabh", role: "Team Leader", img: "https://www.techinventive.com/team/saurabh-panchal.jpg" },
  { name: "Nitin", role: "Sr. Developer", img: "https://www.techinventive.com/team/nitin.jpeg" },
  { name: "Yogendra", role: "UI/UX Designer", img: "https://www.techinventive.com/team/yogendra-patel.png" },
];

const TeamSlider: React.FC = () => {
  const settings = {
    dots: false,
      arrows: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      vertical: false,
      centerPadding: '200px',
      responsive: [{
          breakpoint: 1200,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
          },
      }, {
          breakpoint: 1008,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
          },
      }, {
          breakpoint: 600,
          settings: {
              rows: 2,
              centerMode: false,
              slidesToShow: 2,
              slidesToScroll: 2,
              centerPadding: '0px',
          },
      }, ],
  };
  
  const [typedTitle, setTypedTitle] = useState('');
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const fullTitle = 'Our Team';

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
  
  // Animate slider wrapper immediately after render (no scroll trigger)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-slide",
        { autoAlpha: 0, y: 30,stagger: 6 },
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
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <div className="value-section bg-white h-auto ps-0 pe-0" ref={sectionRef}>
      <div className="w-100">
        <h2>{typedTitle}</h2>
        <p className="heading-text" ref={subtitleRef}>Meet Our Experts</p>
        <div ref={wrapperRef}>
          <Slider {...settings} className="slider1">
            {teamMembers.map((member, index) => (
              <div key={index} className="mb-0nly team-slide">
                <div className="team-box">
                  <img alt={member.name} src={member.img} />
                  <div className="team-more">
                    <h5>{member.name}</h5>
                    <p>{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div> 
        <div ref={buttonRef}>
          <a href="about-us"  className="see-more-blue">
            See all <img alt="See more" src="https://www.techinventive.com/img/lucide_move-right-blue.png" />
          </a>
        </div> 
        
      </div>
    </div>
  );
};

export default TeamSlider;
