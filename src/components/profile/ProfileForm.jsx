import { Button, Grid, IconButton, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ProfileUserCard from "./ProfileUserCard";
import { PhotoCamera } from "@mui/icons-material";

function ProfileForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    dob: "",
  });

  const formSubmit = (event) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append("first_name", formData.firstName);
    newFormData.append("last_name", formData.lastName);
    newFormData.append("email", formData.email);
    newFormData.append("mobile_number", formData.mobile);

    console.log("Form submitted for update....", event, formData, newFormData);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              autoComplete="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              autoComplete="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mobile"
              label="Mobile"
              variant="outlined"
              fullWidth
              autoComplete="mobile"
              type="number"
              value={formData.mobile}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  mobile: e.target.value,
                });
              }}
            />
          </Grid>
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
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date Of Birth"
                value={formData.dob}
                format="DD/MM/YYYY"
                onChange={(newValue) =>
                  setFormData({
                    ...formData,
                    dob: newValue,
                  })
                }
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            xs={6}
            flexDirection={"row"}
            item
            container
            justifyContent="flex-start"
            alignItems="center"
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
            <span>Update Image</span>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth type="submit" color="primary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ProfileForm;
