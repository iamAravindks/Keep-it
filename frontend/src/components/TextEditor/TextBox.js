import styled from "@emotion/styled";
import { Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import React, { useContext, useRef, useState } from "react";
import Editor from "./Editor";
import { KeepContext } from "../../Context/KeepContext";

const WrapperGrid = styled(Grid)(({ theme }) => ({
  // backgroundColor: "red",
  width: "100%",
  height: "200px",
  justifyContent: "center",
  alignItems: "center",
}));

const SaveContainer = styled(Grid)(({ theme }) => ({
  // marginLeft:"auto"
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5px",
  // backgroundColor: "green",
  height: "50px",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#e0e0e0",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 500,
};
const TextBox = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ipRef = useRef(null);

  const { addNote } = useContext(KeepContext);

  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const handleTitle = (e) =>
    setData((prevState) => {
      return { ...prevState, title: e.target.value };
    });

  const handleOnClick = () => {
    if (data.content.length <= 0) return;
    addNote(data.title, data.content);
    handleClose();
    setData({
      title: "",
      content: "",
    });
  };

  return (
    <WrapperGrid container>
      <Grid item xs={8}>
        <TextField
          fullWidth
          id="fullWidth"
          placeholder="Take a note"
          onClick={handleOpen}
          ref={ipRef}
          style={{
            background: "#424242",
          }}
        />
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            item
            style={{
              height: "90%",
            }}
          >
            <Editor data={data} setData={setData} handleTitle={handleTitle} />
          </Grid>
          <SaveContainer item style={{ justifyContent: "center" }} xs={12}>
            <Button variant="contained" onClick={handleOnClick}>
              Add to keep
            </Button>
          </SaveContainer>
        </Box>
      </Modal>
    </WrapperGrid>
  );
};

export default TextBox;
