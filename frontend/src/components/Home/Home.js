import { Divider, Grid, styled } from "@mui/material";
import React, { useContext, useEffect } from 'react'
import { KeepContext } from "../../Context/KeepContext";
import NoNotes from "../NoNotes";
import AllNotes from "../Notes/AllNotes";
import TextBox from "../TextEditor/TextBox";

const GridContainer = styled(Grid)(({ theme }) => ({
  // backgroundColor: "#424242",
  minHeight: "90vh",
  margin: 0,
  marginTop: "30px",
}));



const Home = () =>
{
  
    const { getNotes } = useContext(KeepContext);

    useEffect(() => {
      getNotes();
    }, []);
  
  return (
    <GridContainer
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      padding={2}
    >
      <TextBox />
      <Divider />
      
      <AllNotes />
    </GridContainer>
  );
}

export default Home