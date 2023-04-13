import SnackbarMessage from "@/components/common/SnackbarMessage/SnackbarMessage";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { createContext, useEffect, useMemo, useState } from "react";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: "success",
  });
  const [isBackdropLoading, setIsBackdropLoading] = useState(false);
  const [user, setUser] = useState(undefined);

  const router = useRouter();

  const value = useMemo(
    () => ({
      user,
      setUser,
      setSnackbar,
      setIsBackdropLoading,
      snackbar,
    }),
    [user, snackbar]
  );

  useEffect(() => {
    if (user !== undefined) {
      localStorage.setItem("sharebuddyUser", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const localUserState = JSON.parse(localStorage.getItem("sharebuddyUser"));
    const token = localStorage.getItem("sharebuddyToken");
    if (!token) {
      router.push("/login");
    }
    setUser(localUserState);
  }, []);

  return (
    <GlobalContext.Provider value={value}>
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdropLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackbarMessage
        message={snackbar.message}
        open={snackbar.isOpen}
        setOpen={(isOpen) => setSnackbar({ ...snackbar, isOpen: isOpen })}
        severity={snackbar.severity}
      />
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
