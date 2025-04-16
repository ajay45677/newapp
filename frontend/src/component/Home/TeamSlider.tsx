import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

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
    <div className="value-section bg-white h-auto ps-0 pe-0" ref={sectionRef}>
      <div className="w-100">
        <h2
           className={` ${
            isVisible
              ? "opacity-100 animate__animated animate__flipInX animate__slower"
              : "opacity-0"
          }`}
        >Our Team</h2>
        <p
          className={`heading-text ${
            isVisible
              ? "opacity-100 animate__animated animate__slideInRight animate__slower"
              : "opacity-0"
          }`}
        >Meet Our Experts</p>
        <div  
          className={` ${
              isVisible
                ? "opacity-100 animate__animated animate__zoomIn animate__slower"
                : "opacity-0"
          }`}
        >
          <Slider {...settings} className="slider1">
            {teamMembers.map((member, index) => (
              <div key={index} className="mb-0nly">
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
        <a href="about-us"
           className={`see-more-blue ${
            isVisible
              ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
              : "opacity-0"
          }`}
        >
          See all <img alt="See more" src="https://www.techinventive.com/img/lucide_move-right-blue.png" />
        </a>
      </div>
    </div>
  );
};

export default TeamSlider;
