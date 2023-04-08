import React from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";

function ProfilePage() {
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Profile"}>
        <h1>Profile Page of user</h1>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ProfilePage;
