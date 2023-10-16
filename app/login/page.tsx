"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import Button from "@components/buttons/Button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) redirect("/account");
  }, [session?.user]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setErrorMessage("");
      e.preventDefault();
      const hasLogged = await signIn("credentials", {
        usernameOrEmail: loginRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      console.log(hasLogged);

      if (hasLogged?.error) return setErrorMessage("Incorrect login or password");

      redirect("/account");
    },
    [setErrorMessage]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-7 [&_h1]:text-3xl [&_h1]:text-center [&_h1]:mb-5">
      <div className="flex flex-col items-center">
        <h1>Welcome back to Marketta Bookstore</h1>
        <h3 className={errorMessage ? "text-xl px-3 py-2 bg-red-600 mb-5" : "mb-2"}>{errorMessage}</h3>
        <form
          onSubmit={handleSubmit}
          className="[&_input]:bg-black [&_input]:border-2 [&_input]:py-2 [&_input]:px-4 [&_input]:outline-none [&_input:focus]:bg-gray-700 space-y-3"
        >
          <input
            ref={loginRef}
            name="usernameOrEmail"
            type="text"
            className={errorMessage && "border-red-600 placeholder:text-red-400 animate-shake"}
            placeholder="Username or E-mail"
          />
          <div className="relative">
            <input
              ref={passwordRef}
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              className={errorMessage && "border-red-600 placeholder:text-red-400 animate-shake"}
              placeholder="Password"
            />
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
