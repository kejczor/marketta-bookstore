import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function Button(
  props: {
    children: React.ReactNode;
  } & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      {...props}
      className={`flex justify-center items-center border-2 bg-black p-2 rounded-xl min-h-[3rem] transition-all duration-200 group hover:text-black hover:bg-white [&>img]:invert [&>img]:inline [&>img]:hover:filter-none ${props.className}`}
    >
      {props.children}
    </button>
  );
}
