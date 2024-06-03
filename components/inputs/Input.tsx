import { DetailedHTMLProps, InputHTMLAttributes, LegacyRef } from "react";

export default function Input(
  props: { label_text: string; input_ref: LegacyRef<HTMLInputElement> } & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "ref"
  >
) {
  return (
    <div className="relative">
      <input
        ref={props.input_ref}
        autoCorrect="off"
        autoComplete="off"
        className={"bg-black border-2 py-2 px-4 outline-none focus:bg-slate-800 " + props.className}
        {...props}
      />
      <label htmlFor="usernameOrEmail" className="absolute left-1 px-2 bg-black text-sm -top-3 rounded-xl">
        {props.label_text}
      </label>
    </div>
  );
}
