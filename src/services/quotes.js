import { makeAuthPostCall } from "./common";

export const placeQuote = (formData) => {
  return makeAuthPostCall("place_quote", formData);
};
