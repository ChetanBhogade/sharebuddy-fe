import React, { useContext } from "react";
import DrawerToolbar from "./DrawerToolbar";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountBox,
  ExitToApp,
  PersonAdd,
  Category,
  ShoppingCart,
  ReceiptLong,
  Chat,
  Money,
  CurrencyRupee,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { GlobalContext } from "@/contexts/GlobalContext";

function AdminDrawerContent() {
  const router = useRouter();

  const { setUser } = useContext(GlobalContext);

  return (
    <div>
      <DrawerToolbar />
      <Divider />
      <List component="nav" aria-labelledby="navbar-list">
        <ListItemButton onClick={() => router.push("/profile")}>
          <ListItemIcon>
            <AccountBox style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton onClick={() => router.push("/products")}>
          <ListItemIcon>
            <Category style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton onClick={() => router.push("/wallet")}>
          <ListItemIcon>
            <CurrencyRupee style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItemButton>

        <ListItemButton onClick={() => router.push("/quotes")}>
          <ListItemIcon>
            <ReceiptLong style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Quotes" />
        </ListItemButton>

        <ListItemButton onClick={() => router.push("/chat")}>
          <ListItemIcon>
            <Chat style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => {
            setUser(null);
            localStorage.removeItem("sharebuddyToken");
            router.push("/login");
          }}
        >
          <ListItemIcon>
            <ExitToApp style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItemButton>
      </List>
    </div>
  );
}

export default AdminDrawerContent;
