import { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from "react"
import { Loading } from "./Loading"

interface ButtonProps {
  href?: string
  outline?: boolean
  loading?: boolean
}

export function Button(props: ButtonProps & (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>)) {
  const Comp = props.href ? (c: HTMLAttributes<HTMLAnchorElement>) => <a {...c} /> : (c: HTMLAttributes<HTMLButtonElement>) => <button {...c} />
  return (
    <Comp
      {...props as any}
      className={`${props.className || ''} ${props.outline ? 'text-blue-500 border border-[1.2px] border-blue-500 p-[4px_10px]' : 'bg-blue-500 text-white p-[5px_11px]'} rounded-[5px] font-semibold outline-none`}>
      { props.loading && <Loading /> }
      { !props.loading && props.children }
    </Comp>
  )
}
