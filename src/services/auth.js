import {
  makeAuthGetCall,
  makeAuthPostCall,
  makePostCallWithFormData,
} from "./common";

export const registerUser = (formData) => {
  return makePostCallWithFormData("register", formData);
};

export const loginUser = (formData) => {
  return makePostCallWithFormData("login", formData);
};

export const getLoggedInUserDetails = () => {
  return makeAuthGetCall("get_user_details");
};

export const verifySmsOtp = (formData) => {
  return makeAuthPostCall("verify_sms_otp", formData);
};

export const verifyEmailOtp = (formData) => {
  return makeAuthPostCall("verify_email_otp", formData);
};

export const sendEmailOtp = (formData) => {
  return makeAuthPostCall("send_email_otp", formData);
};

export const sendSmsOtp = (formData) => {
  return makeAuthPostCall("send_sms_otp", formData);
};

export const getAllUsers = () => {
  return makeAuthGetCall("get_all_users");
};
