"use client";

import AsideSummary from "@components/cart/AsideSummary";
import { useShipping } from "@context/ShippingContext";
import { formatPrice } from "@utils/functions";
import { ChangeEvent, useCallback } from "react";

export default function Shipping() {
  const shipping = useShipping();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      shipping.setSelectedId(e.target.id);
    },
    [shipping]
  );

  return (
    <div className="flex flex-col justify-between lg:flex-row">
      <div>
        <h1 className="text-4xl font-bold mb-5">Shipping Information</h1>
        <div>
          <input type="text" name="name" placeholder="name" />
          <input type="text" name="surname" placeholder="surname" />
          <input type="text" name="company" placeholder="company" />
          optional
          <input type="number" placeholder="phone number" />
          <input type="text" placeholder="street" />
          <input type="text" placeholder="house number" />
          <input type="text" placeholder="flat number" />
    optional
    <input type="text" name="postcode" id="" />
    <input type="text" name="city" id="" />
        </div>
        <div className="space-y-4">
          {shipping.options.map((option) => (
            <div key={option.id} className="flex justify-between space-x-10">
              <div>
                <input
                  type="radio"
                  name="shipping"
                  id={option.id}
                  className="w-4 h-4 mr-2"
                  onChange={handleChange}
                  checked={shipping.selectedId === option.id}
                />
                <label htmlFor={option.id} className="text-lg">
                  {option.name}
                </label>
              </div>
              <span className="font-bold text-lg">{formatPrice(option.price)}</span>
            </div>
          ))}
        </div>
      </div>
      <AsideSummary />
    </div>
  );
}
