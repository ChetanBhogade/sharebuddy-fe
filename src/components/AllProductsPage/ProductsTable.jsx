import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext } from "react";
import { StyledTableCell, StyledTableRow } from "../common/StyledTable";
import { DeleteForever } from "@mui/icons-material";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDetails } from "@/services/auth";
import { getErrorMessage } from "@/utils/commonFunctions";

function ProductsTable({ productsList = [] }) {
  const { setSnackbar, setIsBackdropLoading } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const updateUserDetailsMutation = useMutation({
    mutationFn: (data) => updateUserDetails(data),
    onSuccess: (data) => {
      console.log(
        "updateUserDetailsMutation updateUserDetails on success: ",
        data
      );
      setSnackbar({
        isOpen: true,
        message: data?.response || "Form Submitted Successfully.",
        severity: "success",
      });
      setIsBackdropLoading(false);
      queryClient.invalidateQueries({ queryKey: ["getLoggedInUserDetails"] });
    },
    onError: (error) => {
      console.log(
        "updateUserDetailsMutation updateUserDetails on error: ",
        error
      );
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
      setIsBackdropLoading(false);
    },
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Product Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="right">Rent Amount</StyledTableCell>
            <StyledTableCell align="center">Rating</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsList?.map((row) => (
            <StyledTableRow key={row.product_id}>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.category}</StyledTableCell>
              <StyledTableCell align="right">
                {Number(row.rent_amount).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.average_ratings}
              </StyledTableCell>

              <StyledTableCell
                align="right"
                sx={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                {/* <IconButton aria-label="complete-transaction" color="error">
                  <DeleteForever />
                </IconButton> */}
                <IconButton
                  onClick={() => {
                    const formData = new FormData();
                    formData.append("product_id", row?.product_id);
                    updateUserDetailsMutation.mutate(formData);
                  }}
                  aria-label="complete-transaction"
                  color="error"
                >
                  <DeleteForever />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductsTable;
