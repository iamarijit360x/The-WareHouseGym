import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css'; // Import your CSS file where you define background styles
import image from '../../assets/cover.png';

export default function WelcomeScreen() {
  return (
    <Container style={{paddingTop:"20px"}}fluid className="background-container d-flex flex-column align-items-center justify-content-center align-items-lg-center">
   
          
        
          
          <p className='text-center tag-line'>"Push Your Limits, Find Your Strength"</p>
       
        
        
       

     
    </Container>
  );
};
