import { useState, useEffect, useRef  } from "react";
import { 
  Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Dropdown, 
  DropdownToggle, DropdownMenu, DropdownItem, Button 
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import OffcanvasMenu from "./OffcanvasMenu";
import "animate.css";

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
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
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
    <div className="home-banner" ref={sectionRef}>
      <div className="main-menu">
        <div className={`fixed-top bg-whites ${scrolled ? "darkHeader" : ""}`}>
          <Container className="container-custom">
            <Navbar expand="md" light 
               className={`p-0 ${
                isVisible
                  ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                  : "opacity-0"
              }`}
            >
              <NavbarBrand tag={Link} to="/">
                  <img 
                    alt="Techinventive Logo" 
                    src="https://www.techinventive.com/img/techinventive-small-logo.png" 
                  />
              </NavbarBrand>
              <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>
                  <NavItem>
                    <NavLink to="/" className="nav-link">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/about" className="nav-link">About Us</NavLink>
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
                    <NavLink to="/portfolio" className="nav-link">Portfolio</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/blog" className="nav-link">Blog</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/contact-us" className="nav-link">Contact</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <OffcanvasMenu />
            </Navbar>
          </Container>
        </div>
      </div>

      {/* Banner Image */}
      <img 
        alt="Drupal Web Development Company Delhi NCR" 
        src="https://www.techinventive.com/img/Rectangle 1.png" 
        className="banner-home" 
      />

      {/* Banner Content */}
      <Container className="container-custom">
        <div className="home-banner-content">
          <h3 className={` ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                : "opacity-0"
            }`}
          >
            Innovation for success</h3>
          <p 
             className={` ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                : "opacity-0"
            }`}
          >
            Techinventive Software is a top-tier app development company...</p>
          <div 
               className={`w-100 d-flex ${
                isVisible
                  ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                  : "opacity-0"
              }`}>
            <Button className="blue-btn d-table">
              Get In Touch
            </Button>
            <Link to="/Tech_I_Portfolio_2024.pdf" target="_blank" rel="noopener noreferrer">
              <div className="bg-fd">
                <img 
                  className="pdf-download" 
                  alt="Drupal Development Services" 
                  src="https://www.techinventive.com/img/pdf_10435045.png" 
                />    
              </div>
              Pdf View  
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div 
            className={`home-banner-content-bottom ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                : "opacity-0"
            }`}>
          <div className="col-md-10">
            <div className="row">
              {[
                { title: "Visualization", img: "visualization" },
                { title: "Modelling & Simulation", img: "modelling" },
                { title: "Consultancy", img: "consultancy" },
                { title: "Drupal development", img: "drupal" },
              ].map(({ title, img }) => (
                <div key={title} className="col-md-3 col-sm-6 d-flex align-items-stretch ps-0 pe-0">
                  <div className="box-44">
                    <img 
                      alt={title} 
                      src={`https://www.techinventive.com/img/${img}_blue.svg`} 
                      className="on-hover" 
                    />
                    <img 
                      alt={title} 
                      src={`https://www.techinventive.com/img/${img}.svg`} 
                      className="off-hover" 
                    />
                    <h4>{title}</h4>
                    <p>Provides direction to practical solutions.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="home-social">
          <div className="t-name">Techinventive</div>
          <div className="p-fixed-43">
            <div className="phone-call">
              <a href="tel:+4733378901">
                <img 
                  alt="Phone Icon" 
                  src="https://www.techinventive.com/img/ic_round-phone.svg" 
                  className="on-hover" 
                /> 
                <img 
                  alt="Phone Icon" 
                  src="https://www.techinventive.com/img/ic_round-phone(2).svg" 
                  className="off-hover" 
                /> 
              </a>
            </div>
            <div className="whatsapp-call">
              <a href="https://wa.me/+9198********1">
                <img 
                  alt="WhatsApp Icon" 
                  src="https://www.techinventive.com/img/ic_baseline-whatsapp.svg" 
                  className="on-hover" 
                /> 
                <img 
                  alt="WhatsApp Icon" 
                  src="https://www.techinventive.com/img/ic_baseline-whatsapp(1).svg" 
                  className="off-hover" 
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeHeader;
