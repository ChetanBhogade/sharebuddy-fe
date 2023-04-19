import { makeAuthGetCall, makeAuthPostCall } from "./common";

export const getInAppNotification = () => {
  return makeAuthGetCall("get_in_app_notifications");
};

export const markNotificationAsRead = (formata) => {
  return makeAuthPostCall("mark_notification_as_read", formata);
};
