import { InputText } from "../../general/input/InputText";
import { Label } from "../../general/Label";

interface FieldInputStringProps {
  label: string
  value: string
  onChange(value: string): void
}

export function FieldInputString(props: FieldInputStringProps) {
  return (
    <Label label={props.label}>
      <InputText
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        placeholder={props.label} />
    </Label>
  );
}
