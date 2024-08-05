"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUserSession } from "@/Interfaces/Types";
import ICardProduct from "@/Interfaces/IProducts";
import { createOrder } from "@/helpers/orders.helper";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<ICardProduct[]>([]);
  const [totalCart, setTotalCart] = useState<number>(0);
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado para manejar la carga

  // Cargar la sesión del usuario desde el localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setUserSession(JSON.parse(userData));
      } else {
        router.push("/login");
      }
      setLoading(false); // Estado de carga terminado
    }
  }, [router]);

  // Cargar el carrito desde el localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (storedCart) {
        const total = storedCart.reduce(
          (acc: number, item: ICardProduct) => acc + item.price,
          0
        );
        setTotalCart(total);
        setCart(storedCart);
      }
    }
  }, []);

  // Verificar si la sesión del usuario es válida y redirigir si no lo es
  useEffect(() => {
    if (!loading) {
      // Verificar si la carga ha terminado
      console.log("User Session:", userSession);
      if (!userSession || !userSession.user?.name) {
        router.push("/login");
      }
    }
  }, [userSession, loading, router]);

  const handleClick = async () => {
    if (cart.length > 0 && userSession?.token) {
      const idProducts = new Set(cart.map((product) => product.id));
      await createOrder(Array.from(idProducts), userSession.token);
      Swal.fire({
        title: "Buy successfully",
        width: 400,
        padding: "3em",
      });
      setCart([]);
      setTotalCart(0);
      localStorage.setItem("cart", "[]");
      router.push("/dashboard/orders");
    } else {
      console.log("Error: No user session or cart is empty");
    }
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
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="relative m-10 flex items-center flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                >
                  <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                    <Image
                      className="object-cover"
                      src={item.image}
                      alt={`Imagen del producto: ${item.image}`}
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      50% OFF
                    </span>
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1">
                      {item.name}
                    </h5>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">
                        Price: ${item.price}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-[#5A3BC3] hover:bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remove item
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-2 mb-5 flex items-center justify-between">
                <span className="text-[22px] font-bold text-slate-900 m-20">
                  You don&apos;t have any products in your cart yet.
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
