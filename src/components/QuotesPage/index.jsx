import React, { useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import { AppBar, Tab, Tabs } from "@mui/material";
import TabPanel from "../common/TabPanel";
import RequestedQuote from "./RequestedQuote";
import MyQuotes from "./MyQuotes";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function QuotesPage() {
  const [sectionState, setSectionState] = useState(0);

  const handleChange = (event, newValue) => {
    setSectionState(newValue);
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"My Quotes"}>
        <AppBar
          sx={{
            marginTop: 2,
          }}
          position="static"
        >
          <Tabs
            value={sectionState}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Requested Quotes" {...a11yProps(0)} />
            <Tab label="My Quotes" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={sectionState} index={0}>
          <RequestedQuote />
        </TabPanel>
        <TabPanel value={sectionState} index={1}>
          <MyQuotes />
        </TabPanel>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default QuotesPage;
