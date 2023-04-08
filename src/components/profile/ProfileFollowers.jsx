import { Grid } from "@mui/material";
import React from "react";
import ProfileUserCard from "./ProfileUserCard";

function ProfileFollowers() {
  return (
    <div>
      <Grid container justifyContent="space-around" rowGap={2}>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard />
        </Grid>
        <Grid item xs={12} md={5} lg={3.5}>
          <ProfileUserCard isFollowing={false} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileFollowers;
