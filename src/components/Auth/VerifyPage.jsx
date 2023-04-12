import React, { useContext, useEffect, useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import Link from "next/link";
import {
  sendEmailOtp,
  sendSmsOtp,
  verifyEmailOtp,
  verifySmsOtp,
} from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/commonFunctions";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useRouter } from "next/router";

function VerifyPage() {
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  const { setIsBackdropLoading, setSnackbar, user } = useContext(GlobalContext);
  const router = useRouter();

  if (isEmailVerified && isMobileVerified) {
    router.push("/");
  }

  const verifyEmailMutation = useMutation({
    mutationFn: (data) => verifyEmailOtp(data),
    onSuccess: (data) => {
      console.log("verifyEmailMutation verifyEmailOtp on success: ", data);
      setIsBackdropLoading(false);
      if (data.code === 200) {
        setSnackbar({
          isOpen: true,
          message: data?.response,
          severity: "success",
        });
        setIsEmailVerified(true);
      }
    },
    onError: (error) => {
      console.log("verifyEmailMutation verifyEmailOtp on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const verifyMobileMutation = useMutation({
    mutationFn: (data) => verifySmsOtp(data),
    onSuccess: (data) => {
      console.log("verifyMobileMutation verifySmsOtp on success: ", data);
      setIsBackdropLoading(false);
      if (data.code === 200) {
        setSnackbar({
          isOpen: true,
          message: data?.response,
          severity: "success",
        });
        setIsMobileVerified(true);
      }
    },
    onError: (error) => {
      console.log("verifyMobileMutation verifySmsOtp on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const resendEmailMutation = useMutation({
    mutationFn: (data) => sendEmailOtp(data),
    onSuccess: (data) => {
      console.log("resendEmailMutation sendEmailOtp on success: ", data);
      setIsBackdropLoading(false);
      if (data.code === 200) {
        setSnackbar({
          isOpen: true,
          message: data?.response,
          severity: "success",
        });
      }
    },
    onError: (error) => {
      console.log("resendEmailMutation sendEmailOtp on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const resendMobileMutation = useMutation({
    mutationFn: (data) => sendSmsOtp(data),
    onSuccess: (data) => {
      console.log("resendMobileMutation sendSmsOtp on success: ", data);
      setIsBackdropLoading(false);
      if (data.code === 200) {
        setSnackbar({
          isOpen: true,
          message: data?.response,
          severity: "success",
        });
      }
    },
    onError: (error) => {
      console.log("resendMobileMutation sendSmsOtp on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  useEffect(() => {
    if (user) {
      setIsEmailVerified(user.is_email_verified);
      setIsMobileVerified(user.is_mobile_number_verified);
    }
  }, [user]);

  return (
    <AuthWrapper>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} textAlign="center">
          <span>
            Welcome {user?.first_name}, Please Verify Email And Mobile Number
          </span>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="verifyEmail"
            label="Email OTP"
            variant="outlined"
            fullWidth
            type="text"
            disabled={isEmailVerified}
            value={emailOtp}
            onChange={(e) => {
              setEmailOtp(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={isEmailVerified || resendEmailMutation.isLoading}
            fullWidth
            variant="text"
            onClick={() => {
              const newFormData = new FormData();
              newFormData.append("email", user?.email);
              resendEmailMutation.mutate(newFormData);
            }}
          >
            {resendEmailMutation.isLoading ? <CircularProgress /> : "Resend"}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={
              isEmailVerified ||
              verifyEmailMutation.isLoading ||
              emailOtp.length < 6
            }
            fullWidth
            variant="outlined"
            onClick={() => {
              const newFormData = new FormData();
              newFormData.append("otp", emailOtp);
              verifyEmailMutation.mutate(newFormData);
            }}
          >
            {verifyEmailMutation.isLoading ? <CircularProgress /> : "Verify"}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="verifyMobile"
            label="Mobile OTP"
            variant="outlined"
            type="text"
            fullWidth
            disabled={isMobileVerified}
            value={mobileOtp}
            onChange={(e) => {
              setMobileOtp(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={isMobileVerified || resendMobileMutation.isLoading}
            fullWidth
            variant="text"
            onClick={() => {
              const newFormData = new FormData();
              newFormData.append("mobile_number", user?.mobile_number);
              resendMobileMutation.mutate(newFormData);
            }}
          >
            {resendMobileMutation.isLoading ? <CircularProgress /> : "Resend"}
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={
              isMobileVerified ||
              verifyMobileMutation.isLoading ||
              mobileOtp.length < 6
            }
            fullWidth
            variant="outlined"
            onClick={() => {
              const newFormData = new FormData();
              newFormData.append("otp", mobileOtp);
              verifyMobileMutation.mutate(newFormData);
            }}
          >
            {verifyMobileMutation.isLoading ? <CircularProgress /> : "Verify"}
          </Button>
        </Grid>

        <Grid item xs={12}>
          Not my account?
          <Link href="/login" variant="body2">
            {" Re-login"}
          </Link>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default VerifyPage;
