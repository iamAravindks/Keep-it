import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { KeepContext } from "../../Context/KeepContext";
import NoNotes from "../NoNotes";
import SingleNote from './SingleNote'


const GridContainer = styled(Grid)(({ theme }) => ({
    
    padding: "3rem",
    justifyContent:"center"
}))

const AllNotes = () =>
{
  
  const { data, updateNote } = useContext(KeepContext);
  // console.log(data)
  const isNote = data.some(d => d.archive === true) || data.length === 0
  
  if (isNote)
  {
    return (
      <GridContainer container spacing={2} columnGap={3} rowGap={2}>
        <NoNotes>
          Not Note found,check the <Link to="/archive" style={{color:"#eee"}}>archives</Link>
        </NoNotes>
      </GridContainer>
    );
  }
  
  return (
    <>
    <GridContainer container spacing={2} columnGap={3} rowGap={2}>
      {data.map((note) => {
        if (note.archive) return <></>;
        return (
          <SingleNote
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            archive={note.archive}
            updateNote={updateNote}
          />
        );
      })}
      </GridContainer>
      </>
  );
}

export default AllNotes