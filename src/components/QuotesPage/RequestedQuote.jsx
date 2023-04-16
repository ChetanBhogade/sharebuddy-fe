import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext } from "react";
import { StyledTableCell, StyledTableRow } from "../common/StyledTable";
import { useQuery } from "@tanstack/react-query";
import { getFriendsQuotes } from "@/services/quotes";
import { GlobalContext } from "@/contexts/GlobalContext";
import { Cancel, CheckBox } from "@mui/icons-material";
import { ProductSharingTypes, QuoteStatusTypes } from "@/constants/common";

function RequestedQuote() {
  const { user, setIsBackdropLoading, setSnackbar } = useContext(GlobalContext);

  const { data: friendsQuotes } = useQuery({
    queryKey: ["getFriendsQuotes"],
    queryFn: getFriendsQuotes,
  });
  console.log("friendsQuotes: ", friendsQuotes, user?.user_id);

  return (
    <TableContainer component={Paper}>
      {typeof friendsQuotes?.response !== "string" ? (
        <Table sx={{ minWidth: 1500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="left">Customer</StyledTableCell>
              <StyledTableCell align="right">Deposit</StyledTableCell>
              <StyledTableCell align="left">Exchange Type</StyledTableCell>
              <StyledTableCell align="right">Rent</StyledTableCell>
              <StyledTableCell align="center">Is Deposit Paid</StyledTableCell>
              <StyledTableCell align="center">Is Rent Paid</StyledTableCell>
              <StyledTableCell align="left">From Date</StyledTableCell>
              <StyledTableCell align="left">To Date</StyledTableCell>
              <StyledTableCell align="left">Meet Up Point</StyledTableCell>
              <StyledTableCell align="left">Remarks</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {friendsQuotes?.response &&
              friendsQuotes?.response?.map((quote) => {
                return (
                  <StyledTableRow key={quote.quote_id}>
                    <StyledTableCell component="th" scope="row">
                      {quote?.product?.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {quote?.customer?.full_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Number(quote?.deposit_amount).toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {quote?.exchange_type}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {Number(quote?.rent_amount).toFixed(2)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {quote?.exchange_type === ProductSharingTypes.DEPOSIT &&
                      quote?.is_deposit_paid ? (
                        <CheckBox />
                      ) : (
                        <Cancel />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {quote?.exchange_type === ProductSharingTypes.RENT &&
                      quote?.is_rent_paid ? (
                        <CheckBox />
                      ) : (
                        <Cancel />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {quote?.from_date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {quote?.to_date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {quote?.meetup_point}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {quote?.remarks}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {QuoteStatusTypes[quote?.status]}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <h3
          style={{
            margin: "1em",
          }}
        >
          {friendsQuotes?.response || "No Quotes Found"}
        </h3>
      )}
    </TableContainer>
  );
}

export default RequestedQuote;
