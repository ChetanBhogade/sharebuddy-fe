import React, { useContext } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import ProductsTable from "./ProductsTable";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/commonFunctions";
import { getAllProducts } from "@/services/products";
import { GlobalContext } from "@/contexts/GlobalContext";

function AllProductsPage() {
  const { setSnackbar, setIsBackdropLoading, user } = useContext(GlobalContext);

  const { data: allProductsList } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
    onError: (error) => {
      console.log("getAllUsers on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("allProductsList: ", allProductsList);

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"All Products"}>
        <h2>_</h2>
        <ProductsTable productsList={allProductsList?.response} />
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default AllProductsPage;
