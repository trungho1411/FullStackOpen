import React from 'react';
import { Link } from 'react-router-dom';
import CommentBlog from './CommentBlog';

const Blog = ({ user, blog, handleLikes, handleDelete }) => {
  return (
    <>
      {blog && (
        <div className='blog'>
          {blog.title} {blog.author}
          <p>url: {blog.url}</p>
          <div>
            <p>
              likes: {blog.likes}{' '}
              <button id='like' onClick={() => handleLikes(blog)}>
                like
              </button>{' '}
            </p>
          </div>
          <div>
            <p>{blog.author}</p>
            {user.username === blog.user.username && (
              <button id='rm' onClick={() => handleDelete(blog)}>
                remove
              </button>
            )}
            <div>
              <p>Comments</p>
              <CommentBlog blog={blog} />
              <ul>
                {blog.comments.map((a, index) => (
                  <li key={index}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <Link to='/'>Home</Link>
    </>
  );
};

export default Blog;
