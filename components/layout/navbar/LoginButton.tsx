import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa6";

export default function LoginButton() {
  const { status } = useSession();
  const pathname = usePathname();

  return (
    <div>
      {" "}
      <Link
        href={status === "authenticated" ? "/account" : "/login"}
        className="block p-1 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all"
      >
        <FaUser size={30} />
      </Link>
    </div>
  );
}
