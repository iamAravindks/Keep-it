import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import Editor from "../TextEditor/Editor";
import { KeepContext } from "../../Context/KeepContext";

const SingleNoteGrid = styled(Grid)(({ theme }) => ({
  background: "#212121",
  maxHeight: "400px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    cursor: "pointer",
  },
  transition: theme.transitions.create("background"),
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

const SaveContainer = styled(Grid)(({ theme }) => ({
  // marginLeft:"auto"
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5px",
  // backgroundColor: "green",
  height: "50px",
}));

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const SingleNote = ({ id, title, content, archive }) => {
  const { updateNote, deleteNote } = useContext(KeepContext);
  const [overflow, setOverflow] = useState(false);
  const [open, setOpen] = useState(false);

  const singleGridRef = useRef(null);

  const noteRef = useCallback((contentSec) => {
    if (contentSec === null || singleGridRef === null) return;
    contentSec.innerHTML = content;
  }, []);

  useEffect(() => {
    if (singleGridRef === null) return;

    setOverflow(isOverflown(singleGridRef.current));
  }, [content, overflow]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState({
    title,
    content,
    archive,
  });

  const handleTitle = (e) =>
    setData((prevState) => {
      return { ...prevState, title: e.target.value };
    });

  const handleArchive = () => {
    console.log(archive);
    setData((prevState) => {
      return { ...prevState, archive: !prevState.archive };
    });
    updateNote(id, data);
  };

  const handleOnClick = () => {
    if (data.content.length <= 0) return;
    handleClose();
    updateNote(id, { title: data.title, content: data.content, archive });
  };
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
        backgroundColor: "#bdbdbd",
      }}
    >
      <Grid item lg={12}>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ ml: 1 }}
          onClick={handleOpen}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ ml: 1 }}
          style={{ color: data.archive === true ? "white" : "black " }}
          onClick={handleArchive}
        >
          <ArchiveIcon />
        </IconButton>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ ml: 1 }}
          onClick={() => deleteNote(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Typography variant="h5" gutterBottom color={"#212121"} padding={"10px"}>
        {title}
      </Typography>
      <Divider />
      <div className="kit-single-note" ref={noteRef}></div>
      {overflow && <button className="kit-readmore">Read more</button>}
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
              Edit
            </Button>
          </SaveContainer>
        </Box>
      </Modal>
    </SingleNoteGrid>
  );
};

export default SingleNote;
