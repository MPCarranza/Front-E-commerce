"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Search from "../searchBar/searchBar";
import { IUserSession } from "@/Interfaces/Types";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [userSession, setUserSession] = useState<IUserSession | null>(null);

  useEffect(() => {
    // Verifica si estamos en el cliente y accede al localStorage
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        const parsedUserData: IUserSession = JSON.parse(userData);
        // Aquí se asume que la sesión es válida si hay un token
        if (parsedUserData.token) {
          setUserSession(parsedUserData);
        } else {
          setUserSession(null);
          router.push("/login");
        }
      } else {
        setUserSession(null);
        router.push("/login");
      }
    }
  }, [pathname, router]);

  const handleLogOut = () => {
    localStorage.removeItem("userSession");
    setUserSession(null);
    router.push("/"); // Redirige al inicio después de cerrar sesión
  };

  return (
    <nav className="bg-black flex justify-center pt-4 py-4 top-0 sticky z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-bold">
            <Link href="/home">
              <Image width={100} height={100} src="/logo.svg" alt="Logo" />
            </Link>
          </div>

          <Search />

          <div className="flex gap-4 md:gap-8 items-center">
            <div className="flex gap-3">
              {userSession && userSession.token ? (
                <>
                  <div className="mr-2 w-[51px] h-[51px]">
                    <Link href="/dashboard">
                      <Image src="/user.svg" alt="User" />
                    </Link>
                  </div>
                  <Link href="/cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 w-[50px] h-[50px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth="1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-[150px] justify-center rounded-md bg-black px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-[#5A3BC3] focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex-col">
                  <Link href="/register" className="text-gray-200 block">
                    Register
                  </Link>
                  <Link href="/login" className="font-medium text-white block">
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
