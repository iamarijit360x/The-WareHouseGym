import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner,InputGroup  } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../assets/gymlogo.png";
import './styles.css';

// Password validation function
const validatePassword = (password) => {
    const minLength = 6;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;

    if (password.length < minLength) {
        return 'Password must be at least 6 characters long.';
    }
    if (!specialCharPattern.test(password)) {
        return 'Password must include at least one special character.';
    }
    if (!upperCasePattern.test(password)) {
        return 'Password must include at least one uppercase letter.';
    }
    if (!lowerCasePattern.test(password)) {
        return 'Password must include at least one lowercase letter.';
    }
    if (!numberPattern.test(password)) {
        return 'Password must include at least one number.';
    }
    return '';
};

export default function SignUp2() {
    const { state } = useLocation();
    const { email } = state || {};
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [buttonDisabled, setDisable] = useState(false);
    const [formData, setFormData] = useState({
        email: email || "",
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        firstname: '',
        lastname: '',
        otp: ''
    });
    const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
    const [showPassword,setShowPassword]=useState(false)
    const navigator = useNavigate();

    useEffect(() => {
        if (!email) {
            navigator('/signup1');
        }
    }, [email, navigator]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        if (id === 'password') {
            const message = validatePassword(value);
            setPasswordValidationMessage(message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Password and Confirm Password must match!");
            return;
        }

        if (passwordValidationMessage) {
            setError(passwordValidationMessage);
            return;
        }

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/signup", formData);
            if (response.data.success) {
                setError(false);
                setSuccess(true);
                setTimeout(() => navigator('/signin'), 3000);
            } else {
                setError("Incorrect OTP");
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "An error occurred");
            setDisable(true);
        }
    };

    return (
        <Container fluid className="px-0 py-4 bg-dark text-light background-signup1" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh', maxWidth: "98vw" }}>
                <Col xs={10} sm={8} md={6} lg={4}>
                    <Card className='bg-black text-light' style={{ borderRadius: '1rem', maxWidth: "35em" }}>
                        <Card.Body className='p-4'>
                            <Form onSubmit={handleSubmit} className='bg-black p-4 rounded'>
                                <div className='text-center'>
                                    <img width={"90px"} className='img-fluid' src={logo} alt="Logo" />
                                </div>
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
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                    {passwordValidationMessage && <Form.Text className="text-danger">{passwordValidationMessage}</Form.Text>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
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
                                        placeholder="Enter OTP"
                                        value={formData.otp}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <div>
                                    <Button disabled={buttonDisabled || !!passwordValidationMessage} variant="info" type="submit" className="w-100">
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
