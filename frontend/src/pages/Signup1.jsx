import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import logo from "../assets/gymlogo.png";
import './styles.css'


export default function SignUp1() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('') 
    const [loading,setLoading]=useState(false)
    const [emailStatus,setEmailStatus]=useState(false)
    const [error,setError]=useState(null)
    const [otp,setOtp]=useState()
    const [buttonStatus,setButton]=useState(false)
    const[disable,setDisable]=useState(false)
    const handleChange = (e) => {
        const value= e.target.value;
        setEmail(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       try {
        setError(false)
        setLoading(true)
        const response =await axios.post(import.meta.env.VITE_BACKEND_URL+"/generateotp",{email})
        setLoading(false)
        //const response={data:{userExists:false,otpGenration:true}};
        setButton(false)
        
        if(response.data.otpGenration)
        {
           
            setLoading(false)
            setEmailStatus(true)
            
            setTimeout(()=>navigate('/signup2', { state:{email} }),2000)
        }
        
       } catch (error) {
        console.log(error)
        
        setError(error.response.data.message)
        setEmailStatus(false)
        setLoading(false)
        if(error.response.data.otp){
            console.log("OTP",error.response.data.otp)
            setOtp(error.response.data.otp)
            setButton(true)
        }
       
        if(error.response.data.loginDisabled)
            setDisable(true) 

        if(error.response.data.userExists)
            {
                setError(error.response.data.message+=' Redirecting to Login')
                setTimeout(()=>navigate('/signin'),2000)
            }
       }
        
    };

    return (
        <Container fluid className="bg-dark text-light d justify-content-center align-content-center background-signup1" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center ">
                <Col xs={10} sm={8} md={6} lg={4} style={{minWidth:"35%"}}>
                    <div className="registration-form">
                        
                        <Form onSubmit={handleSubmit} className='bg-black p-4 rounded' >
                            <div className='text-center '><img width={"90px"} classname='img-fluid' src={logo}/></div>
                            <p className='text-center fs-4 fw-bold p-0'>Welcome to The Warehouse Gym</p>
                            <p className="text-center info-signup">To create a account fill in your email below and we"ll send you an email with a OTP to get you started </p>
                           
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className='text-center p-4'>
                                <Button  variant="info" disabled={disable}  type="submit" className="w-20">
                                    <p className="fw-bolder p-0 m-0">Send OTP</p>
                                </Button>
                            </div>
                            <div className='text-center'>
                                {loading && 
                                <div > 
                                    <p className="text-warning mb-4 text-center">This Website Deployed on a free instance will spin down with inactivity, which can delay requests by 50 seconds or more.</p>
                                    <p className="fw-bold text-warning mb-4 text-center">Please Wait😊</p>
                                     <div className='text-center pb-2'><Spinner animation="border" variant="info" /></div>
                                </div>}
                                {error && <><p className="text-danger  fw-bold mb-4 text-center">{error}</p><div className='text-center pb-2'></div></>}
                                {otp && <p className="text-danger mb-4 text-center">Sorry Unable to send OTP.Your OTP is <span className='fw-bolder'>{otp}</span></p>}
                                {emailStatus && 
                                <div > 
                                     <div className='text-center p-0'><Spinner animation="border" variant="info" /></div>
                                     <p className="text-success dsfw-bold mb-4 text-center">OTP Sending to {email}</p>
                                    
                                </div>}
                                {
                                    buttonStatus && <Button  onClick={()=>navigate('/signup2', { state:{email} })}>Next</Button>
                                }
                                <p className='text-warning fw-bolder'>**Please check your spam folder for the OTP.</p>
                            </div>
                                <hr className="my-3" />
                                <div className="mt-3 text-center">
                                    Already have an account? <Link to="/signin">Sign in</Link>
                                </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
