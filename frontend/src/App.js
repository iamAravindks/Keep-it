import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Home from "./components/Home/Home";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import PrivateRouteWrapper from "./components/privateRouteWrapper";
import { KeepContext } from "./Context/KeepContext";
import { SignUp } from "./components/Signup/SignUp";




const Layout = () =>
{
  return (
    <>
      <NavBar />
      <Outlet/>
    </>
  )
}

const App = () =>
{
  

  return (
    <>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<PrivateRouteWrapper />}>
                <Route index element={<Home />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
};

export default App;
