import React, { useEffect, useRef } from "react";
import { FaLinkedin, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "animate.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const subtitlesRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
    
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
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
            },
          }
        );
      }
      if (subtitlesRef.current) {
        gsap.fromTo(
          subtitlesRef.current,
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitlesRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 90%",
            },
          }
        );
      }

      if (linkRef.current) {
        gsap.fromTo(
          linkRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linkRef.current,
              start: "top 90%",
            },
          }
        );
      }
      
      if (newRef.current) {
        gsap.fromTo(
          newRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: newRef.current,
              start: "top 90%",
            },
          }
        );
      }

      if (lastRef.current) {
        gsap.fromTo(
          lastRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lastRef.current,
              start: "top 90%",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer  className="footer">
      <div className="container container-custom" ref={sectionRef}>
        <div className="row">
          <div className="col-md-3 ps-md-0">
            <div className="box-1" ref={subtitleRef}>
              <a href="/">
                <img alt="Drupal development services" src="https://www.techinventive.com/img/techinventive-big-logo.png" />
              </a>
              <p>
                Techinventive Software is a premier software and web development company offering a comprehensive suite of services including AI, ML, Blockchain, Game development, Python, Node.js, Golang, Ruby on Rails, and Drupal. Based in Delhi NCR.
              </p>
            </div>
          </div>

          <div className="col-md-2" ref={linkRef}>
            <div className="box-2">
              <ul>
                <h3>Company</h3>
                <li><a href="/about">About us</a></li>
                <li><a href="/contact">Contact us</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-2" ref={newRef}>
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

          <div className="col-md-2" ref={lastRef}>
            <div className="box-2">
              <ul className="ps-0">
                <h3>Legal</h3>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-conditions">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 pe-md-0" ref={subtitlesRef}>
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

        <div className="row" ref={formRef}>
          <div className="col-md-12 bt-43 ps-md-0 pe-md-0">
            <div className="box-4">
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
