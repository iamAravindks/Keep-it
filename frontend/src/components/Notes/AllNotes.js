import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import React, { useContext } from 'react'
import { KeepContext } from "../../Context/KeepContext";
import SingleNote from './SingleNote'


const GridContainer = styled(Grid)(({ theme }) => ({
    
    padding: "3rem",
    justifyContent:"center"
}))

const AllNotes = () =>
{
  
  const { data } = useContext(KeepContext)
  return (
    <GridContainer container spacing={2} columnGap={3} rowGap={2}>
          {data.map(note => <SingleNote key={note.id} title={ note.title} content={note.content} />)}
    </GridContainer>
  );
}

export default AllNotes