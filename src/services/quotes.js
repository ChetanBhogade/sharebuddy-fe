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

export const updateQuotesExchangeStatus = (formData) => {
  return makeAuthPostCall("update_exchange_status", formData);
};

export const updateQuotesReturnStatus = (formData) => {
  return makeAuthPostCall("update_return_status", formData);
};

export const updateQuoteUserRatings = (formData) => {
  return makeAuthPostCall("update_user_ratings", formData);
};

export const updateQuoteProductRatings = (formData) => {
  return makeAuthPostCall("update_product_ratings", formData);
};
