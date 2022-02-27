import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ handleLogin }) => {
  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type='text' name='username' />
          <Form.Label>Password:</Form.Label>
          <Form.Control type='text' name='password' />
          <Button variant='primary' type='submit'>
            LOGIN
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
