import { HTMLAttributes } from "react";

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  required?: boolean
  description?: string
}

export function Label(props: LabelProps) {
  return (
    <div 
      {...props}
      className={`${props.className} flex flex-col gap-[4px]`}>
      <div className={`font-normal text-zinc-500`}>
        { props.label }{ props.required ? <span className={`text-red-500`}>*</span> : '' }
      </div>
      { props.description && <div className={`text-[13px] font-light text-zinc-400`}>
        { props.description }
      </div> }
      { props.children }
    </div>
  );
}
