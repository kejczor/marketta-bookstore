"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import WidthController from "./WidthController";

import { useCart } from "@context/CartContext";
import LoginDropdown from "./LoginDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const cart = useCart();

  return (
    <header className="sticky top-0 z-30 bg-gray-800 text-xl drop-shadow-2xl pt-1">
      <WidthController>
        <div className="flex justify-between">
          <div className="flex items-center pt-2">
            <div
              className={`flex items-center h-full border-b-4 ${
                pathname === "/" ? "border-b-neutral-100" : "border-b-transparent"
              }`}
            >
              <Link className="p-2" href={"/"}>
                <Image className="inline mr-1" src={"/svg/logo.svg"} alt="logo" width={40} height={40} />
                <span>Home</span>
              </Link>
            </div>
            <div
              className={`flex items-center h-full border-b-4 ${
                pathname.startsWith("/store") ? "border-b-neutral-100" : "border-b-transparent"
              }`}
              onClick={() => console.log("store")}
            >
              <Link className="p-2" href={"/store"}>
                Store
              </Link>
            </div>
            <div
              className={`flex items-center h-full border-b-4 ${
                pathname.startsWith("/about") ? "border-b-neutral-100" : "border-b-transparent"
              }`}
            >
              <Link className="p-2" href={"/about"}>
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link href={"/cart"} className="text-center">
              <div className="relative">
                <Image className="invert" src={"/svg/cart.svg"} alt="" width={30} height={30} />
                {!!cart.items.length && (
                  <span className="absolute bottom-0 -right-1 bg-blue-500 px-[6px] rounded-full text-xs">
                    {cart.countTotalItemsQuantity()}
                  </span>
                )}
              </div>
              <p className="text-xs">Cart</p>
            </Link>
            <LoginDropdown />
          </div>
        </div>
      </WidthController>
    </header>
  );
}
