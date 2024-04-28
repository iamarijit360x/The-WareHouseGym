import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../../assets/gymlogo.png";
import './Footer.css';


export default function Footer() {
    return (
        <footer className="footer">
            <Container fluid>
                <Row>
                    <Col xs={12} md={4} lg={4} className="footer-logo d-flex flex-column align-items-center justify-content-center" >
                        <img className="gym-logo img-fluid d-flex flex-column align-items-center justify-content-center" src={logo} alt="Gym Logo" />
                        
                    </Col>

                    <Col  xs={12} md={4} lg={4} className="d-flex flex-column align-items-center justify-content-center">
                        <h3 className="footer-logo-text">The Warhouse Gym</h3>
                        <p className='text-center'>123 Gym Street, Fitness City</p>
                        <p className='text-center'>Phone: +123 456 7890</p>
                        <p className='text-center'>Email: info@warhousegym.com</p>
                    </Col>
                   
                    <Col xs={12} md={4} lg={4} className="text-center">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="#"><i  className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </Col>
                </Row>
                <Row className='copyright'>  <p  className="text-center align-content-center">&copy; {new Date().getFullYear()} The Warhouse Gym. All rights reserved.</p></Row>
            </Container>
        </footer>
    );
}
