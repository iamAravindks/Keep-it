import React, { useCallback, useEffect, useRef, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";



const SingleNoteGrid = styled(Grid)(({ theme }) => ({
  background: "#212121",
  maxHeight: "400px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    cursor:"pointer"
  },
  transition: theme.transitions.create("background"),
}));

function isOverflown(element)
{
  // console.log(element)
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const SingleNote = ({ id ,title, content }) =>
{

  const [overflow, setOverflow] = useState(false)
  
  const singleGridRef = useRef(null)

    const noteRef = useCallback((contentSec) =>
    {
        if (contentSec === null || singleGridRef===null) return
        contentSec.innerHTML = content
      // console.log(isOverflown(singleGridRef.current))  
      // console.log(overflow)
    }, [])
  
  
  useEffect(() =>
  {

    if (singleGridRef === null) return
    
    setOverflow(isOverflown(singleGridRef.current))
    console.log(overflow)

    
   
 },[content,overflow])



  return (
    <SingleNoteGrid
      item
      xs={12}
      md={5}
      ref={singleGridRef}
      style={{
        overflow: "hidden",
        position: "relative",
        padding: "2px",
        border: "2px solid #424242",
      }}
    >
      <Typography variant="h5" gutterBottom color={"white"} padding={"10px"}>
        {title}
      </Typography>
      <Divider />
      <div className="kit-single-note" ref={noteRef}></div>
      {overflow && <button className="kit-readmore">Read more</button>}
      
    </SingleNoteGrid>
  );
};

export default SingleNote;
