"use client";

import { useCart } from "@context/CartContext";
import { Fragment } from "react";
import Button from "@components/buttons/Button";
import CartCard from "@components/cart/CartCard";
import { formatPrice } from "@utils/functions";
import { HorizontalSeparator } from "@components/separators";

import Link from "next/link";
import AsideSummary from "@components/cart/AsideSummary";

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
      <AsideSummary />
    </div>
  );
}
