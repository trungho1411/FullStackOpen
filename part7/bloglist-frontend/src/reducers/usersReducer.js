import usersService from '../services/users';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_USERS':
      return action.data;
    default:
      return state;
  }
};

export const showAllUser = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: 'SHOW_USERS',
      data: users,
    });
  };
};

export default usersReducer;
