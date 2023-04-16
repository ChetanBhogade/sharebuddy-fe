import React, { useContext } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getQuotesDetails } from "@/services/quotes";
import { getErrorMessage } from "@/utils/commonFunctions";
import {
  Avatar,
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

function QuotesDetails() {
  const { setSnackbar, setIsBackdropLoading } = useContext(GlobalContext);
  const router = useRouter();

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
  console.log("quoteDetailsData: ", quoteDetailsData, router.query?.quotesId);

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
                //   value={quoteData.startDate}
                format="DD/MM/YYYY"
                disablePast
                //   onChange={(newValue) =>
                //     setQuoteData({ ...quoteData, startDate: newValue })
                //   }
              />
            </Grid>
            <Grid item xs={5.8}>
              <DatePicker
                sx={{ width: "100%" }}
                label="From Date"
                //   value={quoteData.startDate}
                format="DD/MM/YYYY"
                disablePast
                //   onChange={(newValue) =>
                //     setQuoteData({ ...quoteData, startDate: newValue })
                //   }
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
                // value={quoteData.meetUp}
                // onChange={(event) =>
                //   setQuoteData({ ...quoteData, meetUp: event.target.value })
                // }
              />
            </Grid>
            <Grid item xs={3.8}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Exchange Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  //   value={quoteData.sharingType}
                  //   onChange={handleShareTypeChange}
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
                // value={quoteData.meetUp}
                // onChange={(event) =>
                //   setQuoteData({ ...quoteData, meetUp: event.target.value })
                // }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                // onClick={handlePlaceQuote}
                fullWidth
                // disabled={quoteData.meetUp.length < 1}
              >
                Update Quote
              </Button>
            </Grid>
            <Grid item xs={5.9}>
              <Button
                variant="outlined"
                // onClick={handlePlaceQuote}
                fullWidth
                color="success"
                // disabled={quoteData.meetUp.length < 1}
              >
                Accept
              </Button>
            </Grid>
            <Grid item xs={5.9}>
              <Button
                variant="outlined"
                // onClick={handlePlaceQuote}
                fullWidth
                color="error"
                // disabled={quoteData.meetUp.length < 1}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default QuotesDetails;