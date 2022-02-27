import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import NavigationBar from './components/NavigationBar';
import Bloglist from './components/Bloglist';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { initializeUsers, login, logout } from './reducers/userReducer';
import { showAllUser } from './reducers/usersReducer';
import SingleUser from './components/SingleUser';

const App = () => {
  const createBlogRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogsMatch = useMatch('/blogs/:id');
  const userMatch = useMatch('/users/:id');

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs());
      dispatch(showAllUser());
    }
  }, [user, dispatch]);

  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const blog = blogsMatch
    ? blogs.find((m) => m.id === blogsMatch.params.id)
    : null;

  const singleUser = userMatch
    ? users.find((m) => m.id === userMatch.params.id)
    : null;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      dispatch(login(username, password));
      event.target.username.value = '';
      event.target.password.value = '';
      dispatch(setNotification(`${username} logged in `, 5000));
      navigate('/');
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5000));
      setTimeout(() => {
        setNotification(null);
      }, 7000);
    }
  };

  const handleLikes = async (blog) => {
    dispatch(likeBlog(blog));
    dispatch(setNotification('liked', 5000));
    if (user !== null) {
      dispatch(initializeBlogs());
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Blog removed ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      dispatch(setNotification(`Deleted ${blog.title}`, 5000));
      navigate('/');
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

  if (user === null) {
    return (
      <div>
        <h2> Log in to application</h2>
        <Notification messageClass='error' />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className='container'>
      <NavigationBar user={user} handleLogout={handleLogout} />
      <h2>Blog App</h2>
      <Notification />

      <Routes>
        <Route
          path='blogs/:id'
          element={
            <Blog
              user={user}
              blog={blog}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path='/'
          element={<Bloglist blogs={blogs} createBlogRef={createBlogRef} />}
        />
        <Route
          path='/login'
          element={<LoginForm handleLogin={handleLogin} />}
        />

        <Route path='/users' element={<Users users={users} />} />
        <Route path='/users/:id' element={<SingleUser user={singleUser} />} />
      </Routes>
    </div>
  );
};

export default App;
