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
import { CheckCircleOutline, DeleteForever } from "@mui/icons-material";

function TransactionsTable({ transactionsList = [], showActions = false }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Product Name</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">From</StyledTableCell>
            <StyledTableCell align="left">To</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            {showActions && (
              <StyledTableCell align="right">Actions</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsList.map((row) => (
            <StyledTableRow key={row.updated_date}>
              <StyledTableCell align="left">
                {row.quote?.product?.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {Number(row.amount).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="left">{row.ttype}</StyledTableCell>
              <StyledTableCell align="left">
                {row.from_user?.full_name}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.to_user?.full_name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.status}</StyledTableCell>
              {showActions && (
                <StyledTableCell align="right">
                  <IconButton aria-label="complete-transaction" color="success">
                    <CheckCircleOutline />
                  </IconButton>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsTable;
