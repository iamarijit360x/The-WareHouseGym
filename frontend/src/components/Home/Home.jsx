import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css'; // Import your CSS file where you define background styles
import image from '../../assets/back.png';

export default function Home() {
  return (
    <Container fluid className="background-container">
      <Row>
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <img src={image} height="100%" className="img-fluid" alt="Background" />
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center flex-column">
            <Row><h2 className="text-center">Strength, Sweat, Success</h2></Row>
            <Row><p>100+ Clientss</p></Row>
          
        </Col>
      </Row>
    </Container>
  );
};