export const SET_USER = 'SET_USER';

const user = {
  email: '',
};

const userReducer = (state = user, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
