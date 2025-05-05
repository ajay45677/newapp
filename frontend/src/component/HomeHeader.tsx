import { useState, useEffect } from "react";
import {
  Container, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, Dropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import OffcanvasMenu from "./OffcanvasMenu";
import "animate.css";
import BASE_URL from '../Config';

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
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/jsonapi/node/hero_banner`,
          {
            headers: { "Accept": "application/vnd.api+json" },
            withCredentials: true,
          }
        );
        setData(response.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch banner data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDatas();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/jsonapi/node/hero_banner/f57dc241-e61c-4096-ac9c-f3f8d9885fed/field_imgs`,
          {
            headers: { "Accept": "application/vnd.api+json" },
            withCredentials: true,
          }
        );
        const file = res.data.data;
        const url = `${BASE_URL}${file.attributes.uri.url}`;
        setImage(url);
      } catch (error) {
        console.error("Error fetching logo image:", error);
      }
    };
    fetchImage();
  }, []);

  if (loading) return <p>Loading Banner Data...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No Data found.</p>;

  return (
    <div className="home-banner">
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
                      {services.map((service) => {
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

      {/* Banner Image */}
      {image && (
        <img src={image} alt="Trusted Company Logo" className="banner-home" />
      )}

      {/* Banner Content */}
      <Container className="container-custom">
        <div className="home-banner-content">
          <h3>{data[0]?.attributes?.field_banner_title}</h3>
          <p>{data[0]?.attributes?.field_banner_sub_title}</p>
          <div className="w-100 d-flex">
            <Button className="blue-btn d-table">
              {data[0]?.attributes?.field_button_text?.title}
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

        {/* Features */}
        <div className="home-banner-content-bottom ">
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
                    <img alt={title} src={`https://www.techinventive.com/img/${img}_blue.svg`} className="on-hover" />
                    <img alt={title} src={`https://www.techinventive.com/img/${img}.svg`} className="off-hover" />
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
                <img alt="Phone Icon" src="https://www.techinventive.com/img/ic_round-phone.svg" className="on-hover" />
                <img alt="Phone Icon" src="https://www.techinventive.com/img/ic_round-phone(2).svg" className="off-hover" />
              </a>
            </div>
            <div className="whatsapp-call">
              <a href="https://wa.me/+9198********1">
                <img alt="WhatsApp Icon" src="https://www.techinventive.com/img/ic_baseline-whatsapp.svg" className="on-hover" />
                <img alt="WhatsApp Icon" src="https://www.techinventive.com/img/ic_baseline-whatsapp(1).svg" className="off-hover" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeHeader;
