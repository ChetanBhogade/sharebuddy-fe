import { Avatar, Paper } from "@mui/material";
import React from "react";
import styles from "./ProductCard.module.scss";
import Image from "next/image";
import { ImageUrls } from "@/constants/images";
import { useRouter } from "next/router";

function ProductCard({
  title,
  amount,
  productId,
  userImage,
  userName,
  productImage,
}) {
  const router = useRouter();

  return (
    <Paper
      onClick={() => {
        console.log("paper clicked");
        router.push(`/shop/${productId}`);
      }}
      className={styles.cardPaper}
    >
      <div className={styles.imgWrapper}>
        <Image
          src={productImage || ImageUrls.product6}
          alt="product image"
          priority
          style={{
            objectFit: "cover",
          }}
          fill
        />
      </div>
      <div className={styles.descriptionArea}>
        <span className={styles.productTitle}>{title}</span>
        <div className={styles.infoSection}>
          <div className={styles.userInfo}>
            <Avatar alt="User Image" src={userImage || ImageUrls.avatar2} />
            <span>{userName}</span>
          </div>
          <span className={styles.cardPrice}>₹ {amount}</span>
        </div>
      </div>
    </Paper>
  );
}

export default ProductCard;
