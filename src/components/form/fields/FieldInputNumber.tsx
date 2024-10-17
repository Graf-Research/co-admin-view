import { InputText } from "../../general/input/InputText";
import { Label } from "../../general/Label";

interface FieldInputNumberProps {
  label: string
  value: number
  onChange(value: number): void
}

export function FieldInputNumber(props: FieldInputNumberProps) {
  return (
    <Label label={props.label}>
      <InputText
        value={props.value}
        type={'number'}
        onChange={e => props.onChange(e.target.value?.length > 0 ? +e.target.value : '' as any)}
        placeholder={props.label} />
    </Label>
  );
}
