import React, { useEffect, useState } from 'react';
import { Container,ProgressBar, Row, Col, Card, Button,Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthState, setUserData } from '../utils/store/AuthSlice';
import Pricing from '../components/Pricing/Pricing';
import { useLocation } from 'react-router-dom';
import './styles.css'
function Dashboard() {
  
  const userData=useSelector(state=>state.auth.userData)
  const dispatch=useDispatch()
  const [k,setK]=useState(0)
  const [newUser,setnewUser]=useState(false)
  const [expired,setExpired]=useState(false)
  const [loading,setLoading]=useState(true)
  const [buttonStatus,setButton]=useState(false)

  const [buttonPrevStatus,setPrevButton]=useState(true)
  const [info,setInfo]=useState({})
  let membership,expiryDate,startDate,daysLeft,percentage;
  let today=new Date();
  
  //membership Data Caluclations
  
   function handleMemberhipNav(){
      if(k===userData.membership.length-2)
     { setButton(true)
       setK(k+1)
    }
      else
       {
        setPrevButton(false) 
        setK(k+1)
      }
    }

    function handleMemberhipPrevNav(){
      if(k===1)
     { setK(k-1)
       setPrevButton(true)}
        
      else
      {  
        setK(k-1)
        setButton(false)
      }
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
         
    

    
     
    }, [dispatch]);


    useEffect(()=>{
          if(Object.keys(userData).length !== 0)
            {
              
            if(userData.membership.length)
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
                info:membership.status,
                trademil:membership.trademil,
                personal_training:membership.personal_training
              }
              setInfo(obj)
              console.log(info)
              
            }
            else if( userData.OrderHistory.length){
              setExpired(true)
            
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
             
              setnewUser(true)
            }
            setTimeout(() => {
              setLoading(false);
            }, 2000);
    }     
      
    },[userData,k])
     
   try{
  return (
    <Container  fluid className=" bg-dark text-light align-content-center" style={{ minHeight: '100vh' }}>
      
     {loading?
        <Row>
        <div className=" d-flex justify-content-center gap-5" > 
               <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="light" />
              <Spinner animation="grow" variant="dark" />
        </div>
        </Row>
      : 
      <Row >
        <p className='text-center display-4'>Welcome Back {userData.firstname}</p>
        <Col className='membership-card'>

        <div  className=' membership-container rounded border d-flex p-4 flex-column justify-content-center  mx-auto'>
        { newUser ?

          <div>
            <p className='text-center fs-3'>Hey {userData.firstname} Looks Like You Don't have a Mermbership</p>
            <p className='text-center fs-5'>Let's Get One</p>
            <Pricing/>
          </div>
      :
              <div>
                <p className='text-center fs-3'>MemberShip Details</p>
                <div className='fs-4'>
                  <p className='text-center'>Srt Date: {info.startDate.toDateString()}</p>
                  <p className='text-center'>Exp Date: {info.expiryDate.toDateString()}</p>
                </div>
                <p className='text-center fs-4'>Trademill Access:{info.trademil?"Yes":"No"}</p>
                <p className=' text-center fs-4'>Personal Training:{info.personal_training?"Yes":"No"}</p>
                
                {expired?
                  <>
                    <p className='text-danger'>Expired</p>
                    <p>Pack Expired {Math.floor((new Date() - new Date(info.expiryDate)) / 1000 / 3600 / 24)} days ago</p>
                    <Pricing />
                  </>
                  :
                  userData.membership[k].status ?
                    <><p className='text-success text-center'>Active</p>{/*<ProgressBar style={{ width: "15rem" }} max={100} now={percentage} />*/}
                      <p className='fs-4 text-center' >Days Remaining {info.daysLeft}</p></>
                    : <><p className='text-warning text-center'>Upcoming</p>
                        <p className='fs-4 text-center'>.</p>
                      </>
                    }

                  {userData.membership.length > 1 &&
                    <div className='d-flex justify-content-center'>
                      <Button disabled={buttonPrevStatus} onClick={() => handleMemberhipPrevNav()}>{'<'}</Button>
                      <Button disabled={buttonStatus} onClick={() => handleMemberhipNav()}>{'>'}</Button>
                    </div>
                    
                    }
                


              </div>
              }
            </div>
           
        
      
      
       </Col>

     

      
      </Row>}
    </Container>
  );}
  catch{
    window.location.reload();
  }
}

export default Dashboard;
