import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function ProfileForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const formSubmit = (event) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append("first_name", formData.firstName);
    newFormData.append("last_name", formData.lastName);
    newFormData.append("email", formData.email);
    newFormData.append("mobile_number", formData.mobile);
    newFormData.append("password", formData.password);
    newFormData.append("confirm_password", formData.password);

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
