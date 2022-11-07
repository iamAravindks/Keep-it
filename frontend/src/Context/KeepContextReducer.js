import { ADD_NOTE, USER_AUTH_FAIL, USER_LOGIN, USER_SIGNUP } from "./Types";

const initialState = { data: [], user: null };

const KeepContextReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, data: [...state.data, action.payload] };

    case USER_LOGIN:
    case USER_SIGNUP:
      return { ...state, user: action.payload };

    case USER_AUTH_FAIL:
      return initialState;
    default:
      return state;
  }
};

export default KeepContextReducer;
