import Card from "@/components/Card/Card";
import { getProductsByCategory } from "@/helpers/products.helper";
import ICardProduct from "@/Interfaces/IProducts";
import Link from "next/link";
import React from "react";

interface Params {
  params: {
    categories: string;
  };
}

const Dynamic = async ({ params }: Params) => {
  const { categories } = params;
  let products: ICardProduct[] = [];

  try {
    products = await getProductsByCategory(Number(categories));
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <>
      <h1 className="ml-[100px] mt-[50px] text-white text-25px font-bold">
        Search result:
      </h1>
      <div className="flex flex-wrap items-center gap-4 p-4 justify-center">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card key={product.id} {...product} />
            </Link>
          ))
        ) : (
          <h1 className="mt-[50px] text-white text-xl">
            Sorry, there is no stock available for those products. Please, try
            with something else.
          </h1>
        )}
      </div>
    </>
  );
};

export default Dynamic;
