import { Avatar, Fab, Paper } from "@mui/material";
import React from "react";
import styles from "./ProductCard.module.scss";
import Image from "next/image";
import { ImageUrls } from "@/constants/images";
import { AddShoppingCart } from "@mui/icons-material";

function ProductCard() {
  return (
    <Paper className={styles.cardPaper}>
      <div className={styles.imgWrapper}>
        <Image
          src={ImageUrls.product6}
          alt="product image"
          style={{
            objectFit: "cover",
          }}
          fill
        />
        <Fab
          color="primary"
          aria-label="add"
          className={styles.cartBtn}
          size="small"
        >
          <AddShoppingCart />
        </Fab>
      </div>
      <div className={styles.descriptionArea}>
        <span className={styles.productTitle}>Sports Shoes Pro</span>
        <div className={styles.infoSection}>
          <Avatar alt="User Image" src={ImageUrls.avatar2} />
          <span className={styles.cardPrice}>₹ 2500</span>
        </div>
      </div>
    </Paper>
  );
}

export default ProductCard;
