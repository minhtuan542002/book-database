import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Row,
  Form,
  Button,
  Card,
  Alert,
  Col} from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/manage');
    } catch (err) {
      let errorMessage = 'Login failed';
      if (err.response) {
        // Handle Cognito-specific error codes
        switch (err.response.data.error) {
          case 'InvalidParameterException':
            errorMessage = 'Invalid email or password format';
            break;
          case 'NotAuthorizedException':
            errorMessage = 'Incorrect email or password';
            break;
          case 'UserNotFoundException':
            errorMessage = 'User does not exist';
            break;
          default:
            errorMessage = err.response.data.error || 'Login failed';
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100" style={{ maxWidth: '400px' }}>
          <Col>
            <Card className="shadow">
              <Card.Body>
                <div className="text-center mb-4">
                  {/* Add your logo here */}
                  <h2>Comic Manager Login</h2>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100" 
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> 
                        Loading...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Don't have an account? <a href="/">You aren't supposed to</a>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;