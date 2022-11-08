import { Typography } from "@mui/material";
import React, { useContext } from "react";
import LoaderSrc from "../assets/loader.gif";
import { KeepContext } from "../Context/KeepContext";

const Loader = () => {
  const style = {
    display: "flex",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    background: "#000",
    flexDirection: "column",
  };

  const imgStyle = {};
  const { loading } = useContext(KeepContext);

  if (!loading) return <></>;
  return (
    <div style={style}>
      <img src={LoaderSrc} style={imgStyle} alt="Loading..." />
      <Typography variant="h5" color={"#eee"}>
        Loading...
      </Typography>
    </div>
  );
};

export default Loader;
