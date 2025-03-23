import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const AuthNav = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="/">My Comic Database</Navbar.Brand>
        {user ? (
          <div className="d-flex align-items-center">
            <span className="text-white me-3">Welcome, {user.name}</span>
            <Button variant="outline-light" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline-light" href="/login">
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default AuthNav;