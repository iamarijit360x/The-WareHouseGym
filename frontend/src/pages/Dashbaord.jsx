import React, { useEffect, useState } from 'react';
import { Container,Row, Col, Button,Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAuthState, setUserData } from '../utils/store/AuthSlice';
import { useNavigate} from 'react-router-dom';
import './styles.css'
import Menu from '../components/Menu';
function Dashboard() {
  const navigate=useNavigate();
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
    setPrevButton(false)
      if(k===userData.membership.length-2)
     { 
       setButton(true)
       setK(k+1)
     }
      else
       {
        setK(k+1)
      }
    }

    function handleMemberhipPrevNav(){
    
      setButton(false)
      if(k===1)
      { 
       setK(k-1)
       setPrevButton(true)
      }
      
      else
      {  
        setK(k-1)
        
      }
    }


    useEffect(() => {
      
       
           axios.get(import.meta.env.VITE_BACKEND_URL+"/profile", { withCredentials: true })
          .then((response)=>{
            if(response.data)
              dispatch(setUserData(response.data));})
          .then(()=>{
           
            

          })
          .catch((err)=>{
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
                personal_training:membership.personal_training,
              
                
              }
              setInfo(obj)
       
              
            }
            else if( userData.OrderHistory.length){
              setExpired(true)
            
              membership=userData.OrderHistory[userData.OrderHistory.length-1];
              expiryDate=new Date(membership.end_date)
              startDate=new Date(membership.start_date);
              let expDays=(Math.floor((new Date() - new Date(expiryDate)) / 1000 / 3600 / 24))
              const obj={
                expiryDate:expiryDate,
                startDate:startDate,
                expDays:expDays
                
              }
              setInfo(obj)
              
            }
            else{
             
              setnewUser(true)
            }
            setTimeout(() => {
              setLoading(false);
            }, 1000);
    }     
      
    },[userData,k])
     
   try{
  return (
    <Container  fluid className="text-light align-content-center" style={{ minHeight: '100vh',backgroundColor:"#3f0715" }}>
      
     {loading?
        <Row>
        <div className=" d-flex justify-content-center flex-wrap gap-5" > 
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
        </div>
        </Row>
      : 
      <>
         
      
          <Row>

          <p className=' text-center display-5 p-0'>Welcome Back <span className="fw-bolder">{userData.firstname}</span></p>
          <div className='d-flex justify-content-center border-black'></div>
          <Col className='membership-card'>

            <div className='p-4 membership-container rounded border d-flex flex-column justify-content-center'>
            <span><Menu/></span>
              {newUser ?

                <div>
                  <p className='text-center fs-3'>Hey {userData.firstname} Looks Like You Don't have a Mermbership</p>

                  <p className='text-center fs-5'>Let's Get One</p>

                  <p className='text-center'>.</p>
                  <p className='text-center'>.</p>
                  <p className='text-center fs-4'>.</p>
                  <p className=' text-center fs-4'>.</p>
                  <p className='text-danger'>.</p>
                  <p className='text-center'>.</p>

                  <div className='text-center'> <Button onClick={() => navigate('/pricing1')}>Buy a Membership</Button> </div>
                </div>
                :
                <div>
                  <p className='text-center fs-3'>MemberShip Details</p>
                  <div className='fs-4'>
                    <p className='text-center'>Srt Date: {info.startDate.toDateString()}</p>
                    <p className='text-center'>Exp Date: {info.expiryDate.toDateString()}</p>
                  </div>
                  <p className='text-center fs-4'>Trademill Access:{info.trademil ? "Yes" : "No"}</p>
                  <p className=' text-center fs-4'>Personal Training:{info.personal_training ? "Yes" : "No"}</p>

                  {expired ?
                    <div className='text-center'>
                      <p className='text-danger'>Expired</p>
                      <p className=' text-center fs-4'>Pack Expired {info.expDays === 0 ? "Today" : `${info.expDays} Days ago`}</p>
                      <Button onClick={() => navigate('/pricing1')}>Buy a Membership</Button>
                    </div>
                    :
                    userData.membership[k].status ?
                      <><p className='text-success text-center'>Active</p>{/*<ProgressBar style={{ width: "15rem" }} max={100} now={percentage} />*/}
                        {info.daysLeft <= 10 ?

                          <div className='text-center'>
                            <p className='fs-4 text-center text-danger'>Days Remaining {info.daysLeft}</p>
                            <Button className="text-center" onClick={() => navigate('/pricing1')}>Buy Membership Now</Button>
                          </div>
                          :
                          <div className='text-center'>
                            <p className='fs-4 text-center text-warning'>Days Remaining {info.daysLeft}</p>

                          </div>}
                      </>
                      : <><p className='text-warning text-center'>Upcoming</p>
                        <p className='fs-4 text-center'>...</p>
                      </>}

                  {userData.membership.length > 1 &&
                    <div className='d-flex justify-content-center gap-5'>
                      <Button disabled={buttonPrevStatus} onClick={() => handleMemberhipPrevNav()}>{'<'}</Button>
                      <Button disabled={buttonStatus} onClick={() => handleMemberhipNav()}>{'>'}</Button>
                    </div>}



                </div>}
            </div>




          </Col>
          

          

        </Row></>}
        
                    
    </Container>
  );}
  catch{
    window.location.reload();
  }
}

export default Dashboard;
