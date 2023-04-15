import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import ProfileUserCard from "./ProfileUserCard";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "@/services/friends";
import { getErrorMessage } from "@/utils/commonFunctions";

function ProfileFriends() {
  const { setSnackbar } = useContext(GlobalContext);

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

  const handleRemoveFriend = (userId) => {
    console.log("removing friend with id: ", userId);
  };

  return (
    <div>
      {allFriendsData && typeof allFriendsData.response === "string" ? (
        <h4>No Pending Friend Requests</h4>
      ) : (
        <Grid container justifyContent="space-around" rowGap={2}>
          {allFriendsData?.response?.map((friend) => {
            return (
              <Grid key={friend.user_id} item xs={12} md={5} lg={3.5}>
                <ProfileUserCard
                  showDeleteBtn
                  username={friend.username}
                  profileImg={friend.profile_photo}
                  handleClick={() => {
                    handleRemoveFriend(friend.user_id);
                  }}
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
