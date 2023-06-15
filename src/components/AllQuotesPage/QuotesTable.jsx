import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "../common/StyledTable";
import { DeleteForever } from "@mui/icons-material";

function QuotesTable({ quotesList = [] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Owner Name</StyledTableCell>
            <StyledTableCell align="left">Customer Name</StyledTableCell>
            <StyledTableCell align="right">Rent Amount</StyledTableCell>
            <StyledTableCell align="center">Product Name</StyledTableCell>
            {/* <StyledTableCell align="right">Actions</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {quotesList?.map((row) => (
            <StyledTableRow key={row.quote_id}>
              <StyledTableCell align="left">
                {row.owner?.full_name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.customer?.full_name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {Number(row.rent_amount).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.product?.name}
              </StyledTableCell>

              {/* <StyledTableCell
                align="right"
                sx={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <IconButton aria-label="complete-transaction" color="error">
                  <DeleteForever />
                </IconButton>
                <IconButton aria-label="complete-transaction" color="error">
                  <DeleteForever />
                </IconButton>
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuotesTable;
