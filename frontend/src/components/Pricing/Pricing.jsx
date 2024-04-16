import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Button, Row, Col } from 'react-bootstrap';
import './Pricing.css';
import sliver from '../../assets/sliver.png';

export default function Pricing() {
  let packages = [
    { name: "Monthly", price: 450, duration: 1, img: sliver },
    { name: "Quater Yearly", price: 1200, duration: 3, img: sliver },
    { name: "Half yearly", price: 2250, duration: 6, img: sliver },
    { name: "Yearly", price: 4200, duration: 12, img: sliver }
  ];

  return (
    <Container fluid className="pricing-container bg-dark text-light">
      <Row>
        <Col className="d-flex align-items-center justify-content-center align-items-lg-center">
          <h2>Packages</h2>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex align-items-center justify-content-center align-items-center">
          <h4>
            Save More as You Sweat More!
          </h4>
        </Col>
      </Row>

      <Row>
        {packages.map((item, index) => (
          <Col lg={3} key={index} className="d-flex justify-content-center align-items-center">
            <Card className="custom-card" bg='dark' text="light">
              <Card.Img className="img-fluid" variant="top" src={item.img} />
              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: ₹{item.price}</Card.Text>
                <Card.Text>Duration: {item.duration} months</Card.Text>
                <Card.Subtitle>Monthly: ₹{item.price / item.duration} Only</Card.Subtitle>
                <Button variant="primary">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
