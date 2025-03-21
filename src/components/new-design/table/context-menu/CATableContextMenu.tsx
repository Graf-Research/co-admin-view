import React, { useRef } from "react";
import { useOutsideClick } from "../../tools/useOutsideClick";

interface CATableContextMenuProps {
  onClose(): void
  onEdit(): void
}

export function CATableContextMenu(props: CATableContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => props.onClose())

  return (
    <div ref={ref}>
      <button onClick={props.onEdit}>
        Edit
      </button>
    </div>
  );
}
