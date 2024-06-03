import { authOptions } from "@app/api/auth/[...nextauth]/route";
import SignOutButton from "@components/account/SignOutButton";
import { Session, getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";

type UserIsSigned = Session & { user: { id: string; image: string; name: string } };

export default async function Account() {
  // assume that session exists because if user wasn't signed in,
  // middleware would block this page and redirect to login page
  const session = (await getServerSession(authOptions)) as UserIsSigned;

  return (
    <div className="flex">
      <aside>
        <Image
          src={session.user.image}
          alt="profile image"
          width={200}
          height={200}
          className="rounded-full"
        />
        <h2 className="text-3xl text-center mt-5 mb-8">{session.user.name}</h2>
        <ul className="list-none space-y-3 [&>li]:opacity-70">
          <li>
            <Link href="#">
              <Image
                src={"/svg/account-circle.svg"}
                alt=""
                width={30}
                height={30}
                className="invert inline"
              />
              Personal Information
            </Link>
          </li>
          <hr />
          <li>
            <Link href="#">
              <Image src={"/svg/shopping_bag.svg"} alt="" width={30} height={30} className="invert inline" />
              Purchases
            </Link>
          </li>
          <hr />
          <li>
            <Link href="#">
              <Image src={"/svg/support_agent.svg"} alt="" width={30} height={30} className="invert inline" />
              Support
            </Link>
          </li>
          <hr />
          <li>
            <Link href="#">
              <Image src={"/svg/settings.svg"} alt="" width={30} height={30} className="invert inline" />
              Settings
            </Link>
          </li>
          <hr />
          <li className="flex">
            <FaSignOutAlt size={30} />
            <SignOutButton />
          </li>
        </ul>
      </aside>
      <section className=""></section>
    </div>
  );
}
