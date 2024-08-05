"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { validateLoginForm } from "@/utils/validationLogin"; // Ajusta la ruta según la ubicación de validators.ts
import { ILoginProps } from "@/Interfaces/Types";
import { login } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LoginForm: React.FC = () => {
  const router = useRouter();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

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
    // Validación
    const newErrors = validateLoginForm(userData.email, userData.password);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await login(userData);
      const { token, user } = response;
      localStorage.setItem("userSession", JSON.stringify({ token, user }));
      Swal.fire({
        title: "You have successfully logged",
        width: 400,
        padding: "3em",
      });
      router.push("/home");
    } catch (error: any) {
      Swal.fire({
        title: "You are not a register user. Please get register.",
        width: 400,
        padding: "3em",
      });
      router.push("/register");
      throw new Error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Form</h2>
        <form onSubmit={handleSubmit}>
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
              type="text"
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

          {/* Botón de envío */}
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-[#5A3BC3] text-white font-semibold rounded-md shadow-sm hover:bg-[#081428] focus:outline-none focus:ring-2 focus:ring-[purple]]"
          >
            Login
          </button>
          <span className="text-center">
            {
              <Link href="/register">
                <p className="w-full py-2 px-4 text-grey font-semibold">
                  or Sing in
                </p>
              </Link>
            }
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
