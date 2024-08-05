import React from "react";
import Card from "../Card/Card";
import { getProductsDB } from "@/helpers/products.helper";
import Link from "next/link";
import ICardProduct from "@/Interfaces/IProducts";

const CardList = async () => {
  let products: ICardProduct[] = [];
  try {
    products = await getProductsDB(); // Espera que se resuelva esta petición porque es un componente del servidor, y luego resuelve lo que sigue
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="bg-white p-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-20 border border-gray-200 rounded-lg overflow-hidden">
      {products.length > 0 ? (
        products.map((product) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card key={product.id} {...product} />
            </Link>
          );
        })
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default CardList;
