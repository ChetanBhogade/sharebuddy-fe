import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { Button, Grid, TextField } from "@mui/material";
import Link from "next/link";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const formSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted....", event, formData);
  };

  return (
    <AuthWrapper>
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
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link href="/login" variant="body2">
              {"Already have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthWrapper>
  );
}

export default RegisterPage;
