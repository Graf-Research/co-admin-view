import { HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function InputSelect(props: InputSelectProps) {
  return (
    <select 
      {...props}
      className={`${props.className || ''} bg-zinc-50 border border-[1.5px] border-zinc-200 focus:border-blue-500 p-[5px_6px] rounded-[3px] outline-none w-full`} />
  );
}
