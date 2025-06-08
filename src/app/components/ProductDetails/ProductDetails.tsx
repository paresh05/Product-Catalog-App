"use client";

import { ProductProps } from "../HomePageProducts/HomePageProducts";

interface ProductsDetails {
  product: ProductProps | null;
  handleAddToCart: () => void;
  addedProducts: number[];
}

export default function ProductsDetails({
  product,
  handleAddToCart,
  addedProducts,
}: ProductsDetails) {
  return (
    product?.id && (
      <div className="bg-white max-w-3xl mx-auto p-6 rounded-2xl shadow-md mt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {product?.title}
        </h2>
        <img
          src={product?.images?.[0]}
          alt={product?.title}
          className="w-full h-64 object-contain rounded-xl mb-6 border"
        />
        <p className="text-xl font-semibold text-blue-600 mb-2">
          ${product?.price}
        </p>
        <p className="text-gray-700 text-base leading-relaxed">
          {product?.description}
        </p>
        <button
          onClick={handleAddToCart}
          className={`mt-3 px-4 py-2 text-white cursor-pointer rounded-lg transition-colors text-sm font-medium ${
            addedProducts?.includes(product?.id) ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {addedProducts?.includes(product?.id)
            ? `Remove from Cart`
            : `Add to Cart`}
        </button>
      </div>
    )
  );
}
