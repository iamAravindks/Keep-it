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
  
  const { data, updateNote } = useContext(KeepContext);
  return (
    <GridContainer container spacing={2} columnGap={3} rowGap={2}>
      {data.map((note) => (
        <SingleNote
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          archive={note.archive}
          updateNote={updateNote}
        />
      ))}
    </GridContainer>
  );
}

export default AllNotes