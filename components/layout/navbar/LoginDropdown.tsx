import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";
import { redirect } from "next/navigation";
import LoginButton from "./LoginButton";

export default function Dropdown() {
  const { status } = useSession();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const dropdown = (
    <div className="group absolute top-0 right-0 h-20 w-10">
      <div
        ref={dropdownRef}
        className={`hidden group-hover:block absolute right-0 top-16 text-sm divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 
            [&>div]:py-2 [&>div>*]:py-2 [&>div>*]:px-4 [&>div>a:hover]:bg-gray-600 [&>div>a:hover]:text-white [&>div>a]:block`}
      >
        <div>
          <Link onClick={() => setIsDropdownOpen(false)} href="/account">
            Dashboard
          </Link>
          <Link onClick={() => setIsDropdownOpen(false)} href="#">
            Settings
          </Link>
          <Link onClick={() => setIsDropdownOpen(false)} href="#">
            Payments
          </Link>
        </div>
        <div>
          <button
            className="w-full text-start bg-red-400 hover:bg-red-300"
            onClick={() => {
              signOut();
              setIsDropdownOpen(false);
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <LoginButton />

      {status === "authenticated" && dropdown}
    </div>
  );
}
