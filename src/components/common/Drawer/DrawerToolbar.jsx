import { ImageUrls } from "@/constants/images";
import { Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import styles from "./ResponsiveDrawer.module.scss";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { getUserWallet } from "@/services/auth";
import { getErrorMessage } from "@/utils/commonFunctions";

function DrawerToolbar() {
  const theme = useTheme();

  const { user, setSnackbar } = useContext(GlobalContext);

  // Pending for tomorrow
  const { data: walletData } = useQuery({
    queryKey: ["getUserWallet"],
    queryFn: getUserWallet,
    onError: (error) => {
      console.log("getAllProducts on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 20,
  });
  console.log("walletData: ", walletData);

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
        <Typography variant="subtitle2" sx={{ fontWeight: "700" }} noWrap>
          {`Wallet Balance: - ₹ ${walletData?.response || 0}`}
        </Typography>
      </div>
    </div>
  );
}

export default DrawerToolbar;
