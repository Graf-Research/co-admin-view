import { OptionItem, SupportedDataType, SupportedDataTypeLabel } from "../../../types";
import { InputSelect } from "../../general/input/InputSelect";
import { Label } from "../../general/Label";

interface FieldInputOptionProps {
  label: string
  value: SupportedDataType
  type: SupportedDataTypeLabel
  onChange(value: SupportedDataType): void
  options: OptionItem[]
}

export function FieldInputOption(props: FieldInputOptionProps) {
  return (
    <Label label={props.label}>
      <InputSelect
        value={String(props.value)}
        onChange={e => {
          let value: any = e.target.value;
          switch (props.type) {
            case "string": break;
            case "number": value = value ? Number(value) : ''; break;
            case "boolean": value = value ? value === 'true' : ''; break;
          }
          props.onChange(e.target.value as any);
        }}>
        <option value=''>Pilih { props.label }</option>
        {
          props.options.map((o: OptionItem, j: number) => (
            <option 
              key={j}
              value={String(o.value)}>
              { o.label }
            </option>
          ))
        }
      </InputSelect>
    </Label>
  );
}
