import styled from "@emotion/styled";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";

const ListBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#212121",
  height: "100%",
  color: "#eee",
    width: "20ch",
    display: "flex",
  
}));

const NavBar = () => {
  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAnchor(open);
  };

  const list = (anchor) => (
    <ListBox
          
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Notes 🗈", "Reminders ⏰", "Archives 🗃️"].map((text, index) => (
          <ListItem key={text} >
            <ListItemButton>
              <ListItemText primary={text} />
                </ListItemButton>
                <Divider/>
          </ListItem>
        ))}
      </List>
    </ListBox>
  );

  return (
    <>
      <Header anchor={anchor} toggleDrawer={toggleDrawer} />
      <Drawer
        anchor={"left"}
        open={anchor}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </>
  );
};

export default NavBar;
