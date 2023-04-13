import { useContext, useEffect } from "react";
import { DataGrid, GridMoreVertIcon } from "@mui/x-data-grid";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import PageLayout from "../common/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { GlobalContext } from "@/contexts/GlobalContext";
import { getErrorMessage } from "@/utils/commonFunctions";
import { Box, IconButton, Paper, Rating, Stack } from "@mui/material";
import { getAllProducts } from "@/services/products";

export default function ProductsPage() {
  const { setSnackbar } = useContext(GlobalContext);

  const { data: allUserDataResponse } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
    onError: (error) => {
      console.log("getAllProducts on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });

  console.log("allUserDataResponse", allUserDataResponse);
  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "description",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
    },
    { field: "category", headerName: "Category", width: 120 },

    {
      field: "ratings",
      headerName: "Ratings",
      width: 130,
      type: "number",
      renderCell: (params) => {
        return (
          <div>
            <Rating name="read-only" value={params.row.ratings} readOnly />
          </div>
        );
      },
    },
    {
      field: "is_available",
      headerName: "Is Available",
      width: 90,
      type: "boolean",
    },
    {
      field: "is_active",
      headerName: "Is Active",
      width: 90,
      type: "boolean",
    },
    {
      field: "created_date",
      headerName: "Created Date",
      width: 120,
    },
    {
      field: "updated_date",
      headerName: "Updated Data",
      width: 120,
    },
    {
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            // onClick={handleClick}
          >
            <GridMoreVertIcon />
          </IconButton>
        );
      },
    },
  ];

  const rows = [
    {
      product_id: "YVD8OMJDXC9",
      category: "ELECTRONIC",
      name: "boat earphones",
      description: "boat M160 model",
      price: "1000.0000",
      ratings: 2,
      is_available: true,
      is_active: true,
      created_date: "2023-04-08T12:17:46.916840Z",
      updated_date: "2023-04-08T12:17:46.919113Z",
    },
    {
      product_id: "3ICCY0XZDUS",
      category: "CLOTH",
      name: "wine frock",
      description: "wine frock with white work",
      price: "700.0000",
      ratings: 4,
      is_available: true,
      is_active: true,
      created_date: "2023-04-08T12:19:23.438946Z",
      updated_date: "2023-04-08T12:19:23.448899Z",
    },
  ];
  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Products"}>
        <Paper>
          <div style={{ height: "80vh", width: "100%", marginTop: 40 }}>
            <DataGrid
              getRowId={(row) => row.product_id}
              rows={rows}
              columns={columns}
              isRowSelectable={false}
              components={{
                NoRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <span style={{ fontSize: 20, fontWeight: 700 }}>
                      No Data
                    </span>
                  </Stack>
                ),
                NoResultsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Local filter returns no result
                  </Stack>
                ),
              }}
            />
          </div>
        </Paper>
      </ResponsiveDrawer>
    </PageLayout>
  );
}
