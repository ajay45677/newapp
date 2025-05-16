import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
} from "reactstrap";
import "animate.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExpertCallForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [typedTitle, setTypedTitle] = useState("");

  const fullTitle = "Book an Expert Call";
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    let current = 0;
    const delay = 2000;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedTitle(() => fullTitle.slice(0, current + 1));
        current++;
        if (current === fullTitle.length) {
          clearInterval(interval);
        }
      }, 500); // Adjust typing speed here
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // Trigger animations after title is typed
  useEffect(() => {
    if (typedTitle !== fullTitle) return;

    const ctx = gsap.context(() => {
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    ScrollTrigger.refresh(); // Ensure layout is up to date

    return () => ctx.revert();
  }, [typedTitle]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage("Your message has been sent successfully!");
  };

  return (
    <div className="ceo-contact h-auto" ref={sectionRef}>
      <Container className="container-custom">
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <div className="box-34">
              <h4>{typedTitle}</h4>
              <p ref={subtitleRef}>
                Get personalized advice from our experts to unlock your
                business's full potential. Schedule a call today to discuss
                your project requirements, explore innovative solutions, and
                take the next step towards success.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div ref={formRef}>
              <Form onSubmit={handleSubmit} id="emailForm">
                {formMessage && <Alert color="success">{formMessage}</Alert>}
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="message"
                        rows={3}
                        placeholder="Message (optional)"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Submit Message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExpertCallForm;
