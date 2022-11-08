import { Grid } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";


const SingleNoteGrid = styled(Grid)(({ theme }) => ({
  background: "#212121",
  maxHeight: "400px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    cursor: "pointer",
  },
    transition: theme.transitions.create("background"),
  
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

export { SingleNoteGrid, SaveContainer };