import { ImageUrls } from "@/constants/images";
import { IconButton, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./Profile.module.scss";
import { Delete, PersonAddAlt1 } from "@mui/icons-material";

function ProfileUserCard({
  showDeleteBtn = false,
  elevation = 4,
  username = "Dummy User",
  handleClick,
}) {
  return (
    <div>
      <Paper elevation={elevation} className={styles.profileUserCardPaper}>
        <div className={styles.nameWrapper}>
          <div className={styles.imgWrapper}>
            <Image
              src={ImageUrls.defaultAvatar}
              alt="Avatar"
              width={50}
              height={50}
            />
          </div>
          <span className={styles.username}>{username}</span>
        </div>

        <div>
          <IconButton
            onClick={handleClick}
            color={showDeleteBtn ? "error" : "primary"}
          >
            {showDeleteBtn ? <Delete /> : <PersonAddAlt1 />}
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}

export default ProfileUserCard;
