import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeepContext } from "../../Context/KeepContext";
import { BodyLogin } from "../Login/LoginStyles";
import { validateEmail } from "../utils/util";
import SignUpForm from "./SignUpForm";
import { Head, Person, SignUpContainer, SignUpGrid } from "./SignupStyles";

export const SignUp = () => {
  const initialState = {
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
    isValidEmail: true,
    showPassword: false,
    isPwdMatch:true,
    
  };

  const navigate = useNavigate()
  const { signUp, user } = useContext(KeepContext);
  
  useEffect(() =>
  {
    
    if(user)navigate("/")
  },[user])

  const [details, setDetails] = useState(initialState);

  const handleChange = (prop) => (event) =>
  {
      
    setDetails({ ...details, [prop]: event.target.value });
    
    if (prop === "confirmPassword")
    {
      setDetails(prevState =>
      {
        setDetails({...prevState,isPwdMatch : prevState.confirmPassword===prevState.password})
      })
    }
    };
  

    const handleValidEmail = () => {
      setDetails((prevState) => {
        return { ...prevState, isValidEmail: validateEmail(details.email) };
      });
    };
  
  const handlePwdMatch = () =>
  {
    setDetails(prevState =>
    {
      return {
        ...prevState,
        isPwdMatch: prevState.confirmPassword === prevState.password,
      };
    })
  }

  const handleOnSubmit = (e) =>
  {
    
    e.preventDefault()

    if (!details.isValidEmail || !details.isPwdMatch)
    {
      
      return
    }
    signUp(details.email,details.password,details.name)

    setDetails(initialState)
    
  }

  
  return (
    <SignUpContainer spacing={2} direction="column" columns={1} maxWidth="lg">
      <SignUpGrid item md={12} lg={12} sm={12}>
        <Head item md={12} lg={12} sm={12}>
          <Person />
          <Typography variant="h4" gutterBottom color={"#212121"}>
            SignUp
          </Typography>
        </Head>
        <BodyLogin item md={12} lg={12} sm={12}>
          <SignUpForm
            details={details}
            setDetails={setDetails}
            handleChange={handleChange}
            handleValidEmail={handleValidEmail}
            handlePwdMatch={handlePwdMatch}
            handleOnSubmit={handleOnSubmit}
          />
        </BodyLogin>
        <Typography align="center" color={"primary"}>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </SignUpGrid>
    </SignUpContainer>
  );
};
