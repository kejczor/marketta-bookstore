"use client";

import { useCart } from "@context/CartContext";
import Button from "./Button";
import Image from "next/image";
import QuantitySelectDropdown from "@components/buttons/QuantitySelectDropdown";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";

export default function AddToCartButtonDropdown({ details }: { details: StoreitemBasicDetails }) {
  const cart = useCart();
  const storeitemInCartQuantity = cart.quantityInCart(details.id);
  if (storeitemInCartQuantity) {
    return (
      <div className="flex items-center space-x-3">
        <QuantitySelectDropdown details={details} />
        <button onClick={() => cart.removeFromCart(details.id)}>
          <Image
            className="mb-1 inline-flex invert items-center"
            src={"/svg/rubbish-bin.svg"}
            alt=""
            width={25}
            height={25}
          />
        </button>
      </div>
    );
  }

  return (
    <Button className="w-full" onClick={() => cart.addToCart(details)}>
      Add to cart
    </Button>
  );
}
