import { createContext, useReducer } from "react";
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import KeepContextReducer from "./KeepContextReducer";
import { mockNotes } from "../constants/mockdata";
import { ADD_NOTE, USER_LOGIN } from "./Types";


const initialState = {
  data: mockNotes,
  user: JSON.parse(localStorage.getItem("keepUserInfo")) || null,
  error:null
};

const config = {
  headers: {
    "Content-Type":"application/json"
  }
}
export const KeepContext = createContext(initialState);

const KeepContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(KeepContextReducer, initialState);


  const addNote = (title, content) =>
  {
    const newNote = {
      id: uuid(),
      title,
      content
    }
    dispatch({ type: ADD_NOTE, payload: newNote })
    
  }

  // user login 

  const login = async (email, password) =>
  {
    
    try {
      const {data} = await axios.post("/api/users/login", { email, password }, config)
      
      dispatch({
        type: USER_LOGIN,
        payload: {
          name: data?.name,
          email:data?.email
        }
      })

      localStorage.setItem("keepUserInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <KeepContext.Provider
      value={{
        data: userState.data,
        user : userState.user,
        addNote,
        login
      }}
    >
      {children}
    </KeepContext.Provider>
  );
};

export default KeepContextProvider;
