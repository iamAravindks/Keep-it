import Alert from "@mui/material/Alert";

export const AlertBox = ({ severity, children }) => {
  return <Alert severity={severity} style={{minWidth:"300px",maxWidth:"60%",margin:"20px auto"}} >{children}</Alert>;
};

AlertBox.defaultProps = {
  severity: "error",
};
