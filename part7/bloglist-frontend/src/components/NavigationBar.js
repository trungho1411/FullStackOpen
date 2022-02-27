import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavigationBar = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />{' '}
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link to='/'>HOME</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/'>BLOGS</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users'>USERS</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            {user ? (
              <em>
                {user.name} logged in
                <Button onClick={handleLogout}>handleLogout</Button>
              </em>
            ) : (
              <Link to='/login'>LOGIN</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
