import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { KeepContext } from "../../Context/KeepContext";
import { validateEmail } from "../utils/util";
import ProfileAvatar from "./ProfileAvatar";
import {
  Form,
  PasswordGrid,
  ProfileBody,
  ProfileBottom,
  ProfileContainer,
  ProfileGrid,
  ProfileHead,
  SaveBtn,
} from "./ProfileStyles";
const Profile = () => {
  const { user, getProfile,updateProfile } = useContext(KeepContext);
  const [updateToggle, setUpdateToggle] = useState(false);

  const initialState = {
    name: user?.name,
    email: user?.email,
    password: "",
    confirmPassword: "",
    isValidEmail: true,
    showPassword: false,
    isPwdMatch: true,
  };

  const [details, setDetails] = useState(initialState);

  const handleChange = (prop) => (event) => {
    if (!updateToggle) return;
    setDetails({ ...details, [prop]: event.target.value });

    if (prop === "confirmPassword") {
      setDetails((prevState) => {
        return {
          ...prevState,
          isPwdMatch: prevState.confirmPassword === prevState.password,
        };
      });
    }
  };

  const handleValidEmail = () => {
    setDetails((prevState) => {
      return { ...prevState, isValidEmail: validateEmail(details.email) };
    });
  };

  const handlePwdMatch = () => {
    setDetails((prevState) => {
      return {
        ...prevState,
        isPwdMatch: prevState.confirmPassword === prevState.password,
      };
    });
  };

  const handleClickShowPassword = () => {
    setDetails({
      ...details,
      showPassword: !details.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    

     const handleOnSubmit = (e) => {
       e.preventDefault();

       if (!details.isValidEmail || !details.isPwdMatch) {
         return;
       }
       updateProfile(details.email, details.password, details.name);

     };
    
  useEffect(() => {
    console.log("hello");
    getProfile();
    console.log(user);
  }, []);
  return (
    <ProfileContainer spacing={2} direction="column" columns={1} maxWidth="lg">
      <ProfileGrid container spacing={2} direction={"column"}>
        <ProfileHead item lg={12} md={12} sm={12}>
          <ProfileAvatar name={`${user?.name} ${user?.email}`} />{" "}
          <Typography
            variant="h4"
            color="textPrimary"
            style={{ margin: "10px 0" }}
          >
            {user?.name}
          </Typography>
        </ProfileHead>
        <Form onSubmit={handleOnSubmit}>
          <ProfileBody
            item
            lg={12}
            md={12}
            sm={12}
            sx={{
              minHeight: updateToggle ? "400px" : "200px",
              justifyContent: updateToggle ? "space-evenly" : "space-around",
            }}
          >
            <TextField
              disabled={!updateToggle}
              id="outlined-disabled"
              label="Name"
              color="secondary"
              value={details.name}
              onChange={handleChange("name")}
            />
            <TextField
              disabled={!updateToggle}
              id="outlined-disabled"
              label="Email"
              color="secondary"
              value={details.email}
              onChange={handleChange("email")}
              onBlur={handleValidEmail}
              error={!details.isValidEmail}
              helperText={details.isValidEmail ? "" : "Invalid email"}
            />
            {updateToggle && (
              <PasswordGrid item>
                <FormControl sx={{ m: 1, width: "28ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={details.showPassword ? "text" : "password"}
                    value={details.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {details.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: "28ch" }} variant="outlined">
                  <TextField
                    id="outlined-error-helper-text"
                    type={details.showPassword ? "text" : "password"}
                    value={details.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    label="Confirm Password"
                    error={!details.isPwdMatch}
                    helperText={
                      details.isPwdMatch ? "" : "Password do not match"
                    }
                    onBlur={handlePwdMatch}
                  />
                </FormControl>
              </PasswordGrid>
            )}
          </ProfileBody>
          <ProfileBottom item lg={12} md={12} sm={12}>
            {!updateToggle ? (
              <Button
                variant="contained"
                fullWidth
                onClick={() => setUpdateToggle(true)}
              >
                Update Profile
              </Button>
            ) : (
              <>
                <SaveBtn type="submit" value="Save" />
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => setUpdateToggle(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </ProfileBottom>
        </Form>
      </ProfileGrid>
    </ProfileContainer>
  );
};

export default Profile;
