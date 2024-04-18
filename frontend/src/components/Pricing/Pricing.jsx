import React from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Button, Row, Col } from 'react-bootstrap';
import './Pricing.css';
import { useNavigate,Link } from 'react-router-dom';

import sliver from '../../assets/sliver.png';

export default function Pricing() {
  const navigate=useNavigate()
  let packages = [
    { membersip:true,id:"m001",name: "Monthly", price: 450, duration: 1, img: sliver },
    { membersip:true,id:"m002",name: "Quater Yearly", price: 1200, duration: 3, img: sliver },
    { membersip:true,id:"m003",name: "Half yearly", price: 2250, duration: 6, img: sliver },
    { membersip:true,id:"m004",name: "Yearly", price: 4200, duration: 12, img: sliver }
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
                <Button onClick={()=>{navigate('/checkout', { state: {item} });}} variant="primary">Buy Now</Button>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
