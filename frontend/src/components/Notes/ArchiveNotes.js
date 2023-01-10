import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KeepContext } from "../../Context/KeepContext";
import NoNotes from "../NoNotes";
import SingleNote from "./SingleNote";

const GridContainer = styled(Grid)(({ theme }) => ({
  padding: "3rem",
  justifyContent: "center",
  // backgroundColor: "red",
  display: "flex",
  //   minHeight:"90vh"
  marginTop: "200px",
}));

const ArchiveNotes = () => {
  const { data, updateNote, getNotes } = useContext(KeepContext);
  useEffect(() => {
    getNotes();
  }, []);

  const isNote = data.filter((d) => d.archive === true) 
  
    if (isNote.length===0 || data.length===0) {
      return (
        <GridContainer container spacing={2} columnGap={3} rowGap={2}>
          <NoNotes>
            Not Note found,check the{" "}
            <Link to="/" style={{ color: "#eee" }}>
              Home
            </Link>
          </NoNotes>
        </GridContainer>
      );
    }

  return (
    <GridContainer container spacing={2} columnGap={3} rowGap={2}>
      {/* Notes */}
      {data.map((note) => {
        if (note.archive === false) return <></>;
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
  );
};

export default ArchiveNotes;
