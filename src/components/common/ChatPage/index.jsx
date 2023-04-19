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
import { GlobalContext } from "@/contexts/GlobalContext";
import { backendMediaAPI } from "@/constants/BaseUrls";
import { useRouter } from "next/router";
import { getChatContactList } from "@/services/chats";
import moment from "moment";
import { getErrorMessage } from "@/utils/commonFunctions";

function ChatPage() {
  const { setSnackbar } = useContext(GlobalContext);
  const router = useRouter();

  const { data: allContactList } = useQuery({
    queryKey: ["getChatContactList"],
    queryFn: getChatContactList,
    onError: (error) => {
      console.log("getFriends on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("allFriendsData: ", allContactList);

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Chat"}>
        <h2>Contact List - Chat With Your Friends</h2>
        {allContactList && typeof allContactList.response === "string" ? (
          <h4>You have no friends</h4>
        ) : (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {allContactList &&
              allContactList?.response?.map((friend) => {
                return (
                  <div key={friend.user_id}>
                    <ListItemButton
                      onClick={() => {
                        router.push(`/chat/${friend?.user_id}`);
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
                            <Badge
                              badgeContent={friend?.unread_count}
                              color="secondary"
                            >
                              <Mail />
                            </Badge>
                          </IconButton>
                        }
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={friend?.friend_name}
                            src={
                              friend?.photo
                                ? backendMediaAPI + friend.photo
                                : ImageUrls.defaultAvatar
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={friend?.friend_name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {friend?.timestamp &&
                                  moment(friend?.timestamp).format(
                                    "DD MMM YY, h:mmA"
                                  )}
                              </Typography>
                              {` — ${friend?.last_message}`}
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
