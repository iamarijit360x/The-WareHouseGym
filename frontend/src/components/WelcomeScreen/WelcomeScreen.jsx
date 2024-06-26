import React from 'react';
import { Container, Row, Col,Button } from 'react-bootstrap';
import './Home.css'; // Import your CSS file where you define background styles
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function WelcomeScreen() {

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Check if screen width is less than or equal to 768px
    };

    handleResize(); // Call handleResize once to set initial screen size
    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener on component unmount
    };
  }, []);
  return (
    <Container style={{paddingTop:"20px"}}fluid className="background-container d-flex flex-column align-items-center justify-content-center align-items-lg-center">
   
          
        
          <Row>
            {!isSmallScreen && <Col></Col>}
            
            <Col >
                 <p className='text-center tag-line'>"Push Your Limits, Find Your Strength"</p>
                 <div className='text-center'><button onClick={()=>{navigate('/signup1')}}className='glowing-btn'><span class='glowing-txt'>Start</span></button></div>
            </Col>
            
           
          </Row>
         
        
        
       

     
    </Container>
  );
};
