import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import KeepContextReducer from "./KeepContextReducer";
import { mockNotes } from "../constants/mockdata";
import { ADD_NOTE, USER_LOGIN, USER_SIGNUP } from "./Types";

const initialState = {
  data: mockNotes,
  user: JSON.parse(localStorage.getItem("keepUserInfo")) || null,
  error: null,
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const KeepContext = createContext(initialState);

const KeepContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(KeepContextReducer, initialState);

  const addNote = (title, content) => {
    const newNote = {
      id: uuid(),
      title,
      content,
    };
    dispatch({ type: ADD_NOTE, payload: newNote });
  };

  // user login

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      dispatch({
        type: USER_LOGIN,
        payload: {
          name: data?.name,
          email: data?.email,
        },
      });

      localStorage.setItem(
        "keepUserInfo",
        JSON.stringify({
          name: data?.name,
          email: data?.email,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // user login

  const signUp = async (email, password, name) => {
    try {
      const { data } = await axios.post(
        "/api/users/signup",
        { email, password, name },
        config
      );

      dispatch({
        type: USER_SIGNUP,
        payload: {
          name: data?.name,
          email: data?.email,
        },
      });

      localStorage.setItem(
        "keepUserInfo",
        JSON.stringify({
          name: data?.name,
          email: data?.email,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeepContext.Provider
      value={{
        data: userState.data,
        user: userState.user,
        addNote,
        login,
        signUp,
      }}
    >
      {children}
    </KeepContext.Provider>
  );
};

export default KeepContextProvider;
