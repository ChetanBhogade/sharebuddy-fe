import React, { useContext, useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import { Divider, Grid, TextField } from "@mui/material";
import ProfileUserCard from "../profile/ProfileUserCard";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/auth";
import { getErrorMessage } from "@/utils/commonFunctions";
import { GlobalContext } from "@/contexts/GlobalContext";

function FindFriendsPage() {
  const [searchText, setSearchText] = useState("");

  const { setSnackbar } = useContext(GlobalContext);

  const { isLoading, allUserData } = useQuery({
    queryKey: "getAllUsers",
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
          justifyContent="space-around"
          gap={2}
        >
          <Grid item xs={12} md={4.5} lg={3.5}>
            <ProfileUserCard username="Chetan Bhogade" />
          </Grid>
          <Grid item xs={12} md={4.5} lg={3.5}>
            <ProfileUserCard />
          </Grid>
          <Grid item xs={12} md={4.5} lg={3.5}>
            <ProfileUserCard />
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default FindFriendsPage;
