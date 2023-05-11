import React, { useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import TransferList from "../common/TransferList";
import { AppBar, Tab, Tabs } from "@mui/material";
import TabPanel from "../common/TabPanel";
import TransactionsTable from "./TransactionsTable";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function WalletPage() {
  const [sectionState, setSectionState] = useState(0);

  const handleChange = (event, newValue) => {
    setSectionState(newValue);
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Wallet"}>
        <h2>Complete your pending transactions</h2>

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
            <Tab label="Initiated Transactions" {...a11yProps(0)} />
            <Tab label="Completed Transactions" {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={sectionState} index={0}>
          <TransactionsTable showActions />
        </TabPanel>
        <TabPanel value={sectionState} index={1}>
          <TransactionsTable />
        </TabPanel>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default WalletPage;
