import { HTMLAttributes } from "react";
import { Header } from "./Header";

interface TemplateProps extends HTMLAttributes<HTMLDivElement> {}

export function Template(props: TemplateProps) {
  return (
    <div 
      {...props}
      className={`${props.className || ''} flex flex-col`}>
      <div className={`sticky top-0 z-[999]`}>
        <Header />
      </div>
      { props.children }
    </div>
  );
}
