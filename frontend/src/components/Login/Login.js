import { Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KeepContext } from "../../Context/KeepContext";
import { validateEmail } from "../utils/util";
import LoginForm from "./LoginForm";
import {
  BodyLogin,
  Head,
  LoginContainer,
  LoginGrid,
  Person,
} from "./LoginStyles";

const Login = () => {
  const { login, user } = useContext(KeepContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
      console.log("hai")
    }
  }, [user]);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
    isValidEmail: true,
  });



  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleValidEmail = () =>
  {
          setValues((prevState) => {
            return { ...prevState, isValidEmail: validateEmail(values.email) };
          });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!values.email || !values.password || !values.isValidEmail)
    {
return
    }
    login(values.email, values.password);
  };

  return (
    <LoginContainer spacing={2} direction="column" columns={1} maxWidth="lg">
      <LoginGrid item>
        <Head item md={12} lg={12} sm={12}>
          <Person />
          <Typography variant="h4" gutterBottom color={"#212121"}>
            Login
          </Typography>
        </Head>
        <BodyLogin item md={12} lg={12} sm={12}>
          <LoginForm
            values={values}
            handleChange={handleChange}
            setValues={setValues}
            handleOnSubmit={handleOnSubmit}
            handleValidEmail={handleValidEmail}
          />
        </BodyLogin>
      </LoginGrid>
    </LoginContainer>
  );
};

export default Login;
