import loginService from '../services/login';
import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    case 'INIT_USERS':
      return action.data;
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser');

    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const initializeUsers = () => {
  return async (dispatch) => {
    let user = null;
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
    }
    dispatch({
      type: 'INIT_USERS',
      data: user,
    });
  };
};

export default userReducer;
