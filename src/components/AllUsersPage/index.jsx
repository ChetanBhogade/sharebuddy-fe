import React, { useContext } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import UsersTable from "./UsersTable";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/auth";
import { getErrorMessage } from "@/utils/commonFunctions";
import { GlobalContext } from "@/contexts/GlobalContext";

function AllUsersPage() {
  const { setSnackbar, setIsBackdropLoading, user } = useContext(GlobalContext);

  const { data: allUserDataResponse } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    onError: (error) => {
      console.log("getAllUsers on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("allUserDataResponse: ", allUserDataResponse);

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"All Users"}>
        <h2>_</h2>
        <UsersTable usersList={allUserDataResponse?.response} />
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default AllUsersPage;
