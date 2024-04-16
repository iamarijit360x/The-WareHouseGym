import React from 'react';
import { Navbar, Nav, Container, Button,Badge} from 'react-bootstrap';
import logo from "../assets/gymlogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthState,setUserData } from '../utils/store/AuthSlice';
import axios from 'axios';

export default function MyNavbar() {
  const authState=useSelector(state=>state.auth.authState)
  const name=useSelector(state=>state.auth.userData.firstname)
  const cartCount=useSelector(state=>state.cart.count)
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleLogout = async () => {
    try {
      
      const response = await axios.get('http://localhost:3000/signout'); 
      dispatch(setAuthState(false))
      dispatch(setUserData({}))
      navigate('/signin')
      console.log(response.data);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar sticky="top" bg="body-tertiary" className="px-4" expand="sm" data-bs-theme="dark" position-fixed>
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
            <Nav.Link href="#">Price</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
            {authState?<Nav.Link href="/dashboard"><span>{name}<i class="fa-regular fa-user"></i></span></Nav.Link>:null}
            <Nav.Link ><i class="fa-solid fa-cart-shopping">  <Badge pill variant="danger" className="badge-icon">
        {cartCount}
      </Badge></i></Nav.Link>
            {authState?<Nav.Link onClick={()=>handleLogout()}>Sign Out</Nav.Link>:<Nav.Link href="/signin">Hello, Sign In</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
