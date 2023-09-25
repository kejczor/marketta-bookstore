import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export default async function Account() {
  const session = await getServerSession(authOptions)!;

  return (
    <div className="flex">
      <aside className="bg-slate-400 bg-opacity-75 rounded-xl p-5">aside</aside>
      <section className="">
        <h1>{session?.user.name}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </section>
    </div>
  );
}
