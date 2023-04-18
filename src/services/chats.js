import { makeAuthGetCall, makeAuthPostCall } from "./common";

export const sendMessageToFriend = (formData) => {
  return makeAuthPostCall("message_list", formData);
};

export const getMessagesList = (userId) => {
  return makeAuthGetCall(`message_list?receiver_id=${userId}`);
};
