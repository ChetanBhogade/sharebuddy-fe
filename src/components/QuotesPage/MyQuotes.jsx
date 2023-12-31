import { getMyQuotes } from "@/services/quotes";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import QuotesCard from "./QuotesCard";
import { backendMediaAPI } from "@/constants/BaseUrls";
import { ImageUrls } from "@/constants/images";

function MyQuotes() {
  const { data: myQuotes } = useQuery({
    queryKey: ["getMyQuotes"],
    queryFn: getMyQuotes,
  });
  console.log("myQuotes: ", myQuotes);

  return (
    <>
      <Grid container gap={2} justifyContent="space-around">
        {myQuotes?.response && typeof myQuotes?.response !== "string" ? (
          myQuotes?.response.map((quote) => {
            return (
              <Grid
                key={quote?.quote_id}
                item
                xs={12}
                md={5.5}
                lg={3.5}
                xl={2.5}
              >
                <QuotesCard
                  customerName={quote?.customer?.full_name}
                  customerPhoto={
                    quote?.customer?.profile_photo
                      ? backendMediaAPI + quote?.customer?.profile_photo
                      : ImageUrls.defaultAvatar
                  }
                  depositAmt={quote?.deposit_amount}
                  fromDate={quote?.from_date}
                  toDate={quote?.to_date}
                  meetUpLocation={quote?.meetup_point}
                  productImage={
                    quote?.product?.photo
                      ? backendMediaAPI + quote?.product?.photo
                      : ImageUrls.product1
                  }
                  rentAmt={quote?.rent_amount}
                  productName={quote?.product?.name}
                  quotesId={quote?.quote_id}
                />
              </Grid>
            );
          })
        ) : (
          <h4>No Quotes Found</h4>
        )}
      </Grid>
    </>
  );

  //  Old UI For Quotes
  //   return (
  //     <TableContainer component={Paper}>
  //       {typeof myQuotes?.response !== "string" ? (
  //         <Table sx={{ minWidth: 1500 }} aria-label="customized table">
  //           <TableHead>
  //             <TableRow>
  //               <StyledTableCell>Product Name</StyledTableCell>
  //               <StyledTableCell align="left">Customer</StyledTableCell>
  //               <StyledTableCell align="right">Deposit</StyledTableCell>
  //               <StyledTableCell align="left">Exchange Type</StyledTableCell>
  //               <StyledTableCell align="right">Rent</StyledTableCell>
  //               <StyledTableCell align="center">Is Deposit Paid</StyledTableCell>
  //               <StyledTableCell align="center">Is Rent Paid</StyledTableCell>
  //               <StyledTableCell align="left">From Date</StyledTableCell>
  //               <StyledTableCell align="left">To Date</StyledTableCell>
  //               <StyledTableCell align="left">Meet Up Point</StyledTableCell>
  //               <StyledTableCell align="left">Remarks</StyledTableCell>
  //               <StyledTableCell align="left">Status</StyledTableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {myQuotes?.response &&
  //               myQuotes?.response?.map((quote) => {
  //                 return (
  //                   <StyledTableRow key={quote.quote_id}>
  //                     <StyledTableCell component="th" scope="row">
  //                       {quote?.product?.name}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="left">
  //                       {quote?.customer?.full_name}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="right">
  //                       {Number(quote?.deposit_amount).toFixed(2)}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="left">
  //                       {quote?.exchange_type}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="right">
  //                       {Number(quote?.rent_amount).toFixed(2)}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="center">
  //                       {quote?.exchange_type === ProductSharingTypes.DEPOSIT &&
  //                       quote?.is_deposit_paid ? (
  //                         <CheckBox />
  //                       ) : (
  //                         <Cancel />
  //                       )}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="center">
  //                       {quote?.exchange_type === ProductSharingTypes.RENT &&
  //                       quote?.is_rent_paid ? (
  //                         <CheckBox />
  //                       ) : (
  //                         <Cancel />
  //                       )}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="left">
  //                       {quote?.from_date}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="left">
  //                       {quote?.to_date}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="left">
  //                       {quote?.meetup_point}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="left">
  //                       {quote?.remarks}
  //                     </StyledTableCell>
  //                     <StyledTableCell align="left">
  //                       {QuoteStatusTypes[quote?.status]}
  //                     </StyledTableCell>
  //                   </StyledTableRow>
  //                 );
  //               })}
  //           </TableBody>
  //         </Table>
  //       ) : (
  //         <h3
  //           style={{
  //             margin: "1em",
  //           }}
  //         >
  //           {myQuotes?.response || "No Quotes Found"}
  //         </h3>
  //       )}
  //     </TableContainer>
  //   );
}

export default MyQuotes;
