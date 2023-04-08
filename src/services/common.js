import { backendAPI } from "@/constants/BaseUrls";
import axios from "axios";

export const makeGetCall = async (url) => {
  try {
    const response = await axios.get(`${backendAPI}${url}`);
    console.log("makeGetCall response: ", response);
    return response.data;
  } catch (error) {
    console.log("makeGetCall Error: ", error);
    return error;
  }
};

export const makePostCall = async (url, data = {}) => {
  try {
    const response = await axios.post(`${backendAPI}${url}`, data);
    console.log("makePostCall response: ", response);
    return response.data;
  } catch (error) {
    console.log("makePostCall Error: ", error);
    return error;
  }
};

export const makePostCallWithFormData = async (url, formData) => {
  try {
    const response = await axios.post(`${backendAPI}${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("makePostCallWithFormData response: ", response);
    return response.data;
  } catch (error) {
    console.log("makePostCallWithFormData Error: ", error);
    return error;
  }
};