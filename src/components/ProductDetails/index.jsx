import React, { useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { ImageUrls } from "@/constants/images";
import styles from "./ProductDetails.module.scss";
import { ProductCategories, ProductSharingTypes } from "@/constants/common";
import classNames from "classnames";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const productAmount = 2500;

function ProductDetails() {
  const [quoteData, setQuoteData] = useState({
    sharingType: ProductSharingTypes.RENT,
    startDate: moment(),
    endDate: moment().add({ day: 1 }),
    meetUp: "",
  });

  const handleShareTypeChange = (event) => {
    setQuoteData({ ...quoteData, sharingType: event.target.value });
  };

  const calculateDepositAmount = (category) => {
    switch (category) {
      case ProductSharingTypes.DEPOSIT:
        return (productAmount * 25) / 100;

      case ProductSharingTypes.RENT:
        return (productAmount * 25) / 100;

      case ProductSharingTypes.SHARE:
        return (productAmount * 0) / 100;

      default:
        return 0;
    }
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Products Details"}>
        <Grid container gap={2} marginTop={5}>
          <Grid item xs={12} md={5.8}>
            <div className={styles.prodImgWrapper}>
              <Image
                src={ImageUrls.product1}
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
                label={ProductCategories[2]}
                color="success"
                variant="outlined"
              />
              <span className={styles.productTitle}>
                Nike Air Force 1 - Sports Pro User
              </span>
              <span className={styles.productPrice}>₹ {productAmount}</span>
              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                }}
              />
              <div className={styles.actionFormRow}>
                <span>Type</span>
                <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={quoteData.sharingType}
                    onChange={handleShareTypeChange}
                    displayEmpty
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
              </div>
              <div
                className={classNames(
                  styles.actionFormRow,
                  styles.paddingRight
                )}
              >
                <span>Deposit Amt.</span>
                <span>₹ {calculateDepositAmount(quoteData.sharingType)}</span>
              </div>
              <TextField
                id="meet-up-basic"
                label="Meet Up Location"
                variant="filled"
                fullWidth
                multiline
                maxRows={4}
                value={quoteData.meetUp}
                onChange={(event) =>
                  setQuoteData({ ...quoteData, meetUp: event.target.value })
                }
                className={styles.rowGap}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Grid container justifyContent="space-between" mt={2}>
                  <Grid item xs={5.8}>
                    <DatePicker
                      label="From Date"
                      value={quoteData.startDate}
                      onChange={(newValue) =>
                        setQuoteData({ ...quoteData, startDate: newValue })
                      }
                    />
                  </Grid>
                  <Grid item xs={5.8}>
                    <DatePicker
                      label="To Date"
                      value={quoteData.endDate}
                      onChange={(newValue) =>
                        setQuoteData({ ...quoteData, endDate: newValue })
                      }
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
              <Button variant="contained" fullWidth className={styles.rowGap}>
                Place Quote
              </Button>
            </div>
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ProductDetails;
