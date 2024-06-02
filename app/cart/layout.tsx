"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <div
        className={`flex mb-8 [&>a>h3]:text-xs &>a>h3]:w-1/3 [&>a>h3]:p-2 space-x-3 [&>a>h3]:border-b-4 [&>a]:grow`}
      >
        <Link href="/cart">
          <h3 className={pathname === "/cart" ? "border-blue-500" : "border-neutral-500"}>CART</h3>
        </Link>
        <Link href="/cart/shipping">
          <h3 className={pathname === "/cart/shipping" ? "border-blue-500" : "border-neutral-500"}>
            SHIPPING
          </h3>
        </Link>
        <Link href="#" className="cursor-default">
          <h3 className={pathname === "/cart/payment" ? "border-blue-500" : "border-neutral-500"}>PAYMENT</h3>
        </Link>
      </div>
      {children}
    </div>
  );
}
