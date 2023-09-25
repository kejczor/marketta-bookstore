"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import WidthController from "./WidthController";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useCart } from "@context/CartContext";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const pathname = usePathname();
  const session = useSession();
  const cart = useCart();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const isUserLogged = session.status === "authenticated";

  return (
    <header className="sticky top-0 z-30 bg-gray-800 text-xl drop-shadow-2xl pt-1">
      <WidthController>
        <div className="flex justify-between">
          <div className="flex items-center pt-2">
            <div
              className={`flex items-center h-full border-b-4 ${
                pathname === "/"
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
              }`}
            >
              <Link className="p-2" href={"/"}>
                <Image
                  className="inline mr-1"
                  src={"/svg/logo.svg"}
                  alt="logo"
                  width={40}
                  height={40}
                />
                <span>Home</span>
              </Link>
            </div>
            <div
              className={`flex items-center h-full border-b-4 ${
                pathname.startsWith("/store")
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
              }`}
              onClick={() => console.log("store")}
            >
              <Link className="p-2" href={"/store"}>
                Store
              </Link>
            </div>
            <div
              className={`flex items-center h-full border-b-4 ${
                pathname.startsWith("/about")
                  ? "border-b-neutral-100"
                  : "border-b-transparent"
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
                <Image
                  className="invert"
                  src={"/svg/cart.svg"}
                  alt=""
                  width={30}
                  height={30}
                />
                {cart.items.length && (
                  <span className="absolute bottom-0 -right-1  bg-blue-500 px-[6px] rounded-full text-sm font-bold">
                    {cart.items.length}
                  </span>
                ) }
              </div>
              <p className="text-xs">Cart</p>
            </Link>

            {/* <div className="relative">
              <button
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all"
                onClick={() => setDropdownVisible((prev) => !prev)}
              >
                <Image
                  className={`rounded-full inline aspect-square ${isUserLogged ? "" : "invert"}`}
                  src={session.data?.user?.image ?? "/svg/account-circle.svg"}
                  alt="account"
                  width={30}
                  height={30}
                />
                <span className={`hidden sm:inline ml-2 text-base`}>{session.data?.user.name ?? "Log in"}</span>
              </button>

              <div
                className={`${
                  dropdownVisible ? "" : "hidden"
                } absolute right-0 top-16 text-sm divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 
                [&>div]:py-2 [&>div>*]:py-2 [&>div>*]:px-4 [&>div>*:hover]:bg-gray-600 [&>div>*:hover]:text-white [&>div>*]:block`}
              >
                <div>
                  <Link href="/account">Dashboard</Link>
                  <Link href="#">Settings</Link>
                  <Link href="#">Payments</Link>
                </div>
                <div>
                  <button className="w-full text-start" onClick={() => signOut()}>
                    Sign out
                  </button>
                </div>
              </div>
            </div> */}
            <Dropdown />
          </div>
        </div>
      </WidthController>
    </header>
  );
}
