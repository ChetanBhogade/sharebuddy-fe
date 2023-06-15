import React, { useContext, useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import { Divider, Grid, TextField } from "@mui/material";
import ProfileUserCard from "../profile/ProfileUserCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/services/auth";
import { getErrorMessage, sortListOfObjects } from "@/utils/commonFunctions";
import { GlobalContext } from "@/contexts/GlobalContext";
import { removeFriend, sendFriendRequest } from "@/services/friends";

function FindFriendsPage() {
  const [searchText, setSearchText] = useState("");

  const { setSnackbar, setIsBackdropLoading, user } = useContext(GlobalContext);
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
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
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
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

  const handleRemoveFriendClick = (userId) => {
    console.log("removing friend with id: ", userId);
    const newFormData = new FormData();
    newFormData.append("friend_id", userId);

    removeFriendMutation.mutate(newFormData);
    setIsBackdropLoading(true);
  };

  const handleAddFriendClick = (selectedUserId) => {
    console.log("selected user id is: ", selectedUserId);
    setIsBackdropLoading(true);
    const newFormData = new FormData();
    newFormData.append("receiver_id", selectedUserId);
    sendFriendRequestMutation.mutate(newFormData);
    setIsBackdropLoading(true);
  };

  const filterUsers = (usersList) => {
    return usersList.filter((user) => {
      const fullName =
        user.first_name?.toLowerCase() + " " + user.last_name?.toLowerCase();
      return fullName && fullName.indexOf(searchText.toLowerCase()) > -1;
    });
  };

  const handleOnSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const getButtonType = (frdStatus) => {
    switch (frdStatus) {
      case "friends":
        return "delete";

      case "non_friends":
        return "add";

      case "pending":
        return "pending";

      default:
        return "add";
    }
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
                !userObj.is_superuser &&
                user.user_id !== userObj.user_id && (
                  <Grid key={userObj.user_id} item xs={12} md={4.8} lg={3.5}>
                    <ProfileUserCard
                      username={`${userObj.first_name} ${userObj.last_name}`}
                      profileImg={userObj.profile_photo}
                      handleClick={() => {
                        if (userObj?.friend_status === "friends") {
                          handleRemoveFriendClick(userObj?.user_id);
                        } else if (userObj?.friend_status === "non_friends") {
                          handleAddFriendClick(userObj?.user_id);
                        } else {
                          return;
                        }
                      }}
                      buttonType={getButtonType(userObj?.friend_status)}
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
