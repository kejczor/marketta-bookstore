"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@components/buttons/Button";

export default function Registration() {
  const session = useSession();
  const [arePasswordsVisible, setArePasswordsVisible] = useState([false, false]);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(data: FormData) {
    await signIn("credentials", {
      usernameOrEmail: data.get("usernameOrEmail"),
      password: data.get("password"),
      redirect: false,
    });

    setErrorMessage("Incorrect login or password.");
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      redirect("/account");
    }
  }, [session.status]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-7">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl text-center mb-5">Welcome back to Gosia Bookstore</h1>
        <h3 className={errorMessage ? "text-xl px-3 py-2 bg-red-600 mb-5" : "mb-2"}>{errorMessage}</h3>
        <form
          action={handleSubmit}
          className="[&_input]:bg-black [&_input]:border-2 [&_input]:py-2 [&_input]:px-4 [&_input]:outline-none [&_input:focus]:bg-gray-900 space-y-3"
        >
          <input name="usernameOrEmail" type="text" placeholder="Username or E-mail" />
          {["Password", "Retype password"].map((currPlaceholder, i) => (
            <div key={i} className="relative">
              <input
                name="password"
                type={arePasswordsVisible[i] ? "text" : "password"}
                placeholder={currPlaceholder}
              />
              <button
                className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
                type="button"
                onClick={() =>
                  setArePasswordsVisible((prev) => {
                    prev[i] = true;
                    return prev;
                  })
                }
              >
                <Image src={"/svg/show-password.svg"} className="invert" alt="show password" width={20} height={20} />
              </button>
            </div>
          ))}
          <Button type="submit">SIGN IN</Button>
        </form>
      </div>
      <div>Login</div>
    </div>
  );
}
