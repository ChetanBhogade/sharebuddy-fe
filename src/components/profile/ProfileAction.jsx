import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "@/services/friends";
import { getErrorMessage } from "@/utils/commonFunctions";
import { backendMediaAPI } from "@/constants/BaseUrls";
import { ImageUrls } from "@/constants/images";
import { GlobalContext } from "@/contexts/GlobalContext";

function ProfileAction() {
  const { setSnackbar } = useContext(GlobalContext);

  const { data: allFriendRequests } = useQuery({
    queryKey: ["getFriendRequests"],
    queryFn: getFriendRequests,
    onError: (error) => {
      console.log("getAllUsers on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("getFriendRequests: ", allFriendRequests);

  return (
    <div>
      {allFriendRequests &&
      typeof allFriendRequests.response !== "string" &&
      allFriendRequests.response.length > 0 ? (
        <Grid container justifyContent="space-around" rowGap={2} columnGap={1}>
          {allFriendRequests?.response?.map((item) => {
            return (
              <Grid key={item.sender.user_id} item xs={12} md={5.5}>
                <UserCard
                  username={item.sender.full_name}
                  userId={item.sender.user_id}
                  userImage={
                    item.sender.profile_photo
                      ? `${backendMediaAPI}${item.sender.profile_photo}`
                      : ImageUrls.defaultAvatar
                  }
                  status={item.status}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <>
          <h4>No Pending Friend Requests</h4>
        </>
      )}
    </div>
  );
}

export default ProfileAction;
