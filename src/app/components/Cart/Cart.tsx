"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CartProps {
  initialCartValue: number;
}

export default function Cart({ initialCartValue }: CartProps) {
  const [cartValue, setCartValue] = useState(initialCartValue);

  useEffect(() => {
    setCartValue(initialCartValue);
  }, [initialCartValue]);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-gray-800">
        My Store
      </Link>
      <div className="relative flex items-center gap-2 text-gray-700">
        <span className="text-2xl">🛒</span>
        <span className="font-medium">Cart</span>
        <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {cartValue}
        </span>
      </div>
    </nav>
  );
}
