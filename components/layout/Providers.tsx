"use client";

import CartContextProvider from "@context/CartContext";
import ShippingContextProvider from "@context/ShippingContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ShippingContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </ShippingContextProvider>
    </SessionProvider>
  );
}
