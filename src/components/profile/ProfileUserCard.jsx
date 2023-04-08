import { ImageUrls } from "@/constants/images";
import { Button, Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./Profile.module.scss";
import { Check } from "@mui/icons-material";

function ProfileUserCard({
  isFollowing = true,
  showActionBtn = true,
  elevation = 4,
  username = "Dummy User",
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
        {showActionBtn && (
          <div>
            {isFollowing ? (
              <div className={styles.followedSection}>
                <Check />
                <span style={{ marginLeft: 5 }}>Followed</span>
              </div>
            ) : (
              <Button variant="outlined">Follow</Button>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
}

export default ProfileUserCard;
