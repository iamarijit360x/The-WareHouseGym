import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import logo from "../assets/gymlogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthState, setUserData } from '../utils/store/AuthSlice';
import axios from 'axios';

export default function MyNavbar() {
  const authState = useSelector(state => state.auth.authState);
  const name = useSelector(state => state.auth.userData.firstname);
  const cartCount = useSelector(state => state.cart.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios
        .get("http://localhost:3000/signout", { withCredentials: true })
        .then(console.log)
        .catch(console.error);
      dispatch(setAuthState(false));
      dispatch(setUserData({}));
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar style={{ padding: 0 }} sticky="top" bg="black" className="px-4" expand="sm" data-bs-theme="dark" position-fixed>
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
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
            <Nav.Link href="#" className='text-white'>Price</Nav.Link>
            <Nav.Link href="#" className='text-white'>Contact Us</Nav.Link>

            {authState ? <Nav.Link href="/dashboard" className='text-white'><span style={{ fontWeight: 'bold' }}>{name}</span><i class="fa-regular fa-user"></i></Nav.Link> : null}
            {authState ? <Nav.Link onClick={() => handleLogout()} className='text-white'>Sign Out</Nav.Link> : <Nav.Link href="/signin" className='text-warning'><span style={{ fontWeight: 'bold' }}>Sign In</span></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
