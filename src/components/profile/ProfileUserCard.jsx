import { ImageUrls } from "@/constants/images";
import { IconButton, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./Profile.module.scss";
import { Delete, PersonAddAlt1, WatchLater } from "@mui/icons-material";
import { backendMediaAPI } from "@/constants/BaseUrls";

const getButtonColor = (type) => {
  switch (type) {
    case "add":
      return "primary";
    case "delete":
      return "error";
    case "pending":
      return "warning";

    default:
      return "primary";
  }
};

function ProfileUserCard({
  showDeleteBtn = false,
  elevation = 4,
  username = "Dummy User",
  handleClick,
  profileImg,
  buttonType = "add",
}) {
  const getButton = (type) => {
    switch (type) {
      case "add":
        return <PersonAddAlt1 />;
      case "delete":
        return <Delete />;
      case "pending":
        return <WatchLater />;

      default:
        return <PersonAddAlt1 />;
    }
  };
  return (
    <div>
      <Paper elevation={elevation} className={styles.profileUserCardPaper}>
        <div className={styles.nameWrapper}>
          <div className={styles.imgWrapper}>
            <Image
              src={
                profileImg
                  ? `${backendMediaAPI}${profileImg}`
                  : ImageUrls.defaultAvatar
              }
              alt="Avatar"
              width={50}
              height={50}
            />
          </div>
          <span className={styles.username}>{username}</span>
        </div>

        <div>
          <IconButton onClick={handleClick} color={getButtonColor(buttonType)}>
            {getButton(buttonType)}
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}

export default ProfileUserCard;
