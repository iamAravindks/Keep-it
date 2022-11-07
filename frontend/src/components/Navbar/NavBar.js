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
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeepContext } from "../../Context/KeepContext";
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
  const { logout } = useContext(KeepContext)
  const navigate = useNavigate()

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
        {[
          "Notes 🗈",
          "Reminders ⏰",
          "Archives 🗃️",
          "Profile 👤",
          "Logout ➡️",
        ].map((text, index) => {
          if (index===4) {
            return (
              <ListItem key={text}>
                <ListItemButton onClick={() => logout()}>
                  <ListItemText primary={text} />
                </ListItemButton>
                <Divider />
              </ListItem>
            );
          } else if (index === 3)
          {
             return (
               <ListItem key={text}>
                 <ListItemButton onClick={() => navigate("profile")}>
                   <ListItemText primary={text} />
                 </ListItemButton>
                 <Divider />
               </ListItem>
             );
          }

          return (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
              <Divider />
            </ListItem>
          );
        })}
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
