import React from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";

function AllProductsPage() {
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"All Products"}>
        <h2>This is All Products Page</h2>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default AllProductsPage;
