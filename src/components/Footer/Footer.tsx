import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#5A3BC3] text-white py-8 mt-0">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap justify-between">
          {/* Sección de enlaces rápidos */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h2 className="font-medium text-lg mb-4">Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Landing
                </a>
              </li>
              <li>
                <a href="/home" className="hover:underline">
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Sección de contacto */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h2 className="font-medium text-lg mb-4">Contact</h2>
            <ul className="space-y-2">
              <li>
                Email:{" "}
                <a href="mailto:info@ecommerce.com" className="hover:underline">
                  info@ecommerce.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:underline">
                  +123 456 7890
                </a>
              </li>
              <li>Address: St. 123, SDE City, Argentina</li>
            </ul>
          </div>

          {/* Sección de redes sociales */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h2 className="font-medium text-lg mb-4">Follow us</h2>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      {" "}
                      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                    </svg>
                  </span>
                </a>
              </li>
              <li>
                <span className="[&>svg]:h-5 [&>svg]:w-5">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      x="0px"
                      y="0px"
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                    >
                      <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                    </svg>
                  </a>
                </span>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <span className="[&>svg]:h-6 [&>svg]:w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 32 32"
                    >
                      <path d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z"></path>
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-white font-bold text-sm">
          &copy; {new Date().getFullYear()} BuyFuture. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
