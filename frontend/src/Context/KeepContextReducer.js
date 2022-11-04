import { ADD_NOTE } from "./Types";


const KeepContextReducer = (state, action) =>
{
     switch (action.type) {
        case ADD_NOTE:
             return {...state,data:[...state.data,action.payload]}
     
        default:
            return state
     }
    
 }

 export default KeepContextReducer;