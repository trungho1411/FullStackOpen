import React from 'react';
import propTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id='password'
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          LOGIN
        </button>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  setUsername: propTypes.func.isRequired,
  setPassword: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
};

export default LoginForm;
