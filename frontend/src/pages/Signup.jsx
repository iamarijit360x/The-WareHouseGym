import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
export default function SignUp() {
    const navigator=useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        firstname: '',
        lastname: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(formData.password !== formData.confirmPassword) {
            alert("Password and Confirm Password must match!");
            return;
        }

        const response =await axios.post("http://localhost:3000/signup",formData)
        if(response.data.userExists)
        { 
            alert('USer Already Registered Please Log In');
            navigator('/signin')
    
        }
        else if(response.data.success)
        {
            navigator('/signin')
        }
    };

    return (
        <Container fluid className="bg-dark text-light" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center vh-100">
                <Col xs={10} sm={8} md={6} lg={4}>
                    <div className="registration-form">
                        <h2 className="text-center mb-4">Register</h2>
                        <Form onSubmit={handleSubmit}>
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
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                            <Button variant="primary" type="submit" className="w-100">
                                Register
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
