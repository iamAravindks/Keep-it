import { createContext, useContext, useReducer } from "react";
import {v4 as uuid} from 'uuid'
import KeepContextReducer from "./KeepContextReducer";
import { mockNotes } from "../constants/mockdata";
import { ADD_NOTE } from "./Types";


const initialState = {
  data: mockNotes,
  user: null,
};
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

  return (
    <KeepContext.Provider
      value={{
        data: userState.data,
        addNote
      }}
    >
      {children}
    </KeepContext.Provider>
  );
};

export default KeepContextProvider;
