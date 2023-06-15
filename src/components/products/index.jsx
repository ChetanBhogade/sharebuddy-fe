import { useContext, useEffect, useState } from "react";
import Moment from "moment";
import { DataGrid, GridMoreVertIcon } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import PageLayout from "../common/PageLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GlobalContext } from "@/contexts/GlobalContext";
import { getErrorMessage } from "@/utils/commonFunctions";
import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Rating,
  Stack,
} from "@mui/material";
import {
  addProducts,
  getMyProducts,
  removeProduct,
  updateProduct,
} from "@/services/products";
import style from "./product.module.scss";
import ProductsForm from "./productsForm";
import { backendMediaAPI } from "@/constants/BaseUrls";
import DeleteDialog from "../common/DeleteDialog";

export default function ProductsPage() {
  const { setSnackbar, setIsBackdropLoading } = useContext(GlobalContext);

  const queryClient = useQueryClient();

  const { data: allUserDataResponse } = useQuery({
    queryKey: ["getMyProducts"],
    queryFn: getMyProducts,
    onError: (error) => {
      console.log("getMyProducts on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);

  console.log("allUserDataResponse", allUserDataResponse);

  const onEdit = (params) => {
    console.log("params : ", params);
    setEditData(params.row);
    setOpenEditForm(true);
  };

  const onDelete = (params) => {
    setDeleteData(params.row);
  };

  const productApiOnSucess = (data) => {
    console.log(
      "addProductDetailsMutation addProductDetails on success: ",
      data
    );
    setSnackbar({
      isOpen: true,
      message: data?.response || "Form Submitted Successfully.",
      severity: "success",
    });
    setIsBackdropLoading(false);
    queryClient.invalidateQueries({ queryKey: ["getMyProducts"] });
  };

  const productApiOnError = (error) => {
    console.log(
      "updateUserDetailsMutation addProductDetails on error: ",
      error
    );
    setSnackbar({
      isOpen: true,
      message: getErrorMessage(error),
      severity: "error",
    });
    setIsBackdropLoading(false);
  };

  const addProductDetails = useMutation({
    mutationFn: (data) => addProducts(data),
    onSuccess: productApiOnSucess,
    onError: productApiOnError,
  });

  const updateProductDetails = useMutation({
    mutationFn: (data) => updateProduct(data),
    onSuccess: productApiOnSucess,
    onError: productApiOnError,
  });

  const DeleteProductDetails = useMutation({
    mutationFn: (data) => removeProduct(data),
    onSuccess: productApiOnSucess,
    onError: productApiOnError,
  });

  const handleSubmitProduct = (e, formData, type) => {
    setIsBackdropLoading(true);
    e.preventDefault();
    setOpenAddForm(false);
    setOpenEditForm(false);
    setEditData(null);
    console.log("formData : ", formData);
    const newFormData = new FormData();
    newFormData.append("name", formData.prdName);
    newFormData.append("description", formData.description);
    newFormData.append("category", formData.category);
    newFormData.append("rent_amount", formData.price);

    console.log(newFormData);
    if (type === "Add") {
      newFormData.append("photo", formData.imageFile);
      addProductDetails.mutate(newFormData);
    } else if (type === "Edit") {
      newFormData.append("product_photo", formData.imageFile);
      newFormData.append("product_id", formData.prdId);
      updateProductDetails.mutate(newFormData);
    }
  };

  const onDeleteProduct = () => {
    setIsBackdropLoading(true);
    const newFormData = new FormData();
    newFormData.append("product_id", deleteData.product_id);
    setDeleteData(null);
    DeleteProductDetails.mutate(newFormData);
  };

  const columns = [
    {
      field: "photo",
      headerName: "Image",
      width: 90,
      renderCell: (params) => {
        return (
          <Avatar
            src={`${backendMediaAPI}${params.row.photo}`}
            alt={params.row.name}
          />
        );
      },
    },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "description",
      headerName: "Description",
      width: 130,
    },
    {
      field: "rent_amount",
      headerName: "Price",
      width: 90,
      renderCell: (params) => {
        return (
          <Stack>{parseFloat(params.row.rent_amount)}</Stack>
          // <Avatar src={`${backendMediaAPI}${params.row.photo}`} alt={params.row.name}/>
        );
      },
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
      sortable: false,
    },
    {
      field: "is_active",
      headerName: "Is Active",
      width: 90,
      type: "boolean",
      sortable: false,
    },
    {
      field: "created_date",
      headerName: "Created Date",
      width: 120,
      renderCell: (params) => {
        return (
          <Stack>
            {Moment(params.row.created_date, "YYYY-MM-DDTHH:mm:ss").format(
              "DD-MMM-YYYY"
            )}
          </Stack>
        );
      },
    },
    {
      field: "updated_date",
      headerName: "Updated Data",
      width: 120,
      renderCell: (params) => {
        return (
          <Stack>
            {Moment(params.row.updated_date, "YYYY-MM-DDTHH:mm:ss").format(
              "DD-MMM-YYYY"
            )}
          </Stack>
        );
      },
    },
    {
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => onEdit(params)}>
              <Edit titleAccess="Edit" />
            </IconButton>
            <IconButton onClick={() => onDelete(params)}>
              <Delete titleAccess="Delete" htmlColor={"rgb(255, 86, 48)"} />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Products"}>
        <div className={style.buttonWrap}>
          <Button
            variant="contained"
            className={style.addNewBtn}
            onClick={() => setOpenAddForm(true)}
          >
            + Add New
          </Button>
        </div>
        <Paper>
          <div className={style.gridLayout}>
            <DataGrid
              getRowId={(row) => row.product_id}
              rows={
                (typeof allUserDataResponse?.response !== "string" &&
                  allUserDataResponse?.response) ||
                []
              }
              columns={columns}
              isRowSelectable={false}
              disableColumnMenu
              components={{
                NoRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <span className={style.noDataFont}>No Data</span>
                  </Stack>
                ),
              }}
            />
          </div>
        </Paper>
        <ProductsForm
          open={openAddForm || openEditForm}
          handleClose={() => {
            setOpenAddForm(false);
            setOpenEditForm(false);
            setEditData(null);
          }}
          handleSubmit={handleSubmitProduct}
          dialogType={openAddForm ? "Add" : openEditForm ? "Edit" : ""}
          editData={editData}
        />
        <DeleteDialog
          open={deleteData !== null}
          handleClose={() => setDeleteData(null)}
          name={deleteData?.name || ""}
          onSubmit={onDeleteProduct}
        />
      </ResponsiveDrawer>
    </PageLayout>
  );
}
