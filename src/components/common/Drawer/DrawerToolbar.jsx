import { ImageUrls } from "@/constants/images";
import { Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import styles from "./ResponsiveDrawer.module.scss";
import { GlobalContext } from "@/contexts/GlobalContext";

function DrawerToolbar() {
  const theme = useTheme();

  const { user } = useContext(GlobalContext);

  return (
    <div>
      <div className={theme.mixins.toolbar}>
        <div className={styles.logo}>
          <Image
            src={ImageUrls.logo}
            alt="ShareBuddy Logo"
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className={styles.sidebarInfo}>
        <Typography variant="h5" noWrap>
          Share Buddy
        </Typography>
        <Typography variant="subtitle1" noWrap>
          {`Welcome ${user?.first_name} ${user?.last_name}`}
        </Typography>
      </div>
    </div>
  );
}

export default DrawerToolbar;
