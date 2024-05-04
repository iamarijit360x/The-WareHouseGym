import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

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
        
        if(response.data.otpGenration)
        {
            setLoading(false)
            setEmailStatus(true)
            
            setTimeout(()=>navigate('/signup2', { state:{email} }),4000)
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
        <Container fluid className="bg-dark text-light" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center vh-100">
                <Col xs={10} sm={8} md={6} lg={4}>
                    <div className="registration-form">
                        
                        <Form onSubmit={handleSubmit} className='bg-black p-4 rounded'>
                            
                  
                            
                           
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className='text-center p-4'>
                                <Button disabled={disable} variant="primary" type="submit" className="w-20">
                                    Send OTP
                                </Button>
                            </div>
                            <div className='text-center'>
                                {loading && 
                                <div > 
                                    <p className="text-warning mb-4 text-center">This Website Deployed on a free instance will spin down with inactivity, which can delay requests by 50 seconds or more.</p>
                                    <p className="fw-bold text-warning mb-4 text-center">Please Wait😊</p>
                                     <div className='text-center pb-2'><Spinner animation="border" variant="info" /></div>
                                </div>}
                                {error && <><p className="text-danger fs-5 fw-bold mb-4 text-center">{error}</p><div className='text-center pb-2'></div></>}
                                {otp && <p className="text-danger mb-4 text-center">Sorry Unable to send OTP cause your otp is {otp}</p>}
                                {emailStatus && 
                                <div > 
                                    <p className="text-warning mb-4 text-center">OTP Sent to {email}</p>
                                     <div className='text-center pb-2'><Spinner animation="border" variant="info" /></div>
                                </div>}
                                {
                                    buttonStatus && <Button onClick={()=>navigate('/signup2', { state:{email} })}>Next</Button>
                                }
                            </div>
                            
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
