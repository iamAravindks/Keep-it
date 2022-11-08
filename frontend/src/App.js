import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Container } from "@mui/system";
import Home from "./components/Home/Home";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/Login/Login";
import PrivateRouteWrapper from "./components/privateRouteWrapper";
import { SignUp } from "./components/Signup/SignUp";
import Profile from "./components/Profile/Profile";
import Loader from "./components/Loader";
import ArchiveNotes from "./components/Notes/ArchiveNotes";




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
      <Loader/>
      <Container>
       
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<PrivateRouteWrapper />}>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/archive" element={<ArchiveNotes/>}/>
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
