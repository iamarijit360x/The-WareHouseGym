import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css'; // Import your CSS file where you define background styles
import image from '../../assets/cover.png';

export default function WelcomeScreen() {
  return (
    <Container fluid className="background-container">
      <Row >
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center align-items-lg-center">
          <img src={image} className="img-fluid" alt="Background" />
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center flex-column">
            <Row><h2 className="tag-line text-center"><span>Strength</span>, <span>Sweat</span>, <span>Sucess</span></h2></Row>
            <Row><p>100+ Clientss</p></Row>
          
        </Col>
      </Row>
    </Container>
  );
};
