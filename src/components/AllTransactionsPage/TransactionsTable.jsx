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

function TransactionsTable({
  transactionsList = [{ csdvf: "ds  " }],
  showActions = false,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Quote Name</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            {showActions && (
              <StyledTableCell align="right">Actions</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsList.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
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
