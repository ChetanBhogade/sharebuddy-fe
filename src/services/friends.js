import { makeAuthGetCall, makeAuthPostCall } from "./common";

export const sendFriendRequest = (formData) => {
  return makeAuthPostCall("send_request", formData);
};

export const actionOnFriendRequest = (formData) => {
  return makeAuthPostCall("action_on_friend_request", formData);
};

export const getFriendRequests = () => {
  return makeAuthGetCall("view_friend_request");
};

export const getFriends = () => {
  return makeAuthGetCall("view_friends");
};

export const removeFriend = (formData) => {
  return makeAuthPostCall("remove_friend", formData);
};
