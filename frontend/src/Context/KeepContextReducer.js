import { mockNotes } from "../constants/mockdata";
import { ADD_NOTE, CLEAR_ERROR, GET_NOTES, REQUEST, SET_ERROR, USER_AUTH_FAIL, USER_LOGIN, USER_LOGOUT, USER_PROFILE, USER_PROFILE_UPDATE, USER_SIGNUP } from "./Types";

const initialState = { data: [], user: null, loading: false };

const KeepContextReducer = (state, action) => {
  switch (action.type)
  {
    case REQUEST:
      return {...state,loading:true}
    case ADD_NOTE:
      return { ...state, data: [...state.data, action.payload],loading:false };

    case USER_LOGIN:
    case USER_SIGNUP:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    
    case USER_PROFILE:
    case USER_PROFILE_UPDATE:
      return { ...state, user: action.payload, loading: false };

    case USER_AUTH_FAIL:
    case USER_LOGOUT:
      return initialState;
    
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    case CLEAR_ERROR:
      return {...state,error:null,loading:false}
    case GET_NOTES:
      return {...state,data:action.payload,loading:false}
    default:
      return { ...state, loading: false };
  }
};

export default KeepContextReducer;
