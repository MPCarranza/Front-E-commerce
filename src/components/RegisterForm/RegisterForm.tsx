"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { validateRegisterForm } from "@/utils/validationRegister"; // Ajusta la ruta según la ubicación de validators.ts
import { IRegisterProps } from "@/Interfaces/Types";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  };

  const [userData, setUserData] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: string;
  }>({});

  // Handler para actualizar el estado de userData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handler para el envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validación usando el módulo externo
    const newErrors = validateRegisterForm(
      userData.name,
      userData.email,
      userData.password,
      userData.address,
      userData.phone
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(userData);
      Swal.fire({
        title: "You have successfully registered",
        width: 400,
        padding: "3em",
      });
      router.push("/login");
    } catch (error: any) {
      Swal.fire({
        title:
          "Failed to register.Probably there is already a user with those credentials.",
        width: 400,
        padding: "3em",
      });
      throw new Error(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register form</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de nombre */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Campo de correo electrónico */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Campo de dirección */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={userData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Campo de teléfono */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={userData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#5A3BC3] text-white font-semibold rounded-md shadow-sm hover:bg-[#081428] focus:outline-none focus:ring-2 focus:ring-[purple]]"
          >
            Submit
          </button>
          <span className="text-center">
            {
              <Link href="/login">
                <p className="w-full py-2 px-4 text-grey font-semibold">
                  or Login
                </p>
              </Link>
            }
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
