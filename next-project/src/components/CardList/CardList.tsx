import React from 'react'
import Card from "../Card/Card";
import { getProductsDB } from "@/helpers/products.helper";
import Link from "next/link";


const CardList = async () => {
    const products = await getProductsDB();  //espera que se resuelva esta petición porque es un componente del servidor, y luego resuelve lo que sigue
    return (
        <div className="bg-[white] p-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-20 border border-gray-200 rounded-lg overflow-hidden">
            {products &&
            products?.map((product) => { 
                return (
                    <Link href={`/product/${product.id}`} key = {product.id}>
                       <Card key = {product.id} {...product}/>
                    </Link>
                )
            })}        
        </div>
    );
};

export default CardList;

