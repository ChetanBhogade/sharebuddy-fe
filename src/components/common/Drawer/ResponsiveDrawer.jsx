import React, { useState } from "react";
import styles from "./ResponsiveDrawer.module.scss";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import Footer from "../Footer";
import DrawerContent from "./DrawerContent";

function ResponsiveDrawer({ children, documentHeading, window }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            <Menu />
          </IconButton>
          <Typography variant="h5" noWrap>
            {documentHeading}
          </Typography>
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
        <Divider />
        <Footer />
      </main>
    </div>
  );
}

export default ResponsiveDrawer;