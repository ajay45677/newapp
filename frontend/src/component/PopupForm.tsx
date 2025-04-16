// App.tsx
import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Input, Button, Alert } from "reactstrap";

const PopupForm: React.FC = () => {

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

  return (


    <div className="modal fade" id="topGetTouch" tabIndex={-1} aria-labelledby="contactModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-0">
          <div className="modal-header">
            <h2 id="contactModalLabel">Contact Us</h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body ceo-contact">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
