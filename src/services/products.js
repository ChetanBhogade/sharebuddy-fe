import { makeAuthGetCall, makeAuthPostCall } from "./common";

export const getMyProducts = () => {
  return makeAuthGetCall("get_my_products");
};

export const getAllProducts = () => {
  return makeAuthGetCall("get_all_products");
};

export const getShopProducts = () => {
  return makeAuthGetCall("shop_products");
};

export const addProducts = (formData) => {
  return makeAuthPostCall("add_product", formData);
};

export const updateProduct = (formData) => {
  return makeAuthPostCall("update_product", formData);
};

export const removeProduct = (formData) => {
  return makeAuthPostCall("delete_product", formData);
};

export const getProductsDetails = (productId) => {
  return makeAuthGetCall(`get_product_details?product_id=${productId}`);
};
