import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";

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

const OffcanvasMenu: React.FC = ({  }) => {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* Button to open Offcanvas */}
      <div className="d-flex off-fd">
        <Button  className="br-0" onClick={() => setOffcanvasOpen(!offcanvasOpen)}>
          <img
            alt="Top 10 Drupal Development Companies in Delhi"
            src="https://www.techinventive.com/img/Frame 3.png"
            className="mes-3"
          />
        </Button>
      </div> 
      {/* Offcanvas Menu */}
        <Offcanvas
          isOpen={offcanvasOpen}
          toggle={() => setOffcanvasOpen(!offcanvasOpen)}
          direction="end"
          
        >
          <OffcanvasHeader toggle={() => setOffcanvasOpen(!offcanvasOpen)}>
            <Link to="/">
              <img alt="Drupal development services" src="https://www.techinventive.com/img/techinventive-vector.png" />
            </Link>
          </OffcanvasHeader>
          <OffcanvasBody>
            <Nav vertical>
              <NavItem>
                <NavLink to="/" className="nav-link">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" className="nav-link">About Us</NavLink>
              </NavItem>
              <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)} >
                      <DropdownToggle nav caret>
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

            {/* Social Media Icons */}
            <div className="box-5 d-flex gap-4 mt-4">
              <a href="https://www.linkedin.com/company/techinventive/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://www.facebook.com/techinventive" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/MTechinven40832" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/techinventivesoftware/" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="tel:+4733378901" className="d-block d-md-none">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="whatsapp://send?text=Hello World!&phone=+9198********1" className="d-block d-md-none">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </OffcanvasBody>
        </Offcanvas>
    </>
  );
};

export default OffcanvasMenu;
