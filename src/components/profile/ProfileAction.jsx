import { Grid } from "@mui/material";
import React from "react";
import ProfileUserCard from "./ProfileUserCard";
import UserCard from "../common/UserCard";

function ProfileAction() {
  return (
    <div>
      <Grid container justifyContent="space-around" rowGap={2} columnGap={1}>
        <Grid item xs={12} md={5.5}>
          <UserCard username={"New User 2"} />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <UserCard username={"New User 2"} />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileAction;
