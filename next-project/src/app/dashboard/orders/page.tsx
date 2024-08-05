"use client";
import { getOrders } from "@/helpers/orders.helper";
import React, { useEffect, useState } from "react";
import { IOrder, IUserSession } from "@/Interfaces/Types";
import { useRouter } from "next/navigation";

const Orders = () => {
  const router = useRouter();
  const [totalCart, setTotalCart] = useState<number>(0);
  const [userSession, setUserSession] = useState<IUserSession>();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userData!));
    }
  }, []);

  const fetchData = async () => {
    let total = 0;
    const ordersResponse = await getOrders(userSession?.token!);
    ordersResponse.map((item: any) => {
      item.products.map((product: any) => {
        total = total + product.price;
      });
    });
    setTotalCart(total);
    setOrders(ordersResponse);
  };

  useEffect(() => {
    if (userSession?.user.name) {
      userSession?.user.name === "undefined"
        ? router.push("/login")
        : fetchData();
    }
  }, [userSession?.user]);

  return (
    <div className="flex flex-row mt-20 my-20">
      <div className="receipt bg-white rounded-3xl shadow-lg p-5 w-90 h-180 mx-auto my-0 relative top-1/2 -mt-90 -ml-45">
        <div className="flex justify-center items-center">
          {" "}
          <img className="w-[300px]" src="/logoGray.svg"></img>{" "}
        </div>
        {orders && orders.length > 0 ? (
          orders.map((order) => {
            return (
              <div key={order.id}>
                <p className="greeting text-center text-gray-600 capitalize text-lg my-9 tracking-wide">
                  {" "}
                  Thank you for your order!{" "}
                </p>
                <div className="order text-sm text-gray-400 pl-2 tracking-wide">
                  <p className="font-bold text-gray-600">
                    {" "}
                    Order No : {order.id}{" "}
                  </p>
                  <p> Date : {new Date(order.date)?.toDateString()} </p>
                  <p> Status : {order.status} </p>
                </div>

                <hr className="border border-gray-300 my-3" />

                <div className="details pl-2 mb-1 overflow-hidden">
                  <h3 className="text-gray-600 text-xl mb-4"> Details </h3>
                  {order.products.map((product) => (
                    <>
                      <div
                        key={product.id}
                        className="product flex w-full mb-4"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16"
                        />
                        <div className="info ml-4">
                          <h4 className="text-gray-600 uppercase mt-2">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      <hr className="border border-gray-300 my-3" />

                      <div className="totalprice pl-2">
                        <p className="tot text-gray-600 text-base font-bold">
                          {" "}
                          Price{" "}
                          <span className="float-right mr-4">
                            {" "}
                            ${product.price}{" "}
                          </span>
                        </p>
                      </div>
                      <hr className="border border-gray-300 my-3" />
                    </>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[22px] font-bold text-slate-900 m-20">
              You don't have any order in your cart yet.
            </span>
          </div>
        )}
        <div>
          <p className="text-[30px] font-bold">Total: ${totalCart}</p>
        </div>
        <footer className="text-xs text-gray-400 text-center mt-5">
          {" "}
          BuyFuture company.{" "}
        </footer>
      </div>
    </div>
  );
};

export default Orders;
