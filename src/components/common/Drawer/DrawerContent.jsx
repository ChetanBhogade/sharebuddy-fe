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
  PersonAdd,
  Send,
  ShoppingCart,
} from "@mui/icons-material";
import { useRouter } from "next/router";

function DrawerContent() {
  const router = useRouter();

  return (
    <div>
      <DrawerToolbar />
      <Divider />
      <List component="nav" aria-labelledby="navbar-list">
        <ListItemButton onClick={() => router.push("/profile")}>
          <ListItemIcon>
            <AccountBox style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton onClick={() => router.push("/shop")}>
          <ListItemIcon>
            <ShoppingCart style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PersonAdd style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Find Friend" />
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
