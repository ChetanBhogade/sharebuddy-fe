import { backendAPI } from "@/constants/BaseUrls";
import axios from "axios";

export const makeGetCall = async (url) => {
  try {
    const response = await axios.get(`${backendAPI}${url}`);
    console.log("makeGetCall response: ", response);
    return response.data;
  } catch (error) {
    console.log("makeGetCall Error: ", error);
    throw error;
  }
};

export const makePostCall = async (url, data = {}) => {
  try {
    const response = await axios.post(`${backendAPI}${url}`, data);
    console.log("makePostCall response: ", response);
    return response.data;
  } catch (error) {
    console.log("makePostCall Error: ", error);
    throw error;
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
    throw error;
  }
};

export const makeAuthPostCall = async (url, formData) => {
  try {
    const token = localStorage.getItem("sharebuddyToken") || "123";
    const response = await axios.post(`${backendAPI}${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("makePostCallWithFormData response: ", response);
    return response.data;
  } catch (error) {
    console.log("makePostCallWithFormData Error: ", error);
    throw error;
  }
};

export const makeAuthGetCall = async (url) => {
  try {
    const token = localStorage.getItem("sharebuddyToken") || "123";
    const response = await axios.get(`${backendAPI}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`makeAuthGetCall ${url} response: `, response);
    return response.data;
  } catch (error) {
    console.log(`makeAuthGetCall ${url} Error: `, error);
    throw error;
  }
};
