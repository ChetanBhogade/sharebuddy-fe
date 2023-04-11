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

export const getUserAddress = () => {
  return makeAuthGetCall("get_user_address");
};

export const addUserAddress = (formData) => {
  return makeAuthPostCall("add_address", formData);
};

export const updateUserAddress = (formData) => {
  return makeAuthPostCall("update_address", formData);
};

export const getAllProducts =(formData)=>{
  return makeAuthGetCall("get_all_products", formData)
}
