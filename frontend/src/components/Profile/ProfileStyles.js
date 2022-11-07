import { Grid} from "@mui/material";
import { Container, styled } from "@mui/system";

const ProfileContainer = styled(Container)(({ theme }) => ({
  //   background: "green",
  display: "flex",
  minHeight: "95vh",
  margin: "0",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    minHeight: "100vh",
  },
}));

const ProfileGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#eee",
  width: "750px",
  minHeight: "500px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  [theme.breakpoints.down("md")]: {
    width: "300px",
    minHeight: "400px",
  },

  translate: "(50%,-50%)",
}));

const ProfileHead = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "10px auto",
  width: "100%",
}));

const ProfileBody = styled(Grid)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  // background: "green",
  minHeight: "300px",
  padding: "2rem 0",
}));

const ProfileBottom = styled(Grid)(({ theme }) => ({
  width: "70%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
  //   background: "wheat",
  minHeight: "100px",
  padding: "0 2rem",
  margin: "auto",
}));

const Form = styled("form")(({ theme }) => ({
  margin: "0 2vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  //   padding: "2rem",
  flexDirection: "column",
  //   background:"red"
}));

const PasswordGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  //   padding: "2rem",
  flexDirection: "column",
  // background: "red",
  padding: 0,
}));

const SaveBtn = styled("input")(({ theme }) => ({
  width: "100%",
  outline: "none",
  border: "2px solid #1769aa",
  height: "40px",
  borderRadius: "4px",
  color: "#1769aa",
  textTransform: "uppercase",
  fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
  fontWeight: 500,
  fontSize: "0.875rem",
  lineHeight: 1.75,
  letterSpacing: "0.02857em",
  padding: "5px 15px",
  background: "#eee",
  cursor: "pointer",


}));

export {
  ProfileContainer,
  ProfileGrid,
  ProfileHead,
  ProfileBody,
  ProfileBottom,
  Form,
  PasswordGrid,
  SaveBtn,
};
