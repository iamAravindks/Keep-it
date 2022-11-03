import styled from "@emotion/styled";
import { Divider, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import NavBar from "./components/Navbar/NavBar";
import AllNotes from "./components/Notes/AllNotes";
import TextBox from "./components/TextEditor/TextBox";


const GridContainer = styled(Grid)(({ theme }) => ({
  // backgroundColor: "#424242",
  minHeight: "90vh",
  margin:0,
  marginTop: "30px",
  
  
}));
const App = () => {
  return (
    <div>
      <NavBar />
      <Container>
        <GridContainer
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          padding={2}
        >
          <TextBox />
          <Divider/>
          <AllNotes/>
        </GridContainer>
      </Container>
    </div>
  );
};

export default App;
