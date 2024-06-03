"use client";

import Button from "@components/buttons/Button";
import { HorizontalSeparator } from "@components/separators";
import { useCart } from "@context/CartContext";
import { useShipping } from "@context/ShippingContext";
import { formatPrice } from "@utils/functions";
import Link from "next/link";

export default function AsideSummary() {
  const cart = useCart();
  const shipping = useShipping();

  const cheapestShippingPrice = formatPrice(Math.min(...shipping.options.map(({ price }) => price)));
  const selectedShipping = shipping.options.find((opt) => opt.id === shipping.selectedId)?.price ?? 0;

  const content = shipping.selectedId ? (
    <>
      Selected shipping:
      <span className="text-xl font-bold w-32 text-right">{formatPrice(selectedShipping)}</span>
    </>
  ) : (
    <>
      Shipping cost from:
      <span className="text-xl font-bold w-32 text-right">{cheapestShippingPrice}</span>
    </>
  );

  return (
    <aside>
      <div className="sticky top-28 mt-12 bg-neutral-800 p-10 rounded-xl space-y-5">
        <h2 className="mx-2 flex justify-between items-end">
          Total cart value:
          <span className="text-xl font-bold w-32 text-right">{formatPrice(cart.countTotalCartValue())}</span>
        </h2>
        <h2 className="mx-2 flex justify-between items-end">{content}</h2>
        <HorizontalSeparator />
        <h1 className="mx-2 flex justify-between items-end">
          Total price:
          <span className="text-3xl font-bold ml-2">
            {formatPrice(cart.countTotalCartValue() + selectedShipping)}
          </span>
        </h1>
        <Link href="/cart/shipping" className="block mt-4">
          <Button className="w-full bg-blue-500 font-bold text-xl">Next</Button>
        </Link>
      </div>
    </aside>
  );
}
