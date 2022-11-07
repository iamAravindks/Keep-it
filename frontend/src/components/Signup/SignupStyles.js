import { Container, Grid, TextField } from "@mui/material";
import { styled } from "@mui/system";
import PersonPinIcon from "@mui/icons-material/PersonPin";


const SignUpContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  minHeight: "90vh",
  margin: "auto",
  justifyContent: "center",
    alignItems: "center",
    // background:"green"
}));

const SignUpGrid = styled(Grid)(({ theme }) => ({
  background: "#eee",
  borderRadius: "7px",
    boxShadow: "rgb(1,1,1) 0px 6px 12px -2px, rgb(1, 1, 1) 0px 3px 7px -3px",

}));

const Head = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "10px auto",
  width: "100%",
}));

const Person = styled(PersonPinIcon)(({ theme }) => ({
  fontSize: "3vw",
  margin: "15px 0",
  color: "#ffeb3b",
//   background: "black",
  borderRadius: "50%",
}));

const BodySignup= styled(Grid)(({ theme }) => ({
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

const EmailText = styled(TextField)(({ theme }) => ({}));



export {
  SignUpContainer,
  SignUpGrid,
  Head,
  Person,
  BodySignup,
  Form,
  EmailText,
};