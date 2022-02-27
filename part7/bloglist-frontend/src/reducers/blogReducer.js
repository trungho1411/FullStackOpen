import blogService from '../services/blogs';

export const likeBlog = (data) => {
  return async (dispatch) => {
    const blog = blogService.update({ ...data, likes: data.likes + 1 });
    dispatch({
      type: 'LIKE',
      data: blog,
    });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: 'CREATE_BLOGS',
      data: newBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch({
      type: 'DELETE',
      data: blog,
    });
  };
};

export const commentBlog = (blog, data) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(blog, data);
    dispatch({
      type: 'COMMENT',
      data: commentedBlog,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BLOGS':
      return [...state, action.data];
    case 'LIKE':
      return state.map((m) => (m.id === action.data.id ? action.data : m));
    case 'INIT_BLOGS':
      return action.data;
    case 'DELETE':
      return state.filter((m) => m.id !== action.data.id);
    case 'COMMENT':
      return state.map((m) => (m.id === action.data.id ? action.data : m));
    default:
      return state;
  }
};

export default blogReducer;
