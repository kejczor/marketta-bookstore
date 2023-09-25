"use client";

import type { StoreitemInCart } from "@prisma/client";
import { localStorageCart, localStorageCartDetails } from "./localStorageApi";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PATCH_BODY } from "@app/api/user/cart/route";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";
import { areEqual } from "@utils/functions";

export type CartItem = Omit<StoreitemInCart, "userId">;

type CartContext = {
  items: CartItem[];
  itemsDetails: StoreitemBasicDetails[];
  quantityInCart: (storeitemId: string) => number;
  countTotalCartValue: () => number;
  addToCart: (details: StoreitemBasicDetails) => void;
  removeFromCart: (storeitemId: string) => void;
  incrementQuantity: (storeitemId: string) => void;
  decrementQuantity: (storeitemId: string) => void;
};

const CartContext = createContext<CartContext>({} as CartContext);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // items state stores ids of items inside the user's cart
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemsDetails, setItemsDetails] = useState<StoreitemBasicDetails[]>([]);
  const [areItemsDetailsFetching, setAreItemsDetailsFetching] = useState(false);

  const { data: session } = useSession();

  // handles loading cart on page load either from localStorage or from server api
  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await fetch("/api/user/cart");
      const data: StoreitemInCart[] = await res.json();
      console.log(data);
      setItems(data);
      localStorageCart.set(data);
    };

    if (session?.user) {
      fetchCartItems();
    }

    // if session information wasn't fetched yet or user is not signed in cart is loaded from localStorage
    const cart = localStorageCart.get();
    if (cart) {
      setItems(cart);
    }
  }, [session?.user]);

  // handles synchronizing local cart with the one stored on the server (only when user is signed in) and fetches details about items inside the cart
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (session?.user) {
      const patchCart = async () => {
        console.log("patched changes in cart", items);
        const body: PATCH_BODY = items.map((item) => ({
          ...item,
          userId: session.user.id,
        }));
        const res = await fetch("/api/user/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      };

      timeoutId = setTimeout(patchCart, 2000);
    }

    if (
      !areEqual(
        items.map(({ storeitemId }) => storeitemId),
        itemsDetails.map(({ id }) => id)
      ) &&
      !areItemsDetailsFetching
    ) {
      const fetchCartItemsDetails = async () => {
        const res = await fetch(
          `/api/storeitems?basic=true&id=${items
            .map((item) => item.storeitemId)
            .join("&id=")}`
        );
        const data = await res.json();
        console.log(data);
        setItemsDetails(data);
        localStorageCartDetails.set(data);
        setAreItemsDetailsFetching(false);
      };

      const cartDetails = localStorageCartDetails.get();
      if (
        cartDetails &&
        areEqual(
          items.map(({ storeitemId }) => storeitemId),
          cartDetails.map(({ id }) => id)
        )
      ) {
        setItemsDetails(cartDetails);
      } else {
        fetchCartItemsDetails();
        setAreItemsDetailsFetching(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [session?.user, items, itemsDetails, areItemsDetailsFetching]);

  function quantityInCart(storeitemId: string) {
    return (
      items.find(({ storeitemId: cartitemId }) => cartitemId === storeitemId)
        ?.quantity ?? 0
    );
  }

  function countTotalCartValue() {
    return items.reduce((totalValue, item) => {
      return (
        totalValue +
        item.quantity *
          (itemsDetails.find(({ id }) => id === item.storeitemId)?.price ?? 0)
      ); // when item's details were not fetched yet it does not count real value, just return 0
    }, 0);
  }

  function addToCart(details: StoreitemBasicDetails) {
    incrementQuantity(details.id);
    setItemsDetails((currentDetails) => [...currentDetails, details]);
  }

  function removeFromCart(storeitemId: string) {
    setItems((currentCart) => {
      const newCart = currentCart.filter(
        ({ storeitemId: cartitemId }) => cartitemId !== storeitemId
      );
      localStorageCart.set(newCart);
      return newCart;
    });
  }

  function incrementQuantity(storeitemId: string) {
    setItems((currentCart) => {
      const newCart = [...currentCart];
      const storeitemInCart = newCart.find(
        ({ storeitemId: cartitemId }) => cartitemId === storeitemId
      );
      if (storeitemInCart) {
        // this item is already in cart, so we increment its quantity
        storeitemInCart.quantity++;
      } else {
        newCart.push({
          storeitemId,
          quantity: 1,
        });
      }
      localStorageCart.set(newCart);
      return newCart;
    });
  }

  function decrementQuantity(storeitemId: string) {
    setItems((currentCart) => {
      let newCart = [...currentCart];
      const storeitemInCart = newCart.find(
        ({ storeitemId: cartitemId }) => cartitemId === storeitemId
      );
      if (storeitemInCart) {
        // we perform any operations only if storeitem is in cart, otherwise treat function call as a misscall
        if (storeitemInCart.quantity === 1) {
          removeFromCart(storeitemId);
        } else {
          // this item will still be in cart, so we decrement its quantity
          storeitemInCart.quantity--;
        }
        localStorageCart.set(newCart);
      }
      return newCart;
    });
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemsDetails,
        addToCart,
        removeFromCart,
        quantityInCart,
        countTotalCartValue,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
