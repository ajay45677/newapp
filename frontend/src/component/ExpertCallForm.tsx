import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import "animate.css";

const ExpertCallForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [formMessage, setFormMessage] = useState("");

  // Define event type for handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Define event type for handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage("Your message has been sent successfully!");
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
    <div className="ceo-contact h-auto" ref={sectionRef}>
      <Container className="container-custom">
        <Row>
          <Col md={6} className="d-flex align-items-center" >
            <div 
                className={`box-34 ${
                  isVisible
                    ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                    : "opacity-0"
                }`}
              >
              <h4>Book an Expert Call</h4>
              <p>
                Get personalized advice from our experts to unlock your business's full potential. Schedule a call today
                to discuss your project requirements, explore innovative solutions, and take the next step towards
                success.
              </p>
            </div>
          </Col>
          <Col md={6}
               className={` ${
                isVisible
                  ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                  : "opacity-0"
              }`} 
          >
            <Form onSubmit={handleSubmit} id="emailForm">
              {formMessage && <Alert color="success">{formMessage}</Alert>}
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Input type="text" name="name" id="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Input type="tel" name="phone" id="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Input type="text" name="subject" id="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Input type="textarea" name="message" id="message" rows={3} placeholder="Message (optional)" value={formData.message} onChange={handleChange} />
                  </FormGroup>
                  <Button type="submit" color="primary" id="submitButton">Submit Message</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExpertCallForm;
