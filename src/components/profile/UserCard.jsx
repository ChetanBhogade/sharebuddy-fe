import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ImageUrls } from "@/constants/images";
import { FriendRequestStatus } from "@/constants/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actionOnFriendRequest } from "@/services/friends";
import { getErrorMessage } from "@/utils/commonFunctions";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/GlobalContext";

function UserCard({ userId, username, userImage, status }) {
  const { setSnackbar, setIsBackdropLoading } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const actionOnFriendRequestMutation = useMutation({
    mutationFn: (data) => actionOnFriendRequest(data),
    onSuccess: (data) => {
      console.log(
        "actionOnFriendRequestMutation actionOnFriendRequest on success: ",
        data
      );
      setIsBackdropLoading(false);
      queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
    },
    onError: (error) => {
      console.log(
        "actionOnFriendRequestMutation actionOnFriendRequest on error: ",
        error
      );
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const handleAccept = () => {
    console.log("clicked on accept button");
    const newFormData = new FormData();
    newFormData.append("sender_id", userId);
    newFormData.append("action", FriendRequestStatus.Accept);
    actionOnFriendRequestMutation.mutate(newFormData);
    setIsBackdropLoading(true);
  };

  const handleReject = () => {
    console.log("clicked on reject button");
    const newFormData = new FormData();
    newFormData.append("sender_id", userId);
    newFormData.append("action", FriendRequestStatus.Reject);
    actionOnFriendRequestMutation.mutate(newFormData);
    setIsBackdropLoading(true);
  };

  return (
    <Card
      sx={{
        padding: 1.5,
        borderRadius: 4,
        display: "flex",
        backgroundColor: "#8ff5af40",
      }}
    >
      <CardMedia
        sx={{
          height: 90,
          width: 90,
          borderRadius: 8,
          objectFit: "cover",
        }}
        image={userImage || ImageUrls.defaultAvatar}
        title={username}
      />
      <CardContent
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Typography align="center" gutterBottom variant="h5" component="span">
          {username}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          alignItems: "flex-end",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        {FriendRequestStatus.Pending === status && (
          <>
            <Button
              onClick={handleAccept}
              fullWidth
              size="small"
              variant="outlined"
              color="primary"
            >
              Accept
            </Button>
            <Button
              onClick={handleReject}
              fullWidth
              size="small"
              variant="outlined"
              color="error"
            >
              Reject
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default UserCard;
