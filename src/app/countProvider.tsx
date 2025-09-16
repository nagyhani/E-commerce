"use client";
import { getUserToken } from "@/getUserToken";
import { createContext, useEffect, useState } from "react";
import { GetUserCart } from "./cartAction/cartAction";
import { ProductElement } from "@/types/cart.type";

type CountContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const countContext = createContext<CountContextType | null>(null);

export default function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  async function getCartData() {
    const token = await getUserToken();
    if (token) {
      try {
        const response = await GetUserCart();

        
        const cart = response.data;

        let sum = 0;
        cart?.products?.forEach((item: ProductElement) => {
          sum += item.count;
        });

        setCount(sum);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    }
  }

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <countContext.Provider value={{ count, setCount }}>
      {children}
    </countContext.Provider>
  );
}
