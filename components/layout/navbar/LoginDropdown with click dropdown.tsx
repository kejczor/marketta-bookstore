import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";
import { redirect } from "next/navigation";

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
        className="p-1 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all"
        ref={dropdownButtonRef}
        onClick={() => {
          if (session) {
            setIsDropdownOpen((prev) => !prev);
          } else {
            redirect("/login");
          }
        }}
      >
        <FaUser size={30} />
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
