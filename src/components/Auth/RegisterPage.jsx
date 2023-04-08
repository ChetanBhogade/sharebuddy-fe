import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth";
import validator from "validator";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cPassword: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [errorStates, setErrorStates] = useState({
    email: "",
    mobile: "",
    password: "",
    cPassword: "",
  });

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      console.log("mutation registerUser on success: ", data);
    },
  });

  const validateForm = (formData) => {
    console.log("validating form: ", formData);
    if (
      formData &&
      formData.firstName?.length > 1 &&
      formData.lastName?.length > 1 &&
      formData.email?.length > 1 &&
      formData.password?.length > 1 &&
      formData.cPassword?.length > 1 &&
      formData.mobile?.length > 1
    ) {
      if (!validator.isMobilePhone(formData.mobile, "en-IN")) {
        setErrorStates({
          ...errorStates,
          mobile: "Please enter valid phone number",
        });
        return false;
      } else {
        setErrorStates({
          ...errorStates,
          mobile: "",
        });
      }

      if (!validator.isEmail(formData.email)) {
        setErrorStates({
          ...errorStates,
          email: "Please enter valid email address",
        });
        return false;
      } else {
        setErrorStates({
          ...errorStates,
          email: "",
        });
      }

      if (!validator.equals(formData.password, formData.cPassword)) {
        if (formData.password?.length < 8 && formData.cPassword?.length < 8) {
          setErrorStates({
            ...errorStates,
            password: "Password should be 8 characters long",
            cPassword: "Confirm Password should be 8 characters long",
          });
          return false;
        }
        setErrorStates({
          ...errorStates,
          password: "Password and Confirm Password should be same",
          cPassword: "Password and Confirm Password should be same",
        });
        return false;
      } else {
        setErrorStates({
          ...errorStates,
          password: "",
          cPassword: "",
        });
      }

      setErrorStates({
        email: "",
        mobile: "",
        password: "",
        cPassword: "",
      });
      return true;
    }
    return false;
  };

  const formSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted....", event, formData);

    if (validateForm(formData)) {
      const newFormData = new FormData();
      newFormData.append("first_name", formData.firstName);
      newFormData.append("last_name", formData.lastName);
      newFormData.append("email", formData.email);
      newFormData.append("mobile_number", formData.mobile);
      newFormData.append("password", formData.password);
      newFormData.append("confirm_password", formData.cPassword);

      mutation.mutate(newFormData);
    }
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
              required
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
              required
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
              required
              error={errorStates.mobile.length > 1}
              helperText={errorStates.mobile}
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
              required
              value={formData.email}
              error={errorStates.email.length > 1}
              helperText={errorStates.email}
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
              required
              error={errorStates.password.length > 1}
              helperText={errorStates.password}
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
            <TextField
              id="cPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              error={errorStates.cPassword.length > 1}
              helperText={errorStates.cPassword}
              value={formData.cPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  cPassword: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              // disabled={!validateForm(formData)}
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
            >
              Sign Up
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
