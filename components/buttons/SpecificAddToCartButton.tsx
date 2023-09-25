"use client";

import { useCart } from "@context/CartContext";
import Button from "./Button";
import Image from "next/image";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";

export default function SpecificAddToCartButton({
  details,
}: {
  details: StoreitemBasicDetails;
}) {
  const cart = useCart();
  const storeitemInCartQuantity = cart.quantityInCart(details.id);
  if (storeitemInCartQuantity) {
    return (
      <div className="flex items-center">
        <Button
          className="flex-grow mr-3 py-2 bg-red-900 flex flex-wrap whitespace-nowrap overflow-hidden h-12"
          onClick={() => cart.removeFromCart(details.id)}
        >
          <Image
            className="h-full mb-1 inline-flex items-center w-min"
            src={"/svg/rubbish-bin.svg"}
            alt=""
            width={30}
            height={30}
          />
          <span className="h-full inline-flex ml-2 items-center whitespace-nowrap w-min">
            Remove from cart
          </span>
        </Button>
        <div className="aspect-square h-full">
          <Button
            className="w-full h-full"
            onClick={() => cart.incrementQuantity(details.id)}
          >
            +
          </Button>
        </div>
        <span className="mx-3 w-6 text-center">{storeitemInCartQuantity}</span>
        <div className="aspect-square h-full">
          <Button
            className="w-full h-full"
            onClick={() => cart.decrementQuantity(details.id)}
          >
            -
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button className="w-full" onClick={() => cart.addToCart(details)}>
      Add to cart
    </Button>
  );
}
