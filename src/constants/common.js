export const FriendRequestStatus = {
  Pending: 1,
  Accept: 2,
  Reject: 3,
  Remove: 4,
};

export const ProductCategories = [
  "CLOTH",
  "ELECTRONIC",
  "FOOTWEAR",
  "ACCESSORIES",
  "STATIONARY",
];

export const ProductSharingTypes = {
  SHARE: "SHARE",
  RENT: "RENT",
  DEPOSIT: "DEPOSIT",
};

export const QuoteStatusTypes = {
  1: "PLACED",
  2: "UPDATED",
  3: "APPROVED",
  4: "REJECTED",
  5: "IN_TRANSIT",
  6: "SHARED",
  7: "COMPLETED",
};

export const notificationRedirects = {
  QUOTE: "/quotes",
  FRIEND: "/profile",
  FRIEND_REQUEST: "/profile",
  PRODUCT: "/shop",
};
