import { mockNotes } from "../constants/mockdata";
import { ADD_NOTE, USER_AUTH_FAIL, USER_LOGIN, USER_LOGOUT, USER_PROFILE, USER_PROFILE_UPDATE, USER_SIGNUP } from "./Types";

const initialState = { data: [], user: null };

const KeepContextReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, data: [...state.data, action.payload] };

    case USER_LOGIN:
    case USER_SIGNUP:
      return { ...state, user: action.payload, data: mockNotes };
    
    case USER_PROFILE:
    case USER_PROFILE_UPDATE:
      return {...state,user:action.payload}

    case USER_AUTH_FAIL:
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default KeepContextReducer;
