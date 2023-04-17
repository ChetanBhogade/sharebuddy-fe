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

export const getQuotesDetails = (quoteId) => {
  return makeAuthGetCall(`get_quote_details?quote_id=${quoteId}`);
};

export const updateQuote = (formData) => {
  return makeAuthPostCall("update_quote", formData);
};

export const approveQuote = (formData) => {
  return makeAuthPostCall("approve_quote", formData);
};

export const rejectQuote = (formData) => {
  return makeAuthPostCall("reject_quote", formData);
};
