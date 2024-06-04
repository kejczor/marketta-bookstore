"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import Button from "@components/buttons/Button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Input from "@components/inputs/Input";

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
      console.log(loginRef.current, passwordRef.current?.value);
      setErrorMessage("");
      e.preventDefault();
      const hasLogged = await signIn("credentials", {
        usernameOrEmail: loginRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      console.log(hasLogged);

      if (hasLogged?.error) return setErrorMessage("Incorrect login or password");

      // redirect("/account");
    },
    [setErrorMessage]
  );

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col items-center bg-black p-16 pt-6 rounded-xl">
        <h3 className={"text-xl px-3 py-2 text-red-600 mb-3"}>&nbsp;{errorMessage}</h3>

        <form
          onSubmit={handleSubmit}
          className={
            "space-y-3 " +
            (errorMessage &&
              "[&_input]:border-red-600 [&_input]:placeholder:text-red-400 [&_input]:animate-shake")
          }
        >
          <Input
            label_text="Username"
            input_ref={loginRef}
            name="usernameOrEmail"
            id="usernameOrEmail"
            type="text"
            placeholder="Username"
            defaultValue="admin"
          />

          <div className="relative">
            <Input
              label_text="Password"
              input_ref={passwordRef}
              id="usernameOrEmail"
              placeholder="Password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              defaultValue="123"
            />
            <button
              className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <Button className="w-full bg-blue-500 font-bold text-xl">Log in</Button>
        </form>
        <span className="text-neutral-300 mt-5">Need an account?</span>
        <Link href={"/registration"} className="text-blue-500 hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}
