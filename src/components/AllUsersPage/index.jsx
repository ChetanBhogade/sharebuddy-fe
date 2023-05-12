import React from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";

function AllUsersPage() {
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"All Users"}>
        <h2>This is All Users Page</h2>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default AllUsersPage;
