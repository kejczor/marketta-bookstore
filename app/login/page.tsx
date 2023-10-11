"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

import Button from "@components/buttons/Button";
import Link from "next/link";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(data: FormData) {
    const hasLogged = await signIn("credentials", {
      usernameOrEmail: data.get("usernameOrEmail"),
      password: data.get("password"),
      // redirect: true,
      // callbackUrl: "/account",
    });

    console.log(hasLogged);

    if (!hasLogged) setErrorMessage("Incorrect login or password.");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-7 [&_h1]:text-3xl [&_h1]:text-center [&_h1]:mb-5">
      <div className="flex flex-col items-center">
        <h1>Welcome back to Marketta Bookstore</h1>
        <h3 className={errorMessage ? "text-xl px-3 py-2 bg-red-600 mb-5" : "mb-2"}>{errorMessage}</h3>
        <form
          action={handleSubmit}
          onSubmit={(e) => e.preventDefault()}
          className="[&_input]:bg-black [&_input]:border-2 [&_input]:py-2 [&_input]:px-4 [&_input]:outline-none [&_input:focus]:bg-gray-700 space-y-3"
        >
          <input name="usernameOrEmail" type="text" placeholder="Username or E-mail" />
          <div className="relative">
            <input name="password" type={isPasswordVisible ? "text" : "password"} placeholder="Password" />
            <button
              className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              <Image
                src={"/svg/show-password.svg"}
                className="invert"
                alt="show password"
                width={20}
                height={20}
              />
            </button>
          </div>
          <Button className="mx-auto" type="submit">
            LOG IN
          </Button>
        </form>
      </div>
      <div>
        <h1>Don&apos;t have an account?</h1>
        <Link href={"/registration"}>
          <Button className="mx-auto">SIGN IN NOW</Button>
        </Link>
      </div>
    </div>
  );
}
