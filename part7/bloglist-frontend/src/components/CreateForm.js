import React from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const CreateForm = () => {
  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';

    dispatch(createBlog({ title, author, url }));
    dispatch(setNotification(`New blog ${title} by ${author} added`, 5000));
  };

  return (
    <div>
      <form id='create-blog' onSubmit={handleCreateBlog}>
        <div>
          TITLE
          <input name='title' />
        </div>
        <div>
          AUTHOR
          <input name='author' />
        </div>
        <div>
          URL
          <input name='url' />
        </div>
        <button type='submit'>Create new blog</button>
      </form>
    </div>
  );
};

export default CreateForm;
