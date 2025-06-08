"use client";
import Cart from "@/app/components/Cart/Cart";
import { ProductProps } from "@/app/components/HomePageProducts/HomePageProducts";
import ProductsDetails from "@/app/components/ProductDetails/ProductDetails";
import { API_ROUTES } from "@/app/constants/apiRoutes";
import { STORAGE_KEYS } from "@/app/constants/storageKeys";
import { getFromLocalStorage, setToLocalStorage } from "@/app/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<ProductProps | null>(null);
  const [cartValue, setCartValue] = useState(0);
  const [addedProducts, setAddedProucts] = useState<Array<number>>([]);

  const fetchProduct = async () => {
    try {
      const data = await fetch(
        `${API_ROUTES.BASE_URL}${API_ROUTES.PRODUCTS}/${slug}`
      );
      const product = await data.json();
      setProduct(product);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = () => {
    if (product?.id) {
      if (addedProducts?.includes(product?.id)) {
        const filteredProducts = addedProducts.filter(
          (item) => item !== product?.id
        );
        setCartValue(addedProducts.length - 1);
        setToLocalStorage(STORAGE_KEYS.CART_VALUE, filteredProducts);
        setAddedProucts(filteredProducts);
      } else {
        setCartValue(addedProducts.length + 1);
        setToLocalStorage(STORAGE_KEYS.CART_VALUE, [
          ...addedProducts,
          product?.id,
        ]);
        setAddedProucts((prev) => [...prev, product?.id]);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
    if (getFromLocalStorage(STORAGE_KEYS.CART_VALUE)) {
      const cartValue = getFromLocalStorage(STORAGE_KEYS.CART_VALUE);
      setCartValue(cartValue.length);
      setAddedProucts(cartValue);
    }
  }, []);

  return (
    <>
      <Cart initialCartValue={cartValue} />
      <ProductsDetails
        product={product}
        addedProducts={addedProducts}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
}
