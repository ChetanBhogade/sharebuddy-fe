import ProductDetails from "@/components/ProductDetails";
import { useRouter } from "next/router";
import React from "react";

function ProductId() {
  const router = useRouter();

  console.log("router info: ", router, router.query);

  return (
    <div>
      <ProductDetails />
    </div>
  );
}

export default ProductId;
