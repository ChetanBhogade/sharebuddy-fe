import React, { useContext } from "react";
import PageLayout from "../common/PageLayout";
import styles from "./AuthWrapper.module.scss";
import { Avatar, Divider, Paper, Typography } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useRouter } from "next/router";

function AuthWrapper({ children }) {
  const { user } = useContext(GlobalContext);
  console.log("user on auth: ", user);

  const router = useRouter();

  if (
    user !== null &&
    user?.is_mobile_number_verified &&
    user?.is_email_verified
  ) {
    return router.push("/");
  }

  return (
    <PageLayout>
      <div>
        <div className={styles.backgroundContainer} />
        <div className={styles.pageInfo}>
          <div className={styles.newLayout}>
            <Paper elevation={5} className={styles.paper}>
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
