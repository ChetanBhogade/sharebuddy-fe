import React, { useContext, useState } from "react";
import PageLayout from "../PageLayout";
import ResponsiveDrawer from "../Drawer/ResponsiveDrawer";
import styles from "./ChatDetailsPage.module.scss";
import { Avatar, IconButton, Paper, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import classNames from "classnames";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChatContactList,
  getMessagesList,
  sendMessageToFriend,
} from "@/services/chats";
import { getErrorMessage } from "@/utils/commonFunctions";
import { useRouter } from "next/router";
import { GlobalContext } from "@/contexts/GlobalContext";
import { ImageUrls } from "@/constants/images";
import { getUserProfile } from "@/services/auth";
import { backendMediaAPI } from "@/constants/BaseUrls";

function ChatDetailsPage() {
  const [messageText, setMessageText] = useState("");

  const router = useRouter();
  const { setSnackbar, setIsBackdropLoading, user } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const { data: friendsData } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: () => getUserProfile(router?.query?.chatId),
    enabled: router.query?.chatId?.length > 1,
    onError: (error) => {
      console.log("getUserProfile on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("friendsData: ", friendsData);

  const { data: messagesListData } = useQuery({
    queryKey: ["getMessagesList"],
    queryFn: () => getMessagesList(router?.query?.chatId),
    enabled: router.query?.chatId?.length > 1,
    onError: (error) => {
      console.log("getFriends on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
    refetchInterval: 5500,
  });
  console.log(
    "messagesListData: ",
    messagesListData,
    router.query.chatId,
    user
  );

  const sendMessageMutation = useMutation({
    mutationFn: (data) => sendMessageToFriend(data),
    onSuccess: (data) => {
      console.log("sendMessageMutation on success: ", data);
      setIsBackdropLoading(false);
      queryClient.invalidateQueries(["getMessagesList"]);
    },
    onError: (error) => {
      console.log("sendMessageMutation on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append("receiver_id", router?.query?.chatId);
    newFormData.append("message", messageText);
    sendMessageMutation.mutate(newFormData);
    setMessageText("");
    setIsBackdropLoading(true);
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Conversations"}>
        <div className={styles.userDetailsContainer}>
          <Avatar
            alt={`${friendsData?.response?.first_name} ${friendsData?.response?.last_name}`}
            src={
              friendsData?.response?.profile_photo
                ? backendMediaAPI + friendsData?.response?.profile_photo
                : ImageUrls.defaultAvatar
            }
          />
          <span>{`${friendsData?.response?.first_name} ${friendsData?.response?.last_name}`}</span>
        </div>
        <Paper elevation={2} className={styles.container}>
          <div className={styles.messagesContainer}>
            {messagesListData &&
              typeof messagesListData.response !== "string" &&
              messagesListData.response.length > 0 &&
              messagesListData.response?.map((msg) => {
                return (
                  <div
                    key={msg.created_date}
                    className={styles.msgRow}
                    style={{
                      alignItems:
                        msg.sender.user_id === user.user_id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <div
                      className={classNames(
                        styles.messageBox,
                        msg.sender.user_id === user.user_id
                          ? styles.isMe
                          : styles.isFriend
                      )}
                    >
                      <span className={styles.messageBoxText}>
                        {msg.message}
                      </span>
                      <span className={styles.messageBoxTime}>
                        {moment(msg.created_date).format("DD MMM YY, hh:mm A")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                fullWidth
                type="text"
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                }}
              />
              <IconButton color="primary" type="submit" aria-label="send">
                <Send />
              </IconButton>
            </div>
          </form>
        </Paper>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ChatDetailsPage;
