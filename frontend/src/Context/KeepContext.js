import { createContext, useReducer } from "react";
import axios from "axios";
import KeepContextReducer from "./KeepContextReducer";
import {
  GET_NOTES,
  REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
  USER_PROFILE,
  USER_PROFILE_UPDATE,
  USER_SIGNUP,
} from "./Types";

const initialState = {
  data: [],
  user: JSON.parse(localStorage.getItem("keepUserInfo")) || null,
  error: null,
  loading: false,
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const KeepContext = createContext(initialState);

const KeepContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(KeepContextReducer, initialState);

  const addNote = async (title, content) => {
   try {
     dispatch({ type: REQUEST })
      const newNote = {
        title,
        content,
      };
     
     const { data } = await axios.post("/api/notes/new-note", newNote, config)
     
     dispatch({
       type: GET_NOTES,
       payload:data.data
      })
     
   } catch (error) {
    console.log(error.message)
   }
  };

  // user login

  const login = async (email, password) => {
    try {
      dispatch({
        type: REQUEST,
      });
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
      dispatch({
        type: REQUEST,
      });
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

  const getProfile = async () => {
    try {
      dispatch({
        type: REQUEST,
      });
      const { data } = await axios.get("/api/users/profile", config);
      dispatch({
        type: USER_PROFILE,
        payload: {
          name: data.name,
          email: data.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // update profile

  const updateProfile = async (email, password, name) => {
    try {
      dispatch({
        type: REQUEST,
      });
      const { data } = await axios.put(
        "/api/users/profile",
        { email, password, name },
        config
      );

      dispatch({
        type: USER_PROFILE_UPDATE,
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

  // logout

  const logout = async () => {
    try {
      // dispatch({ type: REQUEST });
      dispatch({
        type: REQUEST,
      });
      const { data } = await axios.get("/api/users/logout", config);

      dispatch({
        type: USER_LOGOUT,
      });
      localStorage.removeItem("keepUserInfo");
    } catch (error) {
      console.log("error");
    }
  };

  //  get all the notes

  const getNotes = async () => {
    try {
      dispatch({
        type: REQUEST,
      });
      const { data } = await axios.get("/api/notes", config);
      // console.log(data)
      dispatch({
        type: GET_NOTES,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // update a note

  const updateNote = async (id, { title, content, archive }) => {
    try
    {
      dispatch({type:REQUEST})
      const { data } = await axios.put(
        `/api/notes/note/${id}`,
        {
          title,
          content,
          archive,
        },
        config
      );

          dispatch({
            type: GET_NOTES,
            payload: data.data,
          });
    } catch (error)
    {
      console.log(error.message)
    }
  };


  const deleteNote = async (id) => {
    try {
      dispatch({
        type:REQUEST
      })

      const { data } = await axios.delete(`/api/notes/del-note/${ id }`, config)
       dispatch({
         type: GET_NOTES,
         payload: data.data,
       });
      
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <KeepContext.Provider
      value={{
        data: userState.data,
        user: userState.user,
        loading: userState.loading,
        addNote,
        login,
        signUp,
        logout,
        getProfile,
        updateProfile,
        getNotes,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </KeepContext.Provider>
  );
};

export default KeepContextProvider;
