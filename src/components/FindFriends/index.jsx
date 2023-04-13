import React, { useContext, useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import { Divider, Grid, TextField } from "@mui/material";
import ProfileUserCard from "../profile/ProfileUserCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/auth";
import { getErrorMessage, sortListOfObjects } from "@/utils/commonFunctions";
import { GlobalContext } from "@/contexts/GlobalContext";
import { sendFriendRequest } from "@/services/friends";

function FindFriendsPage() {
  const [searchText, setSearchText] = useState("");

  const { setSnackbar, setIsBackdropLoading } = useContext(GlobalContext);

  const { data: allUserDataResponse } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    onError: (error) => {
      console.log("getAllUsers on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });

  const sendFriendRequestMutation = useMutation({
    mutationFn: (data) => sendFriendRequest(data),
    onSuccess: (data) => {
      console.log(
        "sendFriendRequestMutation sendFriendRequest on success: ",
        data
      );
      setIsBackdropLoading(false);
    },
    onError: (error) => {
      console.log(
        "sendFriendRequestMutation sendFriendRequest on error: ",
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

  const handleAddFriendClick = (selectedUserId) => {
    console.log("selected user id is: ", selectedUserId);
    setIsBackdropLoading(true);
    const newFormData = new FormData();
    newFormData.append("receiver_id", selectedUserId);
    sendFriendRequestMutation.mutate(newFormData);
  };

  const filterUsers = (usersList) => {
    return usersList.filter((user) => {
      const firstName = user.first_name?.toLowerCase();
      return firstName && firstName.indexOf(searchText) > -1;
    });
  };

  const handleOnSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Find Friends"}>
        <Grid container alignItems="center" sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              id="search"
              label="Search By Name"
              variant="outlined"
              type="text"
              fullWidth
              value={searchText}
              onChange={handleOnSearchTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="space-evenly"
          rowGap={2}
        >
          {allUserDataResponse &&
            filterUsers(
              sortListOfObjects(allUserDataResponse?.response, "first_name")
            ).map((userObj) => {
              return (
                !userObj.is_superuser && (
                  <Grid key={userObj.user_id} item xs={12} md={4.8} lg={3.5}>
                    <ProfileUserCard
                      username={`${userObj.first_name} ${userObj.last_name}`}
                      handleClick={() => {
                        handleAddFriendClick(userObj?.user_id);
                      }}
                    />
                  </Grid>
                )
              );
            })}
        </Grid>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default FindFriendsPage;
