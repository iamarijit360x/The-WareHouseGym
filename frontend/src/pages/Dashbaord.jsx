import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pricing from '../components/Pricing/Pricing';

function Dashboard() {

  const userData=useSelector(state=>state.auth.userData)
  let dd=new Date(userData.membership)

  let temp=dd.getTime()
  let temp2=new Date()
  temp2= temp2.getTime()
  let temp3=temp-temp2
  let daysLeft=Math.ceil(temp3/(1000*60*60*24))
  return (
    <Container  fluid className="bg-dark text-light" style={{ minHeight: '100vh' }}>
      <Row>
        <Col lg={12}>
          <p className='text-center display-4'>Welcome Back {userData.firstname}</p>
          {userData.membership?

            <div>
              <p>Your membership expires on {dd.toDateString()}</p>
              <p>Your membership expires in {daysLeft} Days</p>
            </div>
            :<div>
              <p className='text-center display-6'>Hey Looks Like You Don't Have Membership!?</p>
              <p className='text-center display-6 text-danger text-decoration-underline'>Let's Get One</p>
              <Pricing/>            
            </div>
            
          }
          
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
