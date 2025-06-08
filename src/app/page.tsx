"use client";
import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import HomePageProducts from "./components/HomePageProducts/HomePageProducts";
import { getFromLocalStorage } from "./utils";
import { STORAGE_KEYS } from "./constants/storageKeys";

export default function Home() {
  const [cartValue, setCartValue] = useState(0);
  const [addedProducts, setAddedProducts] = useState<Array<number>>([]);

  useEffect(() => {
    if (getFromLocalStorage(STORAGE_KEYS.CART_VALUE)) {
      const value = getFromLocalStorage(STORAGE_KEYS.CART_VALUE);
      setCartValue(value.length);
      setAddedProducts(value);
    }
  }, []);

  return (
    <div>
      <Cart initialCartValue={cartValue} />
      <HomePageProducts
        addedProducts={addedProducts}
        setAddedProducts={setAddedProducts}
        setCartValue={setCartValue}
      />
    </div>
  );
}
