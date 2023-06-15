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
import { Block, CheckCircleOutline, DeleteForever } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/auth";
import { GlobalContext } from "@/contexts/GlobalContext";
import { getErrorMessage } from "@/utils/commonFunctions";

function UsersTable({ usersList = [] }) {
  const { setSnackbar, setIsBackdropLoading } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: (data) => deleteUser(data),
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
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
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
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="right">Mobile</StyledTableCell>
            <StyledTableCell align="center">Rating</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersList.map((row) => (
            <StyledTableRow key={row.user_id}>
              <StyledTableCell align="left">
                {row.first_name + " " + row.last_name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="right">
                {row.mobile_number}
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
                {/* <IconButton aria-label="complete-transaction" color="warning">
                  <Block />
                </IconButton> */}
                <IconButton
                  onClick={() => {
                    const formData = new FormData();
                    formData.append("user_id", row?.user_id);
                    deleteUserMutation.mutate(formData);
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

export default UsersTable;
