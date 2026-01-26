"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { CartContextProvider } from "./Context/CartContext";
import { WishlistContextProvider } from "./Context/WishlistContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
