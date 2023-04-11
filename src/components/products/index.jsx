import { useContext, useEffect } from "react";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import PageLayout from "../common/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/auth";
import { GlobalContext } from "@/contexts/GlobalContext";
import { getErrorMessage } from "@/utils/commonFunctions";

export default function ProductsPage() {
    const { setSnackbar } = useContext(GlobalContext);

    const { data: allUserDataResponse } = useQuery({
        queryKey: ["getAllProducts"],
        queryFn: getAllProducts,
        onError: (error) => {
          console.log("getAllProducts on error: ", error);
          setSnackbar({
            isOpen: true,
            message: getErrorMessage(error),
            severity: "error",
          });
        },
      });

      console.log('allUserDataResponse',allUserDataResponse)
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Products"}>

      </ResponsiveDrawer>
    </PageLayout>
  );
}
