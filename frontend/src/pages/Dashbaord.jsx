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
  const [newUser,setnewUser]=useState(false)
  const [expired,setExpired]=useState(true)
  const [loading,setLoading]=useState(true)
  const [buttonStatus,setButton]=useState(false)
  const [info,setInfo]=useState({})
  let membership,expiryDate,startDate,daysLeft,percentage;
  let today=new Date();
  
  //membership Data Caluclations
  
   function handleMemberhipNav(){
      if(k===userData.membership.length-1)
        setButton(true)
      else
        setK(k+1)
    }
    useEffect(() => {
      
       
           axios.get("http://localhost:3000/profile", { withCredentials: true })
          .then((response)=>{
            if(response.data)
              dispatch(setUserData(response.data));})
          .then(()=>{
            console.log(userData)
            

          })
          .catch((err)=>{
            console.error("Error fetching data:", err);
            dispatch(setAuthState(false));
            setLoading(false);})
         
    

    
     
    }, []);


    useEffect(()=>{
          if(Object.keys(userData).length !== 0.)
            {if(userData.membership.length)
            { 
              
              membership=userData.membership[k];
              expiryDate=new Date(membership.end_date);
              startDate=new Date(membership.start_date);
              daysLeft=expiryDate-new Date()
              daysLeft=Math.ceil(daysLeft/(1000*60*60*24))
              const duration=membership.duration*30;
              percentage=Math.abs((duration-daysLeft)/duration)
              const obj={
                expiryDate:expiryDate,
                startDate:startDate,
                daysLeft:daysLeft,
                duration:duration,
                percentage:percentage,
                info:membership.status
              }
              setInfo(obj)
          
              
            }
            else if( userData.OrderHistory.length){
              setExpired(true)
              setLoading(false);
              membership=userData.OrderHistory[userData.OrderHistory.length-1];
              expiryDate=new Date(membership.end_date)
              startDate=new Date(membership.start_date);
              const obj={
                expiryDate:expiryDate,
                startDate:startDate,
                
              }
              setInfo(obj)
              
            }
            else{
              setLoading(false);
              setnewUser(true)
            }
            setLoading(false)
}     

    },[userData])
     
   
  return (
    <Container  fluid className="bg-dark text-light" style={{ minHeight: '100vh' }}>
      
     {loading?<p>Loading</p>: <Row>
      <p className='text-center display-4'>Welcome Back {userData.firstname}</p>
       <Col >{ newUser ?

        <div className='rounded border d-flex p-4 flex-column justify-content-center align-items-center mx-auto'>
        <p className='text-center fs-3'>Hey {userData.firstname} Looks Like You Don't have a Mermbership</p>
        <p className='text-center fs-5'>Let's Get One</p>
        <Pricing/>
        </div>
        :expired?
        <div className='rounded border d-flex p-4 flex-column justify-content-center align-items-center mx-auto'>
          <p className='text-center fs-3'>MemberShip Details</p>
          <p className='fs-4'>Start Date:{info.startDate.toDateString()}</p>
          <p className='fs-4'>Expiry Date:{info.expiryDate.toDateString()}</p>
         
             <p className='text-danger'>Expired</p>
             <p>Pack Expired {Math.floor((new Date()-new Date(info.expiryDate))/1000/3600/24)} days ago</p>
             <Pricing/>
           
            
          </div>
    
        
        :<div className='rounded border d-flex p-4 flex-column justify-content-center align-items-center mx-auto'>
          <p className='text-center fs-3'>MemberShip Details</p>
          <p className='fs-4'>Start Date:{info.startDate.toDateString()}</p>
          <p className='fs-4'>Expiry Date:{info.expiryDate.toDateString()}</p>
          {info.status?
             <><p className='text-success'>active</p><ProgressBar style={{ width: "15rem" }} max={100} now={percentage} /><p className='fs-4'>Days Remaining {info.daysLeft}</p></>
            :<p>Upcoming</p>
            
            }
        
        {userData.membership.length>1 && <Button disabled={buttonStatus} onClick={()=>handleMemberhipNav()}>{'>'}</Button>}
        </div>
        
      
      }
       </Col>

     

      
      </Row>}
    </Container>
  );
}

export default Dashboard;
