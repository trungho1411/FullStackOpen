import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import CreateForm from './components/CreateForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const createBlogRef = useRef();

  useEffect(() => {
    if (user !== null) blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 7000);
    }
  };

  const createBlog = async (blogObject) => {
    const blog = await blogService.create(blogObject);
    setBlogs(blogs.concat({ ...blog, user: { username: user.username } }));
    setErrorMessage(`a new blog ${blog.title} by ${user.name} added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 7000);
  };

  const handleLikes = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoggout = async () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
  };

  if (user === null) {
    return (
      <div>
        <h2> Log in to application</h2>
        <Notification messageClass='error' message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h2 id='title-blog'>Blogs</h2>
      {`${user.name} logged in `}
      <button onClick={handleLoggout}>log out</button>
      <h2>Create new</h2>
      <Togglable buttonLabel='create' ref={createBlogRef}>
        <CreateForm createBlog={createBlog} />
      </Togglable>
      <Notification messageClass='success' message={errorMessage} />
      {blogs.length === 0 && <p>Add a blog</p>}
      <div className='blogs'>
        {blogs
          .sort((a, b) => a.likes - b.likes)
          .map((blog) => (
            <Blog
              user={user}
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
