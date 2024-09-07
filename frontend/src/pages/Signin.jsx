import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthState, setAdmin } from '../utils/store/AuthSlice';
import logo from "../assets/gymlogo.png";
import { validatePassword } from '../utils/store/validator'; // Ensure this function is implemented

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [error, setError] = useState(null);
  const [loginDisabled, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const message = validatePassword(newPassword);
    setValidationMessage(message);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate password before sending the request
    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      setValidationMessage(passwordValidationMessage);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/login', { email, password }, { withCredentials: true });
      if (response.data.success) {
        setLoading(false);
        dispatch(setAuthState(true));

        if (response.data.user.role === 'admin') {
          dispatch(setAdmin(true));
          navigate('/admin/dashboard');
        } else {
          setTimeout(() => { navigate('/dashboard') }, 3000);
        }
      }
    } catch (error) {
      console.error(error.response?.data);
      setLoading(false);
      if (error.response?.data?.loginDisabled) {
        setDisable(true);
      }
      setError(error);
    }
  };

  return (
    <Container fluid className="background-signup1 text-light" style={{ minHeight: '100vh' }}>
      <Row className='justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Col xs={12} md={12} lg={6} className='d-flex justify-content-center my-5'>
          <Card className='bg-black text-light' style={{ borderRadius: '1rem', width: "25em" }}>
            <Card.Body className='p-4'>
              <p className='text-center fs-4 fw-bold p-0'>The Warehouse Gym</p>
              <div className='text-center w-100'>
                <img width={"90px"} className='img-fluid' src={logo} alt="Logo" />
              </div>
              <h4 className="fw-bold mb-3 text-center">Sign in</h4>
              <Form className="mb-4" onSubmit={handleSignIn}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    size="md"
                    className="bg-dark text-light"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      size="md"
                      className="bg-dark text-light"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <InputGroup.Text className="bg-dark text-light">
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                        className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                      ></i>
                    </InputGroup.Text>
                  </InputGroup>
                  {validationMessage && <Form.Text className="text-danger">{validationMessage}</Form.Text>}
                </Form.Group>
                <Button
                  disabled={loginDisabled || !!validationMessage}
                  variant="primary"
                  size='md'
                  type="submit"
                  className="w-100 mb-2"
                >
                  {loading ? <Spinner size="sm" animation="border" variant="info" /> : "Login"}
                </Button>
              </Form>
              <hr className="my-3" />
              {loading && (
                <div>
                  <p className="text-warning mb-4 text-center">This Website Deployed on a free instance will spin down with inactivity, which can delay requests by 50 seconds or more.</p>
                  <p className="fw-bold text-warning mb-4 text-center">Please Wait😊</p>
                </div>
              )}
              {error && <p className="text-danger mb-4 fw-bold text-center">{error.response?.data?.message}</p>}
              <div className="mt-3 text-center">
                Don't have an account? <Link className='text-warning fw-bold font' to="/signup1">Create one</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
