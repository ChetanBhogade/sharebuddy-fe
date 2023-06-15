import { Grid } from "@mui/material";
import React, { useContext } from "react";
import ProfileUserCard from "./ProfileUserCard";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriends, removeFriend } from "@/services/friends";
import { getErrorMessage } from "@/utils/commonFunctions";

function ProfileFriends() {
  const { setSnackbar, setIsBackdropLoading } = useContext(GlobalContext);
  const queryClient = useQueryClient();

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

  const removeFriendMutation = useMutation({
    mutationFn: (data) => removeFriend(data),
    onSuccess: (data) => {
      console.log("removeFriendMutation removeFriend on success: ", data);
      setSnackbar({
        isOpen: true,
        message: data?.response || "Form Submitted Successfully.",
        severity: "success",
      });
      setIsBackdropLoading(false);
      queryClient.invalidateQueries({ queryKey: ["getFriends"] });
    },
    onError: (error) => {
      console.log("removeFriendMutation removeFriend on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const handleRemoveFriend = (userId) => {
    console.log("removing friend with id: ", userId);
    const newFormData = new FormData();
    newFormData.append("friend_id", userId);

    removeFriendMutation.mutate(newFormData);
    setIsBackdropLoading(true);
  };

  return (
    <div>
      {allFriendsData && typeof allFriendsData.response === "string" ? (
        <h4>You have no friends</h4>
      ) : (
        <Grid container justifyContent="space-around" rowGap={2}>
          {allFriendsData?.response?.map((friend) => {
            return (
              <Grid key={friend.user_id} item xs={12} md={5} lg={3.5}>
                <ProfileUserCard
                  username={friend.name}
                  profileImg={friend.photo}
                  handleClick={() => {
                    handleRemoveFriend(friend.user_id);
                  }}
                  buttonType="delete"
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default ProfileFriends;
