"use client";

import type { ShippingOption } from "@prisma/client";
import { localStorageCart, localStorageCartDetails, localStorageShippingOptions } from "./localStorageApi";
import { useSession } from "next-auth/react";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import type { PATCH_BODY } from "@app/api/user/cart/route";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";
import { areEqual } from "@utils/functions";

type ShippingContext = {
  options: ShippingOption[];
  selectedId: string | undefined;
  setSelectedId: Dispatch<SetStateAction<string | undefined>>;
};

const ShippingContext = createContext<ShippingContext>({} as ShippingContext);

export default function ShippingContextProvider({ children }: { children: ReactNode }) {
  // items state stores ids of items inside the user's cart
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [selectedId, setSelectedId] = useState<string>();

  // handles loading cart on page load either from localStorage or from server api
  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await fetch("/api/shipping");
      const data: ShippingOption[] = await res.json();
      setOptions(data);
      localStorageShippingOptions.set(data);
    };

    fetchCartItems();
  }, []);

  return (
    <ShippingContext.Provider
      value={{
        options,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  return useContext(ShippingContext);
}
