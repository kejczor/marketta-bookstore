import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useCart } from "@context/CartContext";
import type { StoreitemBasicDetails } from "@app/api/storeitems/route";

export default function QuantitySelectDropdown({ details }: { details: StoreitemBasicDetails }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);

  const cart = useCart();
  const inCartQuantity = cart.quantityInCart(details.id);

  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;

    document.addEventListener(
      "click",
      ({ target }) =>
        target !== window &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(target as Element) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Element) &&
        setIsDropdownOpen(false),
      {
        once: true,
        capture: true,
      }
    );
  }, [isDropdownOpen]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // have to do it this way because for unknown reason
    // e.target.valueAsNumber returns NaN
    const inputAsNumber = Number(e.target.value);
    if (
      (Number.isInteger(inputAsNumber) && inputAsNumber > 0 && inputAsNumber < 100) ||
      e.target.value === ""
    ) {
      setInputValue(e.target.value);
    }
  }, []);

  const handleApply = useCallback(() => {
    if (Number(inputValue)) {
      cart.setQuantity(details.id, Number(inputValue));
    }
    setIsInputActive(false);
  }, [inputValue, cart, details.id]);

  return (
    <div className="relative text-lg">
      {isInputActive ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          autoFocus
          onBlur={handleApply}
          onKeyDown={({ key }) => key === "Enter" && handleApply()}
          className="outline-none w-16 py-2 bg-gray-700 hover:bg-gray-600 text-center rounded-2xl"
        />
      ) : (
        <button
          className="w-16 py-2 bg-gray-700 hover:bg-gray-600 rounded-2xl"
          ref={dropdownButtonRef}
          onClick={() => {
            setIsDropdownOpen((prev) => !prev);
          }}
        >
          <span className="px-3">{inCartQuantity}</span>
          <Image
            src={"/svg/expand-icon.svg"}
            width={16}
            height={16}
            alt="expand icon"
            className="invert inline"
          />
        </button>
      )}

      {/* dropdown part */}
      <div
        ref={dropdownRef}
        className={`${
          isDropdownOpen ? "scale-y-100" : "scale-y-0"
        } absolute left-0 overflow-hidden -top-36 text-sm divide-y divide-gray-100 rounded-2xl shadow w-16 bg-gray-700 transition-all 
                   [&>div>*]:py-2 [&>div>*]:px-4 [&>div>*:hover]:bg-gray-600 [&>div>*:hover]:text-white [&>div>*]:block`}
      >
        <div>
          {Array.from([...Array(9)].keys())
            .map((i) => ++i)
            .map((quantity) =>
              quantity === 9 ? (
                <button
                  key={quantity}
                  className={`w-full ${quantity <= inCartQuantity && "font-bold"}`}
                  onClick={() => {
                    setIsInputActive(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  9+
                </button>
              ) : (
                <button
                  key={quantity}
                  className={`w-full ${quantity === inCartQuantity && "font-bold"}`}
                  onClick={() => {
                    cart.setQuantity(details.id, quantity);
                    setIsDropdownOpen(false);
                  }}
                >
                  {quantity}
                </button>
              )
            )}
        </div>
      </div>
    </div>
  );
}
