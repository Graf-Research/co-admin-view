import { HTMLAttributes, InputHTMLAttributes } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputText(props: InputTextProps) {
  return (
    <input 
      {...props}
      className={`${props.className || ''} bg-zinc-50 border border-[1.5px] border-zinc-200 focus:border-blue-500 p-[4px_6px] rounded-[3px] outline-none w-full`} />
  );
}
