import React from 'react';
import { Navbar, Nav}  from 'react-bootstrap';

import classes from "./NavBar.module.css";

//Nav Bar Class From React bootstrap
//Edited Background Color
//Responise Design, Collapseable
const NavBar = ( props ) => (
  <Navbar className={classes.NavBar} collapseOnSelect expand="md" variant="dark">
    <Navbar.Brand href="#home">Weather App</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link className={classes.NavLink} href="#Home">Home</Nav.Link>
        <Nav.Link className={classes.NavLink} href="#Login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar;
