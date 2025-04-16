import React, {useState, useEffect, useRef } from "react";
import ExpertCallForm from "../component/ExpertCallForm";
import Privacy from "../component/Privacy/Privacy";
import "animate.css";

const PrivacyPolicy: React.FC = () => {

   const sectionRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <div>
      {/* Social Media Icons */}
      <div className="fixed-icon">
        {[
          { link: "https://www.linkedin.com/company/techinventive/", icon: "fa-linkedin", text: "Linkedin" },
          { link: "https://www.facebook.com/techinventive", icon: "fa-facebook-f", text: "Facebook" },
          { link: "https://twitter.com/MTechinven40832", icon: "fa-twitter", text: "Twitter" },
          { link: "https://www.instagram.com/techinventivesoftware/", icon: "fa-instagram", text: "Instagram" },
        ]
        
        .map((item, index) => (
          <div
            key={index}
            className={`imgborder ${hoveredIndex === index ? "show-text" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a href={item.link} rel="noreferrer" target="_blank">
              <i className={`fa-brands ${item.icon}`}></i>
              <span className={`social-text ${hoveredIndex === index ? "visible" : ""}`}>
                {item.text}
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Blog Section */}
      <div className="breadcrumb-sec mt-0" ref={sectionRef}>
        <div className="container">
          <nav aria-label="breadcrumb"
             className={` ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInLeft animate__fast"
                : "opacity-0"
            }`}
          >
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Privacy Policy</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Main Privact Content */}
      <Privacy />

      {/* Expert Call Form */}
      <ExpertCallForm />
    </div>
  );
};

export default PrivacyPolicy;
