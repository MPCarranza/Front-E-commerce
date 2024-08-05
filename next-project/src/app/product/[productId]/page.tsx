import React from "react";
import { getProductsById } from "@/helpers/products.helper";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import Carrousel from "@/components/Carrousel/Carrousel";

const Detail = async ({ params }: { params: { productId: string } }) => {
  const product = await getProductsById(params.productId);
  return (
    <div>
      <Carrousel />
      <ProductDetail {...product} />
    </div>
  );
};

export default Detail;
