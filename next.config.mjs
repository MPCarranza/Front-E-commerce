/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Activa el modo estricto de React para detectar problemas potenciales
  staticPageGenerationTimeout: 120, // Aumenta el tiempo de espera a 120 segundos
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Asegúrate de que esta variable esté configurada en Vercel
  },
};

export default nextConfig;
