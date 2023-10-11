"use client";

import { useCart } from "@context/CartContext";
import { Fragment } from "react";
import Button from "@components/buttons/Button";
import CartCard from "@components/cart/CartCard";
import { formatPrice } from "@utils/functions";
import { HorizontalSeparator } from "@components/separators";

export default function Cart() {
  const cart = useCart();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow mr-10">
        <div className="flex mb-8 [&>h3]:w-1/3 [&>h3]:p-2 space-x-3 [&>h3]:border-b-4 [&>h3:not(:first-child)]:border-neutral-500">
          <h3 className="border-blue-500">Items in cart</h3>
          <h3>Payment</h3>
          <h3>Order accepted</h3>
        </div>
        <h1 className="text-4xl font-bold mb-5">
          Koszyk
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
          <Button disabled title="in development" className="w-full bg-blue-500 font-bold text-xl">
            Pay
          </Button>
        </div>
      </aside>
    </div>
  );
}
