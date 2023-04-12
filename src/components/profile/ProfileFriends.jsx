import { Grid } from "@mui/material";
import React from "react";
import ProfileUserCard from "./ProfileUserCard";

function ProfileFriends() {
  return (
    <div>
      <Grid container justifyContent="space-around" rowGap={2}>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard showDeleteBtn={false} />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard showDeleteBtn={true} />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard showDeleteBtn={false} />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard showDeleteBtn={false} />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard showDeleteBtn={false} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileFriends;
