import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Dropdown() {
  const { data: session } = useSession();

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

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all"
        ref={dropdownButtonRef}
        onClick={() => {
          if (session) {
            setIsDropdownOpen((prev) => !prev);
          } else {
            signIn();
          }
        }}
      >
        <Image
          className={`rounded-full inline aspect-square ${session ? "" : "invert"}`}
          src={session?.user?.image ?? "/svg/account-circle.svg"}
          alt="account"
          width={30}
          height={30}
        />
        <span className={`hidden sm:inline ml-2 text-base`}>{session?.user.name ?? "Log in"}</span>
      </button>

      {/* dropdown part */}
      <div
        ref={dropdownRef}
        className={`${
          isDropdownOpen ? "" : "hidden"
        } absolute right-0 top-16 text-sm divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 
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
}
