import { Box, Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./Profile.module.scss";
import Image from "next/image";
import { ImageUrls } from "@/constants/images";
import { GlobalContext } from "@/contexts/GlobalContext";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ProfileHeader({ handleChange, value }) {
  const { user } = useContext(GlobalContext);

  return (
    <div>
      <Paper elevation={2} className={styles.profileHeaderPaper}>
        <div className={styles.imgWrapper}>
          <Image
            src={user?.profile_photo || ImageUrls.defaultAvatar}
            alt="Avatar"
            width={100}
            height={100}
            priority
          />
        </div>
        <span className={styles.profileHeaderUsername}>Dummy User</span>
        <Tabs value={value} onChange={handleChange} aria-label="basic-tabs">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Followers" {...a11yProps(1)} />
          <Tab label="Friends" {...a11yProps(2)} />
        </Tabs>
      </Paper>
    </div>
  );
}

export default ProfileHeader;
