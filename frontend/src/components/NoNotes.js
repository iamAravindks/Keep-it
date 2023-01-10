import React from "react";
import noNotes from "../assets/noNotes.svg";
const NoNotes = ({ children }) =>
{
    
    const style = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        flexDirection: "column",
        gap: "20px",
        color: "#eee",
        fontWeight:"semibold"
    }
  return (
    <div style={style}>
      <img src={noNotes} style={{width:"250px"}} alt="Not found" />
      <h2>{children}</h2>
    </div>
  );
};

export default NoNotes;
