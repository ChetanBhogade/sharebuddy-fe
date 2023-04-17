import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveQuote,
  getQuotesDetails,
  rejectQuote,
  updateQuote,
} from "@/services/quotes";
import { getErrorMessage } from "@/utils/commonFunctions";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import styles from "./QuotesDetails.module.scss";
import { ImageUrls } from "@/constants/images";
import classNames from "classnames";
import { backendMediaAPI } from "@/constants/BaseUrls";
import { ProductSharingTypes, QuoteStatusTypes } from "@/constants/common";
import moment from "moment";
import DialogBox from "../common/DialogBox";

function QuotesDetails() {
  const { setSnackbar, setIsBackdropLoading, user } = useContext(GlobalContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateQuoteData, setUpdateQuoteData] = useState({
    fromDate: "",
    toDate: "",
    remarks: "",
    exchangeType: "",
    meetUp: "",
  });
  const [openConfirmationBox, setOpenConfirmationBox] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  const [confirmationRemark, setConfirmationRemark] = useState("");

  const { data: quoteDetailsData } = useQuery({
    queryKey: ["getQuotesDetails"],
    enabled: router.query?.quotesId?.length > 1,
    queryFn: () => getQuotesDetails(router.query?.quotesId),
    onError: (error) => {
      console.log("getQuotesDetails on error: ", error);
      setSnackbar({
        isOpen: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    },
  });

  // Logs for checking API and other data
  // console.log(
  //   "quoteDetailsData: ",
  //   quoteDetailsData,
  //   router.query?.quotesId,
  //   user
  // );

  const handleApiSuccess = (data) => {
    console.log("updateQuoteMutation updateQuote on success: ", data);
    setSnackbar({
      isOpen: true,
      message: data?.response || "Quote Updated Successfully.",
      severity: "success",
    });
    setIsBackdropLoading(false);
    queryClient.invalidateQueries(["getQuotesDetails"]);
  };

  const handleApiError = (error) => {
    console.log("updateQuoteMutation updateQuote on error: ", error);
    setSnackbar({
      isOpen: true,
      message: getErrorMessage(error),
      severity: "error",
    });
    setIsBackdropLoading(false);
  };

  const updateQuoteMutation = useMutation({
    mutationFn: (data) => updateQuote(data),
    onSuccess: handleApiSuccess,
    onError: handleApiError,
  });

  const approveQuoteMutation = useMutation({
    mutationFn: (data) => approveQuote(data),
    onSuccess: handleApiSuccess,
    onError: handleApiError,
  });

  const rejectQuoteMutation = useMutation({
    mutationFn: (data) => rejectQuote(data),
    onSuccess: handleApiSuccess,
    onError: handleApiError,
  });

  const handleUpdateOrder = () => {
    console.log("handle place order function called...");
    const newFormData = new FormData();
    newFormData.append("quote_id", quoteDetailsData?.response?.quote_id);
    newFormData.append("remarks", updateQuoteData.remarks);
    newFormData.append("exchange_type", updateQuoteData.exchangeType);
    newFormData.append("meetup_point", updateQuoteData.meetUp);
    newFormData.append(
      "from_date",
      moment(updateQuoteData.fromDate).format("DD/MM/YYYY")
    );
    newFormData.append(
      "to_date",
      moment(updateQuoteData.toDate).format("DD/MM/YYYY")
    );

    updateQuoteMutation.mutate(newFormData);
    setIsBackdropLoading(true);
  };

  const handleDialogSubmit = () => {
    const newFormData = new FormData();
    newFormData.append("quote_id", quoteDetailsData?.response?.quote_id);
    newFormData.append("remarks", confirmationRemark);

    if (actionStatus === "accept") {
      console.log("accept btn was called");
      approveQuoteMutation.mutate(newFormData);
    }
    if (actionStatus === "reject") {
      console.log("reject btn was called");
      rejectQuoteMutation.mutate(newFormData);
    }
    setIsBackdropLoading(true);
    setOpenConfirmationBox(false);
  };

  const showActionBtn = () => {
    if (!quoteDetailsData || !quoteDetailsData?.response) return true;

    if (user?.user_id === quoteDetailsData?.response?.customer?.user_id) {
      return !(
        quoteDetailsData?.response?.approved_by_customer ||
        quoteDetailsData?.response?.rejected_by_customer
      );
    }
    if (user?.user_id === quoteDetailsData?.response?.owner?.user_id) {
      return !(
        quoteDetailsData?.response?.approved_by_owner ||
        quoteDetailsData?.response?.rejected_by_owner
      );
    }
    return true;
  };

  useEffect(() => {
    if (quoteDetailsData && quoteDetailsData?.response) {
      setUpdateQuoteData({
        fromDate: moment(quoteDetailsData?.response?.from_date),
        toDate: moment(quoteDetailsData?.response?.to_date),
        remarks: quoteDetailsData?.response?.remarks,
        exchangeType: quoteDetailsData?.response?.exchange_type,
        meetUp: quoteDetailsData?.response?.meetup_point,
      });
    }
  }, [quoteDetailsData]);

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Quotes Details"}>
        <Grid container gap={2} marginTop={5}>
          <Grid item xs={12} md={5.8}>
            <div className={styles.prodImgWrapper}>
              <Image
                src={
                  quoteDetailsData?.response?.product?.photo
                    ? `${backendMediaAPI}${quoteDetailsData?.response?.product?.photo}`
                    : ImageUrls.product1
                }
                alt="product image"
                priority
                style={{
                  objectFit: "cover",
                }}
                fill
              />
            </div>
          </Grid>
          <Grid item xs={12} md={5.8}>
            <div className={styles.productInfoArea}>
              <Chip
                label={quoteDetailsData?.response?.product?.category}
                color="success"
                variant="outlined"
              />
              <span className={styles.productTitle}>
                {quoteDetailsData?.response?.product?.name}
              </span>
              <span className={styles.productPrice}>
                ₹ {Number(quoteDetailsData?.response?.rent_amount).toFixed(2)}
              </span>
              <Divider
                sx={{
                  width: "100%",
                  margin: "12px 0",
                }}
              />
              <div
                className={classNames(
                  styles.actionFormRow,
                  styles.paddingRight
                )}
              >
                <span>Type</span>
                <span>{quoteDetailsData?.response?.exchange_type}</span>
              </div>
              <div
                className={classNames(
                  styles.actionFormRow,
                  styles.paddingRight,
                  styles.rowGap
                )}
              >
                <span>Deposit Amt.</span>
                <span>
                  ₹{" "}
                  {Number(quoteDetailsData?.response?.deposit_amount).toFixed(
                    2
                  )}
                </span>
              </div>
              <Divider
                sx={{
                  width: "100%",
                  margin: "12px 0",
                }}
              />
              <div
                className={classNames(
                  styles.actionFormRow,
                  styles.paddingRight
                )}
              >
                <span>Owner</span>
                <span>{quoteDetailsData?.response?.owner?.full_name} </span>
              </div>
              <div
                className={classNames(
                  styles.actionFormRow,
                  styles.paddingRight,
                  styles.rowGap
                )}
              >
                <span>Customer</span>
                <span>{quoteDetailsData?.response?.customer?.full_name} </span>
              </div>
              <Divider
                sx={{
                  width: "100%",
                  margin: "12px 0",
                }}
              />
              <div
                className={classNames(
                  styles.actionFormRow,
                  styles.paddingRight
                )}
              >
                <span>Status</span>
                <span>
                  {QuoteStatusTypes[quoteDetailsData?.response?.status]}{" "}
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Grid container rowGap={2} justifyContent="space-between">
            <Grid item xs={12}>
              <h3>Want to update quote details?</h3>
            </Grid>
            <Grid item xs={5.8}>
              <DatePicker
                sx={{ width: "100%" }}
                label="From Date"
                value={updateQuoteData.fromDate}
                format="DD/MM/YYYY"
                disablePast
                onChange={(newValue) =>
                  setUpdateQuoteData({ ...updateQuoteData, fromDate: newValue })
                }
              />
            </Grid>
            <Grid item xs={5.8}>
              <DatePicker
                sx={{ width: "100%" }}
                label="From Date"
                value={updateQuoteData.toDate}
                format="DD/MM/YYYY"
                disablePast
                minDate={moment(updateQuoteData.fromDate).add({ day: 1 })}
                onChange={(newValue) =>
                  setUpdateQuoteData({ ...updateQuoteData, toDate: newValue })
                }
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="remark-basic"
                label="Remark"
                variant="outlined"
                fullWidth
                multiline
                maxRows={4}
                value={updateQuoteData.remarks}
                onChange={(event) =>
                  setUpdateQuoteData({
                    ...updateQuoteData,
                    remarks: event.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={3.8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Exchange Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={updateQuoteData.exchangeType}
                  onChange={(event) => {
                    setUpdateQuoteData({
                      ...updateQuoteData,
                      exchangeType: event.target.value,
                    });
                  }}
                  displayEmpty
                  label="Exchange Type"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={ProductSharingTypes.DEPOSIT}>
                    {ProductSharingTypes.DEPOSIT}
                  </MenuItem>
                  <MenuItem value={ProductSharingTypes.RENT}>
                    {ProductSharingTypes.RENT}
                  </MenuItem>
                  <MenuItem value={ProductSharingTypes.SHARE}>
                    {ProductSharingTypes.SHARE}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="meet-up-basic"
                label="Meet Up Location"
                variant="filled"
                fullWidth
                multiline
                maxRows={4}
                value={updateQuoteData.meetUp}
                onChange={(event) =>
                  setUpdateQuoteData({
                    ...updateQuoteData,
                    meetUp: event.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleUpdateOrder} fullWidth>
                Update Quote
              </Button>
            </Grid>
            {showActionBtn() && (
              <>
                <Grid item xs={5.9}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenConfirmationBox(true);
                      setActionStatus("accept");
                    }}
                    fullWidth
                    color="success"
                  >
                    Accept
                  </Button>
                </Grid>
                <Grid item xs={5.9}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenConfirmationBox(true);
                      setActionStatus("reject");
                    }}
                    fullWidth
                    color="error"
                  >
                    Reject
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
          <DialogBox
            title={"Are you sure?"}
            open={openConfirmationBox}
            handleClose={() => setOpenConfirmationBox(false)}
            handleSubmit={handleDialogSubmit}
          >
            <TextField
              id="remark-confirmation"
              label="Confirmation Remark"
              variant="outlined"
              fullWidth
              multiline
              maxRows={4}
              sx={{ minWidth: 400, marginTop: 2 }}
              value={confirmationRemark}
              onChange={(event) => setConfirmationRemark(event.target.value)}
            />
          </DialogBox>
        </LocalizationProvider>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default QuotesDetails;
