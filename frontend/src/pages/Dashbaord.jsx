import React, { useEffect, useState } from 'react';
import { Container,ProgressBar, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthState, setUserData } from '../utils/store/AuthSlice';
import Pricing from '../components/Pricing/Pricing';

function Dashboard() {

  const userData=useSelector(state=>state.auth.userData)
  const dispatch=useDispatch()
  const [k,setK]=useState(0)
  const [buttonStatus,setButton]=useState(false)
  let membership,expiryDate,startDate,daysLeft,percentage;
  let today=new Date();
  
  //membership Data Caluclations
  if(userData.membership && userData.membership.length)
    { 
     
      membership=userData.membership[k];
      expiryDate=new Date(membership.end_date);
      startDate=new Date(membership.start_date);
      daysLeft=expiryDate-new Date()
      daysLeft=Math.ceil(daysLeft/(1000*60*60*24))
      const duration=membership.duration*30;
      percentage=Math.abs((duration-daysLeft)/duration)
      console.log(duration)
    }
   function handleMemberhipNav(){
      if(k===userData.membership.length-1)
        setButton(true)
      else
        setK(k+1)
    }
  useEffect(()=>{

    axios
    .get("http://localhost:3000/profile", { withCredentials: true })
    .then((response)=>dispatch(setUserData(response.data)))
    .catch((err)=>{console.log(err);dispatch(setAuthState(false))});
    console.log(userData);

  },[])
     

  return (
    <Container  fluid className="bg-dark text-light" style={{ minHeight: '100vh' }}>
      <Row>
      <p className='text-center display-4'>Welcome Back {userData.firstname}</p>
       <Col >{ (userData.membership && userData.membership.length) ?
        <div className='rounded border d-flex p-4 flex-column justify-content-center align-items-center mx-auto'>
          <p className='text-center fs-3'>MemberShip Details</p>
          <p className='fs-4'>Start Date:{startDate.toDateString()}</p>
          <p className='fs-4'>Expiry Date:{expiryDate.toDateString()}</p>
          {membership.status?new Date(membership.end_date)<new Date()?
             <p className='text-danger'>Expired</p>
            :<p>Upcoming</p>
            :<><p>active</p><p className='text-success'></p><ProgressBar style={{ width: "15rem" }} max={100} now={percentage} /><p className='fs-4'>Days Remaining {daysLeft}</p></>
            }
        
        {userData.membership.length>1 && <Button disabled={buttonStatus} onClick={()=>handleMemberhipNav()}>{'>'}</Button>}
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
