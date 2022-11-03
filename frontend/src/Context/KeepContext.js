import { createContext, useContext, useReducer } from "react";
import KeepContextReducer from "./KeepContextReducer";
import { mockNotes } from "../constants/mockdata";
const initialState = {
  data: mockNotes,
  user: null,
};
export const KeepContext = createContext(initialState);
const KeepContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(KeepContextReducer, initialState);

  return (
    <KeepContext.Provider
      value={{
        data: userState.data,
      }}
    >
      {children}
    </KeepContext.Provider>
  );
};

export default KeepContextProvider;
