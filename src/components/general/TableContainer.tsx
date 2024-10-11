import { HTMLAttributes } from "react";

interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function TableContainer(props: TableContainerProps) {
  return (
    <div
      {...props}
      className={`${props.className || ''} p-[2px] shadow-[0px_2px_10px_rgba(0,0,0,.1)] rounded-[5px] overflow-x-auto`} />
  );
}
