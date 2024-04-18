import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setAuthState, setUserData } from '../utils/store/AuthSlice';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError]=useState(null)
  const [loginDisabled,setDisable]=useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password },{ withCredentials: true });

      if (response.data.success) {
        
        dispatch(setAuthState(true));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error.response.data);
      if(error.response.data.loginDisabled)
        setDisable(true)
      setError(error);
    }
  };

  return (
    <Container fluid className="bg-dark text-light" style={{ minHeight: '100vh' }}>
      <Row className='justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Col xs={12} md={12} lg={6} className='d-flex justify-content-center'>
          <Card className='bg-dark text-light' style={{ borderRadius: '1rem', maxWidth: '350px' }}>
            <Card.Body className='p-4'>
              <h2 className="fw-bold mb-3 text-center">Sign in</h2>
              <p className="text-muted mb-4 text-center">Please enter your login and password!</p>
              
              <Form className="mb-4" onSubmit={handleSignIn} >
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control type="email" placeholder="Enter email" size="md" className="bg-dark text-light" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <InputGroup>
                    <Form.Control  id="password" type={showPassword?"text":"password"} placeholder="Password" size="md" className="bg-dark text-light" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <InputGroup.Text className="bg-dark text-light">
                    <i style={{cursor:"pointer"}}onClick={() => setShowPassword(!showPassword)} className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Button disabled={loginDisabled}  variant="primary" size='md' type="submit" className="w-100 mb-2">
                  Login
                </Button>
              </Form>
              <hr className="my-3" />
              {error && <p className="text-danger mb-4 text-center">{error.response.data.message}</p>}
              <Button size='md' className="mb-2 w-100" style={{ backgroundColor: '#dd4b39' }}>
                <i className="fab fa-google me-2"></i>
                Sign in with Google
              </Button>
              <Button size='md' className="w-100" style={{ backgroundColor: '#3b5998' }}>
                <i className="fab fa-facebook-f me-2"></i>
                Sign in with Facebook
              </Button>
              <div className="mt-3 text-center">
                Don't have an account? <Link to="/signup">Create one</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
