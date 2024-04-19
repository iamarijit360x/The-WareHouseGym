import React, { useEffect } from 'react';
import { Container,ProgressBar, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthState, setUserData } from '../utils/store/AuthSlice';
import Pricing from '../components/Pricing/Pricing';

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
  let percentage=daysLeft;
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
      <p className='text-center display-4'>Welcome Back {userData.firstname}</p>
       <Col >{userData.membership?
        <div className='rounded border d-flex p-4 flex-column justify-content-center align-items-center mx-auto'>
          <p className='text-center fs-3'>MemberShip Details</p>
          <p className='fs-4'>Expiry Date:{dd.toDateString()}</p>
          <p className='fs-4'>Days Remaining {daysLeft}</p>
        </div>
        
      :<div className='rounded border d-flex p-4 flex-column justify-content-center align-items-center mx-auto'>
      <p className='text-center fs-3'>Hey {userData.firstname} Looks Like You Don't have a Mermbership</p>
      <p className='text-center fs-5'>Let's Get One</p>
      <Pricing/>
    </div>
      }
       </Col>

     

      
      </Row>
    </Container>
  );
}

export default Dashboard;
