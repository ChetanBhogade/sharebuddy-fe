import React, { useContext } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "@/services/friends";
import { GlobalContext } from "@/contexts/GlobalContext";
import { backendMediaAPI } from "@/constants/BaseUrls";
import { useRouter } from "next/router";

function ChatPage() {
  const { setSnackbar } = useContext(GlobalContext);
  const router = useRouter();

  const { data: allFriendsData } = useQuery({
    queryKey: ["getFriends"],
    queryFn: getFriends,
    onError: (error) => {
      console.log("getFriends on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("allFriendsData: ", allFriendsData);

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Chat"}>
        <h2>Contact List - Chat With Your Friends</h2>
        {allFriendsData && typeof allFriendsData.response === "string" ? (
          <h4>You have no friends</h4>
        ) : (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {allFriendsData &&
              allFriendsData.response.map((friend) => {
                return (
                  <div key={friend.user_id}>
                    <ListItemButton
                      onClick={() => {
                        router.push(`/chat/${friend.user_id}`);
                      }}
                    >
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
                          <Avatar
                            alt={friend.name}
                            src={
                              friend.photo
                                ? backendMediaAPI + friend.photo
                                : ImageUrls.defaultAvatar
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={friend.name}
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
                              {
                                " — Wish I could come, but I'm out of town this…"
                              }
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                  </div>
                );
              })}
          </List>
        )}
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ChatPage;
