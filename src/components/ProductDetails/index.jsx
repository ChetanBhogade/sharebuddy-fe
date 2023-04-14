import React from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { ImageUrls } from "@/constants/images";
import styles from "./ProductDetails.module.scss";

function ProductDetails() {
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
              <Chip label="In Stock" color="success" variant="outlined" />
              <span className={styles.productTitle}>
                Nike Air Force 1 NDESTRUKT
              </span>
              <span className={styles.productPrice}>₹ 2500</span>
              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                }}
              />
            </div>
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ProductDetails;
