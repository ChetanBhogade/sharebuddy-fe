import { makeAuthGetCall, makeAuthPostCall } from "./common";

export const placeQuote = (formData) => {
  return makeAuthPostCall("place_quote", formData);
};

export const getFriendsQuotes = () => {
  return makeAuthGetCall("get_friends_quotes");
};

export const getMyQuotes = () => {
  return makeAuthGetCall("get_my_quotes");
};
