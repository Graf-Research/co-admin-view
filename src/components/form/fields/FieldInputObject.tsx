import { FieldDataType, TableField } from "../../../types"
import { Label } from "../../general/Label"
import { FieldsInput } from "../FieldsInput"

interface FieldInputObjectProps {
  label: string
  value: FieldDataType
  onChange(value: FieldDataType): void
  fields: TableField[]
}

export function FieldInputObject(props: FieldInputObjectProps) {
  return (
    <Label label={props.label}>
      <div className={`border border-px border-zinc-200 p-[8px] rounded-[4px]`}>
        <FieldsInput
          fields={props.fields}
          data={props.value ?? {}}
          setData={props.onChange} />
      </div>
    </Label>
  );
}
