"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";

import WidthController from "../WidthController";

import { useCart } from "@context/CartContext";
import LoginDropdown from "./LoginDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const cart = useCart();

  return (
    <header
      className="sticky top-0 z-30 bg-black
     text-xl drop-shadow-2xl pt-1"
    >
      <WidthController>
        <div className="flex justify-between">
          <div className="flex items-center pt-2">
            <div
              className={`flex items-center h-full border-b-2 ${
                pathname === "/"
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
              }`}
            >
              <Link className="p-2 relative group" href={"/"}>
                <Image
                  className="inline mr-1"
                  src={"/svg/logo.svg"}
                  alt="logo"
                  width={40}
                  height={40}
                />
                <span>Home</span>
                <div className="absolute transition-all duration-1000 opacity-40 inset-7 bg-white rounded-xl blur-lg group-hover:opacity-40 group-hover:inset-1 group-hover:duration-200 animate-tilt"></div>
              </Link>
            </div>
            <div
              className={`flex items-center h-full border-b-2 ${
                pathname.startsWith("/store")
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
              }`}
            >
              <Link className="p-2 relative group" href={"/store"}>
                <span>Store</span>
                <div className="absolute transition-all duration-1000 opacity-40 inset-4 bg-white rounded-xl blur-lg group-hover:opacity-40 group-hover:inset-1 group-hover:duration-200 animate-tilt"></div>
              </Link>
            </div>
            <div
              className={`flex items-center h-full border-b-2 ${
                pathname.startsWith("/about")
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
              }`}
            >
              <Link className="p-2 relative group" href={"/about"}>
                <span>About</span>
                <div className="absolute transition-all duration-1000 opacity-40 inset-4 bg-white rounded-xl blur-lg group-hover:opacity-40 group-hover:inset-1 group-hover:duration-200 animate-tilt"></div>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className={`flex items-center h-full border-b-2 ${
                pathname.startsWith("/cart")
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
              }`}
            >
              <Link className="p-2 relative group" href={"/cart"}>
                <FaCartShopping size={30} />

                {!!cart.items.length && (
                  <div className="absolute bottom-0 right-0 text-sm">
                    <div className="aspect-square flex items-center justify-center w-5 rounded-full bg-blue-500 ">
                      {cart.countTotalItemsQuantity()}
                    </div>
                  </div>
                )}
                <div className="absolute transition-all duration-1000 opacity-40 inset-4 bg-white rounded-xl blur-lg group-hover:opacity-40 group-hover:inset-1 group-hover:duration-200 animate-tilt"></div>
              </Link>
            </div>

            <div
              className={`flex items-center h-full border-b-2 ${
                pathname.startsWith("/login") || pathname.startsWith("/account")
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
              }`}
            >
              <LoginDropdown />
            </div>
          </div>
        </div>
      </WidthController>
    </header>
  );
}
