import { GlobalContext } from "@/contexts/GlobalContext";
import { getInAppNotification, markNotificationAsRead } from "@/services/notifications";
import { getErrorMessage } from "@/utils/commonFunctions";
import { Notifications } from "@mui/icons-material";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

export default function NotificationsButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { setSnackbar } = useContext(GlobalContext);

  const queryClient = useQueryClient()

  const { data: notificationsData } = useQuery({
    queryKey: ["getInAppNotification"],
    queryFn: getInAppNotification,
    onError: (error) => {
      console.log("getAllProducts on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });

  console.log("notificationsData : ", notificationsData);

  const markAsRead = useMutation({
    mutationFn: (data) => markNotificationAsRead(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getInAppNotification"] });
    },
    onError: (error) => {
      console.log(
        "notification mark as read on error: ",
        error
      );
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });

  const onClickNotification=(id)=>{
    const newFormaData = new FormData();
    newFormaData.append("notification_id", id)
    markAsRead.mutate(newFormaData)
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge
          badgeContent={notificationsData?.response?.unread_count || 0}
          color="primary"
        >
          <Notifications />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography style={{ padding: "0 14px 10px 14px" }}>
          Notifications
        </Typography>
        <Divider />
        {notificationsData?.response?.data?.map((item, index) => (
          <MenuItem
            key={index}
            style={{
              whiteSpace: "normal",
              backgroundColor: item.status === "UNREAD" ? "#eeeded" : "",
            }}
            onClick={()=>onClickNotification(item.id)}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
