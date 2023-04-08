import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/auth";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      console.log("mutation loginUser on success: ", data);
    },
  });

  const formSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted....", event, formData);

    const newFormData = new FormData();
    newFormData.append("username", formData.email);
    newFormData.append("password", formData.password);

    mutation.mutate(newFormData);
  };

  return (
    <AuthWrapper>
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
            <Button variant="contained" fullWidth type="submit" color="primary">
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Link href="/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthWrapper>
  );
}

export default LoginPage;
