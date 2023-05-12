import React, { useContext } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import QuotesTable from "./QuotesTable";
import { useQuery } from "@tanstack/react-query";
import { getAllQuotes } from "@/services/quotes";
import { getErrorMessage } from "@/utils/commonFunctions";
import { GlobalContext } from "@/contexts/GlobalContext";

function AllQuotesPage() {
  const { setSnackbar } = useContext(GlobalContext);

  const { data: allQuotesResponse } = useQuery({
    queryKey: ["getAllQuotes"],
    queryFn: getAllQuotes,
    onError: (error) => {
      console.log("getAllQuotes on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  console.log("allQuotesResponse: ", allQuotesResponse);

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"All Quotes"}>
        <h2>_</h2>
        <QuotesTable quotesList={allQuotesResponse?.response} />
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default AllQuotesPage;
