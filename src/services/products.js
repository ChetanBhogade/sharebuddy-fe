import { makeAuthGetCall } from "./common";

export const getAllProducts = () => {
  return makeAuthGetCall("get_all_products");
};

export const getProductsDetails = (productId) => {
  return makeAuthGetCall(`get_product_details?product_id=${productId}`);
};
