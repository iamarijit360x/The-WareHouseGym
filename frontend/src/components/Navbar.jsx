import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from "../assets/gymlogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthState } from '../utils/store/AuthSlice';
import axios from 'axios';

export default function MyNavbar() {
  const authState=useSelector(state=>state.auth.authState)
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleLogout = async () => {
    try {

      const response = await axios.get('http://localhost:3000/signout'); 
      dispatch(setAuthState(false))
      navigate('/signin')
      console.log(response.data);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar sticky="top" bg="body-tertiary" className="px-4" expand="sm" data-bs-theme="dark" position-fixed>
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            alt=""
            src={logo}
            width="35"
            height="auto"
            className="d-inline-block align-top mr-2"
          />
          <span className="d-none d-md-inline">The Warehouse Gym</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-content-around">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Price</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
            {authState?<Button onClick={()=>handleLogout()}>Sign Out</Button>:<Nav.Link href="/signin">Hello, Sign In</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
