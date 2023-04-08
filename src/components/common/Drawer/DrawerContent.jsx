import React from "react";
import DrawerToolbar from "./DrawerToolbar";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountBox,
  Drafts,
  ExitToApp,
  Inbox,
  Send,
} from "@mui/icons-material";

function DrawerContent() {
  return (
    <div>
      <DrawerToolbar />
      <Divider />
      <List component="nav" aria-labelledby="navbar-list">
        <ListItemButton>
          <ListItemIcon>
            <AccountBox style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Send style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Sent Message" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Drafts style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Inbox style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <ExitToApp style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItemButton>
      </List>
    </div>
  );
}

export default DrawerContent;
