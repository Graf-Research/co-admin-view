import { DataType, FieldDataType, OptionItem, SupportedDataType, TableField, TableFieldOption } from "./../../types";
import { useEffect, useState } from "react";
import { Label } from "../general/Label";
import { InputSelect } from "../general/input/InputSelect";
import { Button } from "../general/Button";
import { InputText } from "../general/input/InputText";
import { FieldInputString } from "./fields/FieldInputString";
import { FieldInputNumber } from "./fields/FieldInputNumber";
import { FieldInputOption } from "./fields/FieldInputOption";
import { FieldsInput } from "./FieldsInput";

interface FormModalProps<T, U> {
  title?: string
  existing?: T
  fields: TableField[]
  data: U
  setData(data: U): void
  onSubmit?(cb: () => void): void
}

export function FormModal<T, U extends FieldDataType>(props: FormModalProps<T, U>) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className={`flex flex-col gap-[12px] p-[12px] bg-white w-[60vw]`}>
      <div className={`font-bold`}>
        { props.existing ? 'Ubah' : 'Tambah' } { props.title ?? 'Form' }
      </div>
      <div className={`flex flex-col gap-[8px]`}>
        <FieldsInput
          fields={props.fields}
          data={props.data}
          setData={props.setData} />
        <Button 
          loading={loading}
          onClick={() => {
            setLoading(true);
            props.onSubmit && props.onSubmit(() => setLoading(false));
          }}
          className={`self-start`}>
          Simpan
        </Button>
      </div>
    </div>
  );
}
