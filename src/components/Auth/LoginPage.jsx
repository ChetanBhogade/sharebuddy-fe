import React, { useState } from "react";
import PageLayout from "../common/PageLayout";
import styles from "./LoginPage.module.scss";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const formSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted....", event, formData);
  };

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
              <Divider variant="middle" className={styles.divider} />
              <form onSubmit={formSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      autoComplete="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        });
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      color="primary"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default LoginPage;
