"use client";
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { categoriesToPreLoad } from "@/helpers/categories";
import Link from "next/link";
import ICardProduct from "@/Interfaces/IProducts";
import {
  getProductsDB,
  getProductsByCategory,
} from "@/helpers/products.helper";
import ICategory from "@/Interfaces/ICategory";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ICardProduct[]>([]);
  const [products, setProducts] = useState<ICardProduct[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [noResultsMessage, setNoResultsMessage] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchTerm(""); // Vacía el input al hacer clic fuera
      setSearchResults([]);
      setNoResultsMessage("");
    }
  };

  const filterProducts = async () => {
    if (searchTerm === "") {
      setSearchResults([]);
      setFilteredCategories([]);
      setNoResultsMessage("");
      return;
    }

    // Filtrar productos por nombre
    const filteredByName = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrar categorías por nombre
    const matchedCategories = categoriesToPreLoad.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Obtener productos asociados a las categorías filtradas
    const productsFromCategoriesPromises = matchedCategories.map(
      async (category) => {
        return await getProductsByCategory(category.id);
      }
    );

    // Esperar todas las promesas y aplanar los resultados
    const productsFromCategories = (
      await Promise.all(productsFromCategoriesPromises)
    ).flat();

    // Combinar resultados y eliminar duplicados
    const uniqueResults = Array.from(
      new Set([...filteredByName, ...productsFromCategories])
    );

    setSearchResults(uniqueResults);
    setFilteredCategories(matchedCategories);

    // Mostrar mensaje si no hay resultados
    if (uniqueResults.length === 0) {
      setNoResultsMessage("No results were found for those words.");
    } else {
      setNoResultsMessage("");
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    filterProducts();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsDB();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <form
      className="w-full max-w-2xl mx-auto relative"
      onChange={handleSubmit}
      onSubmit={handleSubmit}
    >
      <div className="flex" ref={searchContainerRef}>
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <button
          id="dropdown-button"
          onClick={toggleDropdown}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text- font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          All categories
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`absolute top-full mt-2 z-20 ${
            isOpen ? "block" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          ref={dropdownRef}
        >
          {isOpen && (
            <div className="w-full p-2 flex flex-col items-start gap-[10px] justify-around">
              {categoriesToPreLoad &&
                categoriesToPreLoad.map((category) => {
                  if (category.name) {
                    return (
                      <Link key={category.id} href={`/products/${category.id}`}>
                        <label className="text-s font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          {category.name}
                        </label>
                      </Link>
                    );
                  }
                  return null;
                })}
            </div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-s text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search smartphones, laptops, tablets..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#5A3BC3] rounded-e-lg border border-[#5A3BC3] hover:bg-[#5A3BC3] "
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          {searchTerm && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
              {searchResults.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white rounded-lg">
                    {product.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {searchTerm && noResultsMessage && (
            <div className="absolute top-full mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
              <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                {noResultsMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Search;
