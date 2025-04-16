import React, { useEffect, useState, useRef } from "react";
import { FaLinkedin, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "animate.css";

const Footer: React.FC = () => {
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
    <footer  ref={sectionRef}
      className={` footer ${
        isVisible
          ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
          : "opacity-0"
      }`} 
    >
      <div className="container container-custom">
        <div className="row">
          <div className="col-md-3 ps-md-0">
            <div className="box-1">
              <a href="/">
                <img alt="Drupal development services" src="https://www.techinventive.com/img/techinventive-big-logo.png" />
              </a>
              <p>
                Techinventive Software is a premier software and web development company offering a comprehensive suite of services including AI, ML, Blockchain, Game development, Python, Node.js, Golang, Ruby on Rails, and Drupal. Based in Delhi NCR.
              </p>
            </div>
          </div>

          <div className="col-md-2">
            <div className="box-2">
              <ul>
                <h3>Company</h3>
                <li><a href="/about">About us</a></li>
                <li><a href="/contact">Contact us</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-2">
            <div className="box-2">
              <ul className="ps-0">
                <h3>Services</h3>
                <li><a href="/services/web-development">Web Development</a></li>
                <li><a href="/services/web-designing">Responsive Designing</a></li>
                <li><a href="/services/drupal-services">Drupal</a></li>
                <li><a href="/services/golang-services">Golang</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-2">
            <div className="box-2">
              <ul className="ps-0">
                <h3>Legal</h3>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-conditions">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 pe-md-0">
            <div className="box-2">
              <h3>Connect with us</h3>
              <p>
                <a href="https://maps.app.goo.gl/9rYk63wM64WShU7v5" target="_blank" rel="noreferrer">
                  <img alt="Drupal development services" src="https://www.techinventive.com/img/i.svg" /> E-219, Sec-63, Noida, Uttar Pradesh
                </a>
              </p>
              <p>
                <a href="tel:+918527123451">
                  <img alt="Drupal development services" src="https://www.techinventive.com/img/i(1).svg" /> +91 8527123451
                </a>
              </p>
              <p>
                <a href="mailto:marketing@techinventive.com">
                  <img alt="Drupal development services" src="https://www.techinventive.com/img/i(2).svg" /> marketing@techinventive.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 bt-43 ps-md-0 pe-md-0">
            <div
               className={` box-4 ${
                isVisible
                  ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                  : "opacity-0"
              }`}
            >
              <div className="box-5 d-flex gap-4">
                <a href="https://www.linkedin.com/company/techinventive/" target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://www.facebook.com/techinventive" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com/MTechinven40832" target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com/techinventivesoftware/" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
              </div>
              <p>© 2025 Copyright, All Rights Reserved by Techinventive Software and Service Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
