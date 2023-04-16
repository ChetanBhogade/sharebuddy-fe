import { ImageUrls } from "@/constants/images";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./QuotesCard.module.scss";
import moment from "moment";

function QuotesCard({
  customerPhoto,
  customerName,
  fromDate,
  toDate,
  productImage,
  meetUpLocation,
  rentAmt,
  depositAmt,
}) {
  return (
    <Card elevation={2} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar alt={customerName} src={customerPhoto} />}
          title="This is Product Name"
          subheader={`${moment(fromDate).format("DD/MM/YYYY")} - ${moment(
            toDate
          ).format("DD/MM/YYYY")}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={productImage}
          alt="Product Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {meetUpLocation}
          </Typography>
          <Divider
            sx={{
              margin: "0.7em 0",
            }}
          />
          <div className={styles.amountInfoSection}>
            <div className={styles.amountGroup}>
              <span>Rent Amt.</span>
              <span>₹ {Number(rentAmt).toFixed(2)}</span>
            </div>
            <div className={styles.amountGroup}>
              <span>Deposit Amt.</span>
              <span>₹ {Number(depositAmt).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default QuotesCard;
