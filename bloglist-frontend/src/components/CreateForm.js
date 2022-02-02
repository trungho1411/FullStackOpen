import React, { useState } from 'react';

const CreateForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = (event) => {
    event.preventDefault();
    props.createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <form id='create-blog' onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type='submit'>Create new blog</button>
      </form>
    </div>
  );
};

export default CreateForm;
