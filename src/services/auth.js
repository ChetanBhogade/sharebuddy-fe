import { makePostCallWithFormData } from "./common";

export const registerUser = (formData) => {
  return makePostCallWithFormData("register", formData);
};

export const loginUser = (formData) => {
  return makePostCallWithFormData("login", formData);
};
