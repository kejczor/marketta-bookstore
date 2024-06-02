"use client";

import { useCart } from "@context/CartContext";
import { Fragment } from "react";
import Button from "@components/buttons/Button";
import CartCard from "@components/cart/CartCard";
import { formatPrice } from "@utils/functions";
import { HorizontalSeparator } from "@components/separators";

import Link from "next/link";

export default function Cart() {
  const cart = useCart();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow mr-10">
        <h1 className="text-4xl font-bold mb-5">
          Cart
          <span className="text-xl text-neutral-500 ml-2">({cart.countTotalItemsQuantity()})</span>
        </h1>
        {cart.itemsDetails.map((storeitem, i) => (
          <Fragment key={storeitem.id}>
            <CartCard details={storeitem} />
            <HorizontalSeparator />
          </Fragment>
        ))}
      </div>
      <aside>
        <div className="sticky top-28 mt-12 bg-neutral-800 p-10 rounded-xl space-y-5">
          <h2 className="mx-2 flex justify-between items-end">
            Total cart value:
            <span className="text-xl font-bold w-32 text-right">
              {formatPrice(cart.countTotalCartValue())}
            </span>
          </h2>
          <h2 className="mx-2 flex justify-between items-end">
            Shipping cost from:
            <span className="text-xl font-bold w-32 text-right">
              {formatPrice(cart.countTotalCartValue())}
            </span>
          </h2>
          <HorizontalSeparator />
          <h1 className="mx-2 flex justify-between items-end">
            Total price:
            <span className="text-3xl font-bold ml-2">{formatPrice(cart.countTotalCartValue())}</span>
          </h1>
          <Link href="/cart/shipping">
            <Button className="w-full bg-blue-500 font-bold text-xl">Next</Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
