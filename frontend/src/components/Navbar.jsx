import React from 'react';
import { Navbar, Nav,Container} from 'react-bootstrap';
import logo from "../assets/gymlogo.png"
export default function MyNavbar() {
  return (
    <Navbar sticky="top" bg="body-tertiary" className="gap-5 px-4"  expand="sm" data-bs-theme="dark" position-fixed>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="35"
          height="auto"
          className="d-inline-block align-top"
        />{' '}
        The Warehouse Gym
    
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-grow-1 justify-content-around">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Price</Nav.Link>
          <Nav.Link href="#">Contact Us</Nav.Link>
          <Nav.Link href="#">Hello,Sign In</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
  );
}
