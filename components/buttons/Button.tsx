import { Josefin_Sans } from "next/font/google";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const josefin = Josefin_Sans({ weight: "500", subsets: ["latin"] });

export default function Button(
  props: {
    children: React.ReactNode;
  } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`flex justify-center items-center border-2 bg-black shadow-xl p-2 rounded-xl min-h-[3rem] transition-all duration-200 group disabled:bg-neutral-500 disabled:text-white disabled:cursor-no-drop hover:text-black hover:bg-white [&>img]:invert [&>img]:inline [&>img]:hover:filter-none ${props.className} ${josefin.className}`}
    >
      {props.children}
    </button>
  );
}
