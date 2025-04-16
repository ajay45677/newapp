import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "animate.css";

const Contact: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    subject: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5000/send", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", phone: "", subject: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Try again later.");
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Section is in view!");
          setIsVisible(true);  // Update state when the section is visible
          observer.disconnect(); // Stop observing after it's visible
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <div>
      <div className="fixed-icon">
        {[
          { link: "https://www.linkedin.com/company/techinventive/", icon: "fa-linkedin", text: "Linkedin" },
          { link: "https://www.facebook.com/techinventive", icon: "fa-facebook-f", text: "Facebook" },
          { link: "https://twitter.com/MTechinven40832", icon: "fa-twitter", text: "Twitter" },
          { link: "https://www.instagram.com/techinventivesoftware/", icon: "fa-instagram", text: "Instagram" },
        ].map((item, index) => (
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
      <div className="Contact-box" ref={sectionRef}>
        <div className="container container-custom">
          <div className="row">
            <div className="col-md-8 pe-0 d-flex align-items-stretch">
                <div
                  className={`contact-white ${
                    isVisible
                      ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                      : "opacity-0"
                  }`}
                >
                  <p>
                    Send a message <img alt="Drupal development services" src="https://www.techinventive.com/img/Vector33.png" />
                  </p>
                  <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="number"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Enter your subject"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <textarea
                          className="form-control"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Your message"
                          required
                        />
                        <button type="submit" className="" id="submitButton">
                          Submit Message
                        </button>
                      </div>
                    </div>
                  </form>
                  {status && <p className="text-center mt-3">{status}</p>}
                </div>
              
            </div>
            <div className="col-md-4 ps-0 d-flex align-items-stretch">
              <div 
                  className={` blue-contact ${
                    isVisible
                      ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                      : "opacity-0"
                  }`}
              >
                <div className="row m-md-0 ">
                  <div className="col-12 order-smd-12 p-0">
                    <div className="w-100 d-inline-block df0hj">
                      <p>Connect with us</p>
                      <p>
                        <img alt="Drupal development services" src="https://www.techinventive.com/img/i.png" /> E-219, Sec-63, Noida, Uttar Pradesh
                      </p>
                      <p>
                        <img alt="Drupal development services" src="https://www.techinventive.com/img/i(1).png" /> +91 8527123451
                      </p>
                      <p>
                        <img alt="Drupal development services" src="https://www.techinventive.com/img/i(2).png" /> marketing@techinventive.com
                      </p>
                    </div>
                  </div>
                  <div className="col-12 order-smd-11 p-0">
                    <div className="w-100 d-inline-block df0hj">
                      <img alt="Drupal development services" src="https://www.techinventive.com/img/Rectangle 14.png" className="map-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
