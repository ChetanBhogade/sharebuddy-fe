import React, { useContext, useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import TransferList from "../common/TransferList";
import { AppBar, Tab, Tabs } from "@mui/material";
import TabPanel from "../common/TabPanel";
import TransactionsTable from "./TransactionsTable";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "@/services/quotes";
import { getErrorMessage } from "@/utils/commonFunctions";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function AllTransactionsPage() {
  const [sectionState, setSectionState] = useState(0);
  const { setSnackbar } = useContext(GlobalContext);

  const { data: allTransactionsResponse } = useQuery({
    queryKey: ["getAllTransactions"],
    queryFn: getAllTransactions,
    onError: (error) => {
      console.log("getAllTransactions on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("getAllTransactions: ", allTransactionsResponse);

  const handleChange = (event, newValue) => {
    setSectionState(newValue);
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Transactions"}>
        <h2>All transactions List</h2>

        {/* <AppBar
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
        </AppBar> */}

        <TransactionsTable
          transactionsList={allTransactionsResponse?.response}
          showActions={false}
        />

        {/* <TabPanel value={sectionState} index={0}>
          <TransactionsTable showActions />
        </TabPanel>
        <TabPanel value={sectionState} index={1}>
          <TransactionsTable />
        </TabPanel> */}
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default AllTransactionsPage;
