import React, { useContext, useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { Button, Grid, TextField } from "@mui/material";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/auth";
import validator from "validator";
import { GlobalContext } from "@/contexts/GlobalContext";
import { getErrorMessage } from "@/utils/commonFunctions";
import { useRouter } from "next/router";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorStates, setErrorStates] = useState({
    email: "",
    password: "",
  });

  const { setIsBackdropLoading, setSnackbar } = useContext(GlobalContext);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      console.log("mutation loginUser on success: ", data);
      if (data?.response?.refresh_token?.length > 1) {
        localStorage.setItem("sharebuddyToken", data?.response?.access_token);
        router.push("/");
      }
      setIsBackdropLoading(false);
    },
    onError: (error) => {
      console.log("mutation loginUser on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const validateForm = (formData) => {
    console.log("validating form: ", formData);
    if (
      formData &&
      formData.email?.length > 1 &&
      formData.password?.length > 1
    ) {
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

      if (formData.password?.length < 8) {
        setErrorStates({
          ...errorStates,
          password: "Password should be 8 characters long",
        });
        return false;
      } else {
        setErrorStates({
          ...errorStates,
          password: "",
        });
      }

      setErrorStates({
        email: "",
        password: "",
      });
      return true;
    }
    return false;
  };

  const formSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted....", event, formData);

    if (validateForm(formData)) {
      setIsBackdropLoading(true);
      const newFormData = new FormData();
      newFormData.append("email", formData.email);
      newFormData.append("password", formData.password);

      mutation.mutate(newFormData);
    }
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
              error={errorStates.email.length > 1}
              helperText={errorStates.email}
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
