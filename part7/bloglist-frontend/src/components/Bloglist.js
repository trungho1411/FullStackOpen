import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateForm from './CreateForm';
import Togglable from './Togglable';

const Bloglist = ({ blogs, createBlogRef }) => {
  return (
    <div className='blogs'>
      <h2> Blogs </h2>
      <h2>Create new</h2>
      <Togglable buttonLabel='create' ref={createBlogRef}>
        <CreateForm />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Bloglist;
