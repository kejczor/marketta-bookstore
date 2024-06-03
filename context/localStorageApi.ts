import { CART_IN_LOCALSTORAGE, CART_DETAILS_IN_LOCALSTORAGE, SHIPPING_IN_LOCALSTORAGE } from "@utils/conts";
import type { CartItem } from "./CartContext";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";
import { ShippingOption } from "@prisma/client";

export const localStorageCart = {
  get(): CartItem[] | null {
    return JSON.parse(localStorage.getItem(CART_IN_LOCALSTORAGE)!);
  },
  set(cart: CartItem[]): void {
    localStorage.setItem(CART_IN_LOCALSTORAGE, JSON.stringify(cart));
  },
};

export const localStorageCartDetails = {
  get(): StoreitemBasicDetails[] | null {
    return JSON.parse(localStorage.getItem(CART_DETAILS_IN_LOCALSTORAGE)!);
  },
  set(details: StoreitemBasicDetails[]): void {
    localStorage.setItem(CART_DETAILS_IN_LOCALSTORAGE, JSON.stringify(details));
  },
};

export const localStorageShippingOptions = {
  get(): ShippingOption[] | null {
    return JSON.parse(localStorage.getItem(SHIPPING_IN_LOCALSTORAGE)!);
  },
  set(shippingOptions: ShippingOption[]): void {
    localStorage.setItem(SHIPPING_IN_LOCALSTORAGE, JSON.stringify(shippingOptions));
  },
};
