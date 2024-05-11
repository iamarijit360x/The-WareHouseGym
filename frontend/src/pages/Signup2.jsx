import React, { useState,useEffect} from 'react';
import { Container, Row, Col, Form, Button,Card } from 'react-bootstrap';

import { useLocation,useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import logo from "../assets/gymlogo.png";
import './styles.css'





  
import axios from 'axios';
export default function SignUp2() {
    const { state } = useLocation();
    const { email } = state || {};
    const [success,setSuccess]=useState(false)
    const navigator=useNavigate()
    const [error,setError]=useState(null)
    const [buttonDisabled,setDisable]=useState(false)

    const [formData, setFormData] = useState({
        email: email || "",
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        firstname: '',
        lastname: '',
        otp:''
    });


    useEffect(() => {
        if (!email) {
            navigator('/signup1'); 
        }
    }, [email, navigator]);


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
        <Container fluid className="px-0 py-4 bg-dark text-light background-signup1" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh',maxWidth:"98vw" }}>
                <Col xs={10} sm={8} md={6} lg={4} style={{}}>
                      <Card className='bg-black text-light' style={{ borderRadius: '1rem',maxWidth:"35em"}}>
                        <Card.Body className='p-4'>
                   
                        
                        <Form onSubmit={handleSubmit} className='bg-black p-4 rounded'>
                            <div className='text-center '><img width={"90px"} classname='img-fluid' src={logo}/></div>
                            <p className='text-center fs-4 fw-bold p-0'>Welcome to The Warehouse Gym</p>
                            <p className="text-center info-signup">Fill Up The Details </p>
                           
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
                                    required
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
                                <Form.Label>OTP</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    
                                />
                            </Form.Group>
                            <div>
                                <Button disabled={buttonDisabled} variant="info" type="submit" className="w-100">
                                <p className="fw-bolder p-0 m-0">Create Account</p>
                                </Button>
                            </div>
                            {error && <p className="p-4 fw-bold fs-5 font-monospace text-danger mb-4 text-center">{error}</p>}
                            {success && 
                                <div className='text-center p-4'>
                                    <Spinner animation="border" variant="success" />
                                    <p className="p-4 fw-bold fs-5 font-monospace text-success mb-4 text-center">Account Created Successfully Redirecting to Login</p>
                                
                                </div>
                            }
                        </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
