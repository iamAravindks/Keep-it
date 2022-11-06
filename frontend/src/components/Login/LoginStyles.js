import { Container, Grid, styled, TextField } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  minHeight: "90vh",
  margin: "auto",
  justifyContent: "center",
  alignItems: "center",
}));

const Head = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "10px auto",
  width: "100%",
}));

const Person = styled(AccountCircleIcon)(({ theme }) => ({
  fontSize: "3vw",
  margin: "15px 0",
  color: "#ffeb3b",
  background: "black",
  borderRadius: "50%",
}));

const BodyLogin = styled(Grid)(({ theme }) => ({
  width: "100%",
}));

const Form = styled("form")(({ theme }) => ({
  margin: "0 2vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  flexDirection: "column",
}));
const LoginGrid = styled(Grid)(({ theme }) => ({
  
  background: "#eee",
  borderRadius: "7px",
  boxShadow: "rgb(1,1,1) 0px 6px 12px -2px, rgb(1, 1, 1) 0px 3px 7px -3px",

}))
const EmailText = styled(TextField)(({ theme }) => ({}));

export { LoginContainer, Head, Person, BodyLogin, Form, EmailText,LoginGrid };
