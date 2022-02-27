import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <div className='users'>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
