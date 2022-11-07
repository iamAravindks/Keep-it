import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React from 'react'
import { EmailText, Form } from "./SignupStyles"

const SignUpForm = ({
  details,
  setDetails,
  handleChange,
  handleValidEmail,
  handlePwdMatch,
  handleOnSubmit,
}) => {
  const handleClickShowPassword = () => {
    setDetails({
      ...details,
      showPassword: !details.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        required
        value={details.name}
        onChange={handleChange("name")}
        sx={{ m: 1, width: "28ch" }}
      />
      <EmailText
        error={!details.isValidEmail}
        id="outlined-error-helper-text"
        label="Email"
        type={"email"}
        helperText={details.isValidEmail === false ? "Invalid email" : ""}
        required
        sx={{ m: 1, width: "28ch" }}
        value={details.email}
        onChange={handleChange("email")}
        onBlur={() => handleValidEmail()}
      />

      <FormControl sx={{ m: 1, width: "28ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                {details.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          required
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
          required
          error={!details.isPwdMatch}
          helperText={details.isPwdMatch ? "" : "Password do not match"}
          onBlur={handlePwdMatch}
        />
      </FormControl>

      <input
        type="submit"
        value="Sign up"
        style={{
          border: "none",
          borderRadius: "7px",
          background: "#ffeb3b",
          color: "",
          width: "120px",
          outline: "none",
          height: "30px",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      />
    </Form>
  );
};

export default SignUpForm