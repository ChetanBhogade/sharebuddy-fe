import { GlobalContext } from "@/contexts/GlobalContext";
import { Mail } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";

function AdminBtn() {
  const { setSnackbar, user } = useContext(GlobalContext);

  return (
    <div key={user.user_id}>
      <ListItemButton
        onClick={() => {
          router.push(`/chat/${user?.user_id}`);
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
              <Badge badgeContent={user?.unread_count} color="error">
                <Mail />
              </Badge>
            </IconButton>
          }
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar
              alt={user?.user_name}
              src={
                user?.photo
                  ? backendMediaAPI + user.photo
                  : ImageUrls.defaultAvatar
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={user?.user_name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {user?.timestamp &&
                    moment(user?.timestamp).format("DD MMM YY, h:mmA")}
                </Typography>
                {` — ${user?.last_message}`}
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </div>
  );
}

export default AdminBtn;
