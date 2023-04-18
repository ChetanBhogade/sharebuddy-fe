import React from "react";
import PageLayout from "../PageLayout";
import ResponsiveDrawer from "../Drawer/ResponsiveDrawer";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { ImageUrls } from "@/constants/images";
import { Mail } from "@mui/icons-material";

function ChatPage() {
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Chat"}>
        <h2>Contact List - Chat With Your Friends</h2>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItemButton>
            <ListItem
              disableGutters
              secondaryAction={
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="notification-count-button"
                >
                  <Badge badgeContent={100} color="secondary">
                    <Mail />
                  </Badge>
                </IconButton>
              }
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={ImageUrls.defaultAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary="Chetan Bhogade"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      14 Jan 23, 8:32PM
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </ListItemButton>
          <Divider variant="inset" component="li" />
        </List>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ChatPage;
