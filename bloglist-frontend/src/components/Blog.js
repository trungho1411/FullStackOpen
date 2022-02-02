import React from 'react';
import { useState } from 'react';
const Blog = ({ user, blog, handleLikes, handleDelete }) => {
  const [display, setDisplay] = useState('none');
  const [buttonLabel, setButtonLabel] = useState('show');
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const displayStyle = {
    display: display,
  };

  const handleDisplay = () => {
    if (display === 'none') {
      setDisplay('');
      setButtonLabel('hide');
    }
    if (display === '') {
      setDisplay('none');
      setButtonLabel('show');
    }
  };
  const updateLikes = () => {
    const blogObject = { ...blog, likes: likes + 1 };
    handleLikes(blog.id, blogObject);
    setLikes(likes + 1);
  };

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      handleDelete(blog.id);
  };
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleDisplay}>{buttonLabel}</button>
      <div style={displayStyle} className='blog-info'>
        <p>url: {blog.url}</p>
        <div>
          <p>
            likes: {likes}{' '}
            <button onClick={updateLikes} id='like'>
              like
            </button>{' '}
          </p>
        </div>
        <div>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button id='rm' onClick={remove}>
              remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
