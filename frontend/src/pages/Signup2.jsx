import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useLocation,useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';




  
import axios from 'axios';
export default function SignUp2() {

    const { state } = useLocation();
    const { email } = state;
    const [success,setSuccess]=useState(false)
    const navigator=useNavigate()
    const [error,setError]=useState(null)
    const [buttonDisabled,setDisable]=useState(false)

    const [formData, setFormData] = useState({
        email: email,
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        firstname: '',
        lastname: '',
        otp:''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(formData.password !== formData.confirmPassword) {
            setError("Password and Confirm Password must match!");
            return;
        }
        try {
            const response =await axios.post(import.meta.env.VITE_BACKEND_URL+"/signup",formData)
            if(response.data.success)
            { 
                setError(false)
                setSuccess(true);
                setTimeout(()=>navigator('/signin'),3000)
                
        
            }
            else
            {
               setError("Incorrect OTP")
            }
            
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
            setDisable(true)
        }
       
    };

    return (
        <Container fluid className="bg-dark text-light p-4">
            <Row className="justify-content-center align-items-center">
                <Col xs={10} sm={8} md={6} lg={4}>
                    <div className="registration-form">
                        <h2 className="text-center mb-4">Register</h2>
                        <Form onSubmit={handleSubmit} className='bg-black p-4 rounded'>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={email}
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Form.Group>
                            
                            
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="otp">
                                <Form.Label>Otp</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <Button disabled={buttonDisabled} variant="primary" type="submit" className="w-100">
                                Register
                            </Button>
                            {error && <p className="text-danger mb-4 text-center">{error}</p>}
                            {success && <><p className="text-success mb-4 text-center">Account Created Successfully</p>
                            <div className='text-center pb-2'>
                                <Spinner animation="border" variant="success" />
                                <p className="text-success mb-4 text-center">Redirecting to Login</p>
                            
                            </div></>}
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
