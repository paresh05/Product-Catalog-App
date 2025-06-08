"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../constants/apiRoutes";

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export default function HomePageProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductProps[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await fetch(`${API_ROUTES.BASE_URL}${API_ROUTES.PRODUCTS}`);
      const products = await data.json();
      setProducts(products.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products?.map((product) => (
        <div
          key={product?.id}
          className="flex flex-col justify-center items-center rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow bg-white"
        >
          <img
            src={product?.images?.[0]}
            alt={product?.title}
            className="w-fit h-48 object-contain rounded-xl mb-3"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            {product?.title}
          </h2>
          <p className="text-primary font-medium text-base mt-1 text-gray-800">
            ${product?.price}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={() => router.push(`${API_ROUTES.PRODUCTS}/${product?.id}`)}
          >
            View Product
          </button>
        </div>
      ))}
    </div>
  );
}
