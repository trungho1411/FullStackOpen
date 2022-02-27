import React from 'react';
import { Link } from 'react-router-dom';

const SingleUser = ({ user }) => {
  return (
    <>
      {user && (
        <div className='user'>
          <h2>{user.name}</h2>
          <p>
            <strong>Added blogs</strong>
          </p>
          <ul>
            {' '}
            {user.blogs.map((m) => (
              <li key={m.id}>{m.title}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to='/users'>users</Link>
    </>
  );
};

export default SingleUser;
