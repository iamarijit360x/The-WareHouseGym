import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pricing from '../components/Pricing/Pricing';
import axios from 'axios';
import { setAuthState, setUserData } from '../utils/store/AuthSlice';

function Dashboard() {

  const userData=useSelector(state=>state.auth.userData)
  const dispatch=useDispatch()

  //membership Data Caluclations
  let dd=new Date(userData.membership)

  let temp=dd.getTime()
  let temp2=new Date()
  temp2= temp2.getTime()
  let temp3=temp-temp2
  let daysLeft=Math.ceil(temp3/(1000*60*60*24))
  //
  useEffect(()=>{

    axios
    .get("http://localhost:3000/profile", { withCredentials: true })
    .then((response)=>dispatch(setUserData(response.data)))
    .catch((err)=>{console.log(err);dispatch(setAuthState(false))});

  },[])
     

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
