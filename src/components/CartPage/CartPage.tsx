"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IUserSession } from "@/Interfaces/Types";
import ICardProduct from "@/Interfaces/IProducts";
import { createOrder } from "@/helpers/orders.helper";
import Swal from "sweetalert2";
import Link from "next/link";

const CartPage = () => {
  const router = useRouter();

  const [cart, setCart] = useState<ICardProduct[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0);
  const [userSession, setUserSession] = useState<IUserSession>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userData!));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (storedCart) {
        let totalCart = 0;
        storedCart.map((item: ICardProduct) => {
          totalCart = totalCart + item.price;
        });
        setTotalCart(totalCart);
        setCart(storedCart);
      }
    }
  }, []);

  useEffect(() => {
    if (userSession?.user.name) {
      userSession?.user.name === undefined && router.push("/login");
    }
  }, [userSession?.user]);

  const handleClick = async () => {
    const idProducts = new Set(cart?.map((product) => product.id));
    await createOrder(Array.from(idProducts), userSession?.token!);
    Swal.fire({
      title: "Buy successfully",
      width: 400,
      padding: "3em",
    });
    setCart([]);
    setTotalCart(0);
    localStorage.setItem("cart", "[]");
    router.push("/dashboard/orders");
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const newTotal = updatedCart.reduce((total, item) => total + item.price, 0);
    setTotalCart(newTotal);
  };

  return (
    <>
      <h1 className="ml-[100px] mt-[50px] text-[white] text-[25px] font-bold">
        Shopping Cart:
      </h1>
      <div className="w-100px p-4 bg-[white] m-20 rounded-lg">
        <Link
          className="ml-[10px] hover:underline font-bold text-gray-600"
          href="/home"
        >
          Keep buying
        </Link>

        <div className="flex flex-row justify-around">
          <div>
            {cart && cart.length > 0 ? (
              cart?.map((cart) => {
                return (
                  <div
                    key={cart.name}
                    className="relative m-10 flex items-center flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                  >
                    <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                      <img
                        className="object-cover"
                        src={cart.image}
                        alt={`Imagen del producto: ${cart.image}`}
                      />
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        50% OFF
                      </span>
                    </div>
                    <div className="mt-4 px-5 pb-5">
                      <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">
                        {cart.name}
                      </h5>

                      <div className="mt-2 mb-5 flex items-center justify-between">
                        <span className="text-xl font-bold text-slate-900">
                          Price: ${cart.price}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(cart.id)}
                        className="bg-[#5A3BC3] hover:bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-2 mb-5 flex items-center justify-between">
                <span className="text-[22px] font-bold text-slate-900 m-20">
                  You don't have any products in your cart yet.
                </span>
              </div>
            )}
          </div>
          <div className="text-black  m-20">
            <p className="text-[30px] font-bold">Total: ${totalCart}</p>
            <br />
            <button
              onClick={handleClick}
              className="w-[300px] justify-center rounded-md bg-black px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-[#5A3BC3] focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
