import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { EmailText, Form } from "./LoginStyles";

const LoginForm = ({ values, handleChange, setValues, handleOnSubmit,handleValidEmail }) => {
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <EmailText
        error={!values.isValidEmail}
        id="outlined-error-helper-text"
        label="Email"
        type={"email"}
        helperText={values.isValidEmail === false ? "Invalid email" : ""}
        required
        sx={{ m: 1, width: "28ch" }}
        value={values.email}
        onChange={handleChange("email")}
        onBlur={() => handleValidEmail()}
      />

      <FormControl sx={{ m: 1, width: "28ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <input
        type="submit"
        value="Login"
        style={{
          border: "none",
          borderRadius: "7px",
          background: "#ffeb3b",
          color: "",
          width: "120px",
          outline: "none",
          height: "30px",
        }}
      />
    </Form>
  );
};

export default LoginForm;
