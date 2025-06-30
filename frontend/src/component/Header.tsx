import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import OffcanvasMenu from "./OffcanvasMenu";
import "animate.css";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const getBannerContent = () => {
    if (location.pathname.startsWith("/blog/")) return null;
    if (location.pathname.startsWith("/services/")) return null;

    if (location.pathname === "/blog") {
      return {
        bannerImage: "https://www.techinventive.com/img/blog_banner.svg",
        title: "Blogs",
        description: "Everything at one place",
      };
    }

    switch (location.pathname) {
      case "/about":
        return {
          bannerImage:
            "https://www.techinventive.com/img/648b32a7ff5faf8f13ebd8e501dd18f0.jpg",
          title: "About Us",
          description:
            "Innovative Software Solutions Tailored to Your Business Needs",
        };
      case "/portfolio":
        return {
          bannerImage: "https://www.techinventive.com/img/portfolio_banner.svg",
          title: "Our Portfolio",
          description: "Showcasing our expertise, creativity, and dedication.",
        };
      case "/contact":
        return {
          bannerImage:
            "https://www.techinventive.com/img/6d0a7d558015eca45f8df63736c7eba0.jpg",
          title: "Book an Expert Call",
          description: "Get in Touch with Techinventive Software.",
        };
      case "/services":
        return {
          bannerImage: "https://www.techinventive.com/img/Frame%2019(2).png",
          title: "Our Services",
          description: "Explore expert Drupal solutions.",
        };
      default:
        return {
          bannerImage: "https://www.techinventive.com/img/Frame%2019(2).png",
          title: "Techinventive",
          description: "Your Trusted Technology Partner",
        };
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bannerContent = getBannerContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = bannerContent?.title || '';

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div className="main-menu rest-header" ref={sectionRef}>
        <div className={`fixed-top bg-whites ${scrolled ? "darkHeader2" : ""}`}>
          <Container className="container-custom">
            <Navbar expand="md" light className="p-0">
              <NavbarBrand tag={Link} to="/">
                <img
                  alt="Techinventive Logo"
                  src="https://www.techinventive.com/img/techinventive-vector.png"
                />
              </NavbarBrand>
              <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>
                  <NavItem>
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/about" className="nav-link">
                      About Us
                    </NavLink>
                  </NavItem>
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={() => {}}
                    nav
                    inNavbar
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <DropdownToggle
                      nav
                      caret
                      tag={Link}
                      to="/services"
                      className="nav-link"
                    >
                      Services
                    </DropdownToggle>
                    <DropdownMenu className="submenu">
                      {services.map((service) => {
                        const serviceSlug = service.title
                          .toLowerCase()
                          .replace(/\s+/g, "-");
                        return (
                          <DropdownItem
                            key={service.id}
                            tag={Link}
                            to={`/services/${serviceSlug}`}
                          >
                            {service.title}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                  <NavItem>
                    <NavLink to="/portfolio" className="nav-link">
                      Portfolio
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/blog" className="nav-link">
                      Blog
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/contact" className="nav-link">
                      Contact
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <OffcanvasMenu />
            </Navbar>
          </Container>
        </div>
      </div>

      {/* ✅ Banner Section */}
      {bannerContent && (
        <div className="banner" ref={contentRef}>
          <img
            alt={bannerContent.title}
            src={bannerContent.bannerImage}
            className="banner-home"
          />
          <Container className="container-custom">
            <div className="banner-content">
              <h2>{bannerContent.title}</h2>
              <p ref={pRef}>{bannerContent.description}</p>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Header;
