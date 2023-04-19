import React, { useContext, useEffect, useState } from "react";
import styles from "./ResponsiveDrawer.module.scss";
import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Notifications } from "@mui/icons-material";
import Footer from "../Footer";
import DrawerContent from "./DrawerContent";
import { useRouter } from "next/router";
import { GlobalContext } from "@/contexts/GlobalContext";
import NotificationsButton from "./NotificationsButton";

function ResponsiveDrawer({ children, documentHeading, window }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useContext(GlobalContext);
  const theme = useTheme();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // commenting effect call
  // useEffect(() => {
  //   if (
  //     user === null &&
  //     !user?.is_mobile_number_verified &&
  //     !user?.is_email_verified
  //   ) {
  //     router.push("/");
  //   }
  // }, [user]);

  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar position="absolute" className={styles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h5" noWrap>
              {documentHeading}
            </Typography>
            <div className={styles.notificationWrapper}>
              <span>Notifications</span>
              <NotificationsButton />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={styles.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: styles.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerContent />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: styles.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerContent />
          </Drawer>
        </Hidden>
      </nav>
      <main className={styles.content}>
        <div className={theme.mixins.toolbar} />
        <div className={styles.contentContainer}>{children}</div>
        <Divider style={{ marginTop: 12 }} />
        <Footer />
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
