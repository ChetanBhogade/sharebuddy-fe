import React from "react";
import PageLayout from "../common/PageLayout";
import styles from "./AuthWrapper.module.scss";
import { Avatar, Divider, Paper, Typography } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

function AuthWrapper({ children }) {
  return (
    <PageLayout>
      <div>
        <div className={styles.backgroundContainer} />
        <div className={styles.pageInfo}>
          <div className={styles.newLayout}>
            <Paper className={styles.paper}>
              <Avatar className={styles.avatar}>
                <MeetingRoomIcon />
              </Avatar>
              <Typography align="center" component="h1" variant="h5">
                Share Buddy
              </Typography>
              <Divider variant="fullWidth" className={styles.divider} />
              {children}
            </Paper>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default AuthWrapper;
