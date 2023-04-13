import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../common/UserCard";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "@/services/friends";
import { getErrorMessage } from "@/utils/commonFunctions";
import { backendMediaAPI } from "@/constants/BaseUrls";
import { ImageUrls } from "@/constants/images";

function ProfileAction() {
  const [requestsList, setRequestsList] = useState([]);

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

  useEffect(() => {
    if (allFriendRequests && typeof allFriendRequests.response !== "string") {
      setRequestsList(allFriendRequests.response);
    }
  }, [allFriendRequests]);

  return (
    <div>
      {requestsList.length > 1 ? (
        <Grid container justifyContent="space-around" rowGap={2} columnGap={1}>
          {requestsList.map((user) => {
            return (
              <Grid key={user.user_id} item xs={12} md={5.5}>
                <UserCard
                  username={user.full_name}
                  userId={user.user_id}
                  userImage={
                    user.profile_photo
                      ? `${backendMediaAPI}${user.profile_photo}`
                      : ImageUrls.defaultAvatar
                  }
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
