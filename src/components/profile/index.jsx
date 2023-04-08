import React, { useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import ProfileHeader from "./ProfileHeader";
import TabPanel from "../common/TabPanel";
import ProfileForm from "./ProfileForm";

function ProfilePage() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Profile"}>
        <ProfileHeader handleChange={handleChange} value={tabValue} />
        <TabPanel value={tabValue} index={0}>
          <ProfileForm />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Item Three
        </TabPanel>
        {/* <h1>Profile Page of user</h1> */}
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ProfilePage;
