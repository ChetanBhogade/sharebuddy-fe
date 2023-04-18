import React, { useState } from "react";
import PageLayout from "../PageLayout";
import ResponsiveDrawer from "../Drawer/ResponsiveDrawer";
import styles from "./ChatDetailsPage.module.scss";
import { IconButton, Paper, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import classNames from "classnames";
import moment from "moment";

const isMe = false;

function ChatDetailsPage() {
  const [messageText, setMessageText] = useState("");
  const [messagesList, setMessagesList] = useState([
    {
      id: "acs",
      message: "First Message",
      time: moment("7/2/2023"),
      isMe: true,
    },
    {
      id: "acsac",
      message: "Second Message",
      time: moment("8/2/2023"),
      isMe: false,
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessagesList((oldList) => {
      return [
        ...oldList,
        {
          id: `${Math.random()}`,
          message: messageText,
          time: moment(),
          isMe: true,
        },
      ];
    });
    setMessageText("");
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Conversations"}>
        <div>
          <span>Chetan Bhogade</span>
        </div>
        <Paper elevation={2} className={styles.container}>
          <div className={styles.messagesContainer}>
            {messagesList.length > 0 &&
              messagesList.map((msg) => {
                return (
                  <div
                    key={msg.id}
                    className={styles.msgRow}
                    style={{
                      alignItems: msg.isMe ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      className={classNames(
                        styles.messageBox,
                        msg.isMe ? styles.isMe : styles.isFriend
                      )}
                    >
                      <span className={styles.messageBoxText}>
                        {msg.message}
                      </span>
                      <span className={styles.messageBoxTime}>
                        {moment(msg.time).format("DD MMM YY, hh:mm A")}
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
