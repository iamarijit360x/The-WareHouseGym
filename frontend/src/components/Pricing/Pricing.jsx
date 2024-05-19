import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';

const packages = [
  {
   
    id: "m001",
    name: "Monthly",
    price: 450,
    duration: 1,
    description: "A perfect choice for short-term commitment. Ideal for those who want to stay fit without a long-term contract.",

    bgClass: "bg-amber"
  },
  {
    id: "m002",
    name: "Quarter Yearly",
    price: 1200,
    duration: 3,
    description: "Get a great discount by committing for three months. Stay motivated and save more.",
    bgClass: "bg-green"
  },
  {
    id: "m003",
    name: "Half Yearly",
    price: 2250,
    duration: 6,
    description: "A popular option for fitness enthusiasts. Enjoy consistent progress and significant savings.",
    bgClass: "bg-cyan"
  },
  {
    id: "m004",
    name: "Yearly",
    price: 4200,
    duration: 12,
    description: "Best value for long-term fitness goals. Commit for a year and experience the ultimate in savings and results.",
    bgClass: "bg-danger"
  }
];

const PricingCard = ({ packageData }) => {
  const navigate = useNavigate();

  return (
    <Col  lg={3}>
      <div className="tile pt-inner">
        <div className={`pti-header ${packageData.bgClass}`}>
          <h2>₹{packageData.price} </h2>
          <p className="fs-4 fw-bold"> {packageData.name}</p>
        </div>
        <p className="pti-body fs-5">{packageData.description}</p>
        <div className="pti-footer">
          <Button size='lg' onClick={() => navigate('/pricing2', { state: { item: packageData } })}>Buy Now</Button>
        </div>
      </div>
    </Col>
  );
};

const Pricing = () => {
  return (
    <Container fluid className="pricing-container text-light pt-5 pb-5">
      <Row className="mb-4">
        <Col className="d-flex align-items-center justify-content-center">
          <h2>Packages</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="d-flex align-items-center justify-content-center">
          <h4>Save More as You Sweat More!</h4>
        </Col>
      </Row>
      <Row>
        {packages.map((item, index) => (
          <PricingCard key={index} packageData={item} />
        ))}
      </Row>
    </Container>
  );
};

export default Pricing;
