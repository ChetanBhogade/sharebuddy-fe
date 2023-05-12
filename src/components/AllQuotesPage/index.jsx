import React from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";

function AllQuotesPage() {
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"All Quotes"}>
        <h2>This is All Quotes Page</h2>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default AllQuotesPage;
