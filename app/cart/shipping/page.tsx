"use client";

import AsideSummary from "@components/cart/AsideSummary";
import Input from "@components/inputs/Input";
import { useShipping } from "@context/ShippingContext";
import { formatPrice } from "@utils/functions";
import { ChangeEvent, useCallback, useRef } from "react";

export default function Shipping() {
  const shipping = useShipping();
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const houseNumberRef = useRef<HTMLInputElement>(null);
  const flatNumberRef = useRef<HTMLInputElement>(null);
  const postcodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

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
        <h3 className="text-xl mb-4 mt-7">Personal</h3>
        <div className="grid grid-cols-2 gap-4 gap-y-6">
          <Input input_ref={nameRef} label_text="Name" />
          <Input input_ref={lastnameRef} label_text="Last name" />
          <Input input_ref={companyRef} label_text="Company (optional)" />
          <Input input_ref={phoneRef} label_text="Phone" type="number" />
        </div>
        <h3 className="text-xl mb-4 mt-7">Address</h3>
        <div className="grid grid-cols-2 gap-4 gap-y-6">
          <Input input_ref={streetRef} label_text="Street" />
          <Input input_ref={houseNumberRef} label_text="House number" type="number" />
          <Input input_ref={flatNumberRef} label_text="Flat number (optional)" type="number" />
          <Input input_ref={postcodeRef} label_text="Postcode" />
          <Input input_ref={cityRef} label_text="City" />
        </div>

        <div className="space-y-4 mt-10">
          <h3 className="text-xl mb-4 mt-7">Delivery</h3>
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
                <label htmlFor={option.id} className="text-base">
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
