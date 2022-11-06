import { ADD_NOTE, USER_AUTH_FAIL, USER_LOGIN } from "./Types";

const initialState = {data:[],user:null}

const KeepContextReducer = (state, action) =>
{
     switch (action.type) {
        case ADD_NOTE:
             return {...state,data:[...state.data,action.payload]}
     
          
          case USER_LOGIN:
               
               return { ...state, user: action.payload }
          
          case USER_AUTH_FAIL:
               return initialState
        default:
            return state
     }
    
 }

 export default KeepContextReducer;