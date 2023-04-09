import React, { useState } from "react";
import PageLayout from "../common/PageLayout";
import ResponsiveDrawer from "../common/Drawer/ResponsiveDrawer";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styles from "./Shop.module.scss";
import ProductCard from "../common/ProductCard";

function ShopPage() {
  const [sortBy, setSortBy] = useState("latest");

  const theme = useTheme();
  const matchesMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <PageLayout>
      <ResponsiveDrawer documentHeading={"Shop"}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          rowGap={2}
          className={styles.filterArea}
        >
          <Grid item xs={12} md={6}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              type="text"
              size="small"
              fullWidth={matchesMdDown}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            alignItems="center"
            justifyContent={matchesMdDown ? "flex-start" : "flex-end"}
          >
            <FormControl size="small" fullWidth={matchesMdDown}>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sort By"
                onChange={handleSortByChange}
              >
                <MenuItem value={"latest"}>Latest</MenuItem>
                <MenuItem value={"priceHightToLow"}>
                  Price: Hight - Low
                </MenuItem>
                <MenuItem value={"PriceLowToHigh"}>Price: Low - High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Grid container gap={2} justifyContent="space-around">
          <Grid item xs={12} md={5.5} lg={3.5} xl={2.5}>
            <ProductCard />
          </Grid>
          <Grid item xs={12} md={5.5} lg={3.5} xl={2.5}>
            <ProductCard />
          </Grid>
          <Grid item xs={12} md={5.5} lg={3.5} xl={2.5}>
            <ProductCard />
          </Grid>
          <Grid item xs={12} md={5.5} lg={3.5} xl={2.5}>
            <ProductCard />
          </Grid>
          <Grid item xs={12} md={5.5} lg={3.5} xl={2.5}>
            <ProductCard />
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </PageLayout>
  );
}

export default ShopPage;
