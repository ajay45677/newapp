import { useState, useEffect, useRef } from "react";
import {
  Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Dropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import OffcanvasMenu from "./OffcanvasMenu";
import "animate.css";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BanneImage from "../img/consulting-firm-project-management.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: "Website Development" },
  { id: 2, title: "Website Designing" },
  { id: 3, title: "Drupal" },
  { id: 4, title: "Artificial Intelligence" },
  { id: 5, title: "Machine Learning" },
  { id: 6, title: "Ruby on Rails" },
  { id: 7, title: "Python" },
  { id: 8, title: "Blockchain" },
  { id: 9, title: "Game Development" },
  { id: 10, title: "Node.js" },
  { id: 11, title: "Golang" },
  { id: 12, title: "PSD to HTML" },
];

const HomeHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [typedTitle, setTypedTitle] = useState('');
  const featureImgRefs = useRef<HTMLImageElement[]>([]);
  const featureTitleRefs = useRef<HTMLHeadingElement[]>([]);
  const featureTextRefs = useRef<HTMLParagraphElement[]>([]);
  const fullTitle = 'Innovation for success';

  // Typing effect
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, current + 1));
      current++;
      if (current === fullTitle.length) clearInterval(interval);
    }, 260);
    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content parallax
      gsap.to(contentRef.current, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Fade in paragraph
      gsap.fromTo(
        pRef.current,
        { autoAlpha: 0, x: -50 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 5.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Fade in button
      gsap.fromTo(
        buttonRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 5.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Feature animations
      featureTitleRefs.current.forEach((el, i) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 30 }, {
          autoAlpha: 1,
          y: 0,
          delay: i * 0.2,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          }
        });
      });

      featureTextRefs.current.forEach((el, i) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 30 }, {
          autoAlpha: 1,
          y: 0,
          delay: i * 0.2 + 0.2,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-based header color
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-banner" ref={sectionRef}>
      <div className="main-menu">
        <div className={`fixed-top bg-whites ${scrolled ? "darkHeader" : ""}`}>
          <Container className="container-custom">
            <Navbar expand="md" light className="p-0">
              <NavbarBrand tag={Link} to="/">
                <img
                  alt="Techinventive Logo"
                  src="https://www.techinventive.com/img/techinventive-small-logo.png"
                />
              </NavbarBrand>
              <NavbarToggler onClick={() => setIsOpen(!isOpen)} className="mb-only2" />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>
                  <NavItem><NavLink to="/" className="nav-link">Home</NavLink></NavItem>
                  <NavItem><NavLink to="/about" className="nav-link">About Us</NavLink></NavItem>
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={() => {}}
                    nav inNavbar
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <DropdownToggle nav caret tag={Link} to="/services">Services</DropdownToggle>
                    <DropdownMenu className="submenu">
                      {services.map(service => {
                        const slug = service.title.toLowerCase().replace(/\s+/g, "-");
                        return (
                          <DropdownItem key={service.id} tag={Link} to={`/services/${slug}`}>
                            {service.title}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  <NavItem><NavLink to="/portfolio" className="nav-link">Portfolio</NavLink></NavItem>
                  <NavItem><NavLink to="/blog" className="nav-link">Blog</NavLink></NavItem>
                  <NavItem><NavLink to="/contact-us" className="nav-link">Contact</NavLink></NavItem>
                </Nav>
              </Collapse>
              <OffcanvasMenu />
            </Navbar>
          </Container>
        </div>
      </div>

      

      {/* Banner Content */}
      <Container className="" >
        <div className="row">
            <div className="col-md-6">
               <div className="home-banner-content" ref={contentRef}>
                  <h3>{typedTitle}</h3>
                  <p ref={pRef}>
                    Techinventive Software is a top-tier app development company. Their team is highly skilled and delivered a flawless app that exceeded our expectations
                  </p>
                  <div className="w-100 d-flex" ref={buttonRef}>
                    <Button className="blue-btn d-table" >Let's Talk</Button>
                    <Link to="/Tech_I_Portfolio_2024.pdf" target="_blank" rel="noopener noreferrer">
                      <div className="bg-fd">
                        <img
                          className="pdf-download"
                          alt="Drupal Development Services"
                          src="https://www.techinventive.com/img/pdf_10435045.png"
                        />
                      </div>
                      Download
                    </Link>
                  </div>
                </div>
            </div>
            <div className="col-md-6">
                 {/* Banner Image */}
                <img src={BanneImage} alt="Banner" className="banner-home" />
            </div>
        </div>
        

        {/* Features */}
        {/*<div className="home-banner-content-bottom">
          <div className="col-md-10">
            <div className="row">
              {[
                { title: "Visualization", img: "visualization" },
                { title: "Modelling & Simulation", img: "modelling" },
                { title: "Consultancy", img: "consultancy" },
                { title: "Drupal development", img: "drupal" },
              ].map(({ title, img }, i) => (
                <div key={title} className="col-md-3 col-sm-6 d-flex align-items-stretch ps-0 pe-0">
                  <div className="box-44">
                    <img
                      alt={title}
                      src={`https://www.techinventive.com/img/${img}_blue.svg`}
                      className="on-hover"
                      ref={el => {
                        if (el) featureImgRefs.current[i] = el;
                      }}
                    />
                    <img
                      alt={title}
                      src={`https://www.techinventive.com/img/${img}.svg`}
                      className="off-hover"
                    />
                    <h4 ref={el => {
                      if (el) featureTitleRefs.current[i] = el;
                    }}>{title}</h4>

                    <p ref={el => {
                      if (el) featureTextRefs.current[i] = el;
                    }}>Provides direction to practical solutions.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>*/}

        {/* Social Links */}
        <div className="home-social">
          <div className="t-name">Techinventive</div>
          <div className="p-fixed-43">
            <div className="phone-call">
              <a href="tel:+4733378901">
                <img alt="Phone" src="https://www.techinventive.com/img/ic_round-phone.svg" className="on-hover" />
                <img alt="Phone" src="https://www.techinventive.com/img/ic_round-phone(2).svg" className="off-hover" />
              </a>
            </div>
            <div className="whatsapp-call">
              <a href="https://wa.me/+9198********1">
                <img alt="WhatsApp" src="https://www.techinventive.com/img/ic_baseline-whatsapp.svg" className="on-hover" />
                <img alt="WhatsApp" src="https://www.techinventive.com/img/ic_baseline-whatsapp(1).svg" className="off-hover" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeHeader;
