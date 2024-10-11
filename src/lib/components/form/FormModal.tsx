import { DataType, FieldDataType, OptionItem, SupportedDataType, TableField } from "@/lib/types";
import { useEffect, useState } from "react";
import { Label } from "../general/Label";
import { InputSelect } from "../general/input/InputSelect";
import { Button } from "../general/Button";
import { InputText } from "../general/input/InputText";

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

  const [list_options, setListOptions] = useState<{[key: string]: OptionItem[]}>(props.fields.reduce((acc: {[key: string]: OptionItem[]}, tc: TableField) => ({
    ...acc,
    [tc.key]: []
  }), {}));

  async function getInitialOptionData() {
    for (const column of props.fields.filter((tc: TableField) => tc.kind === 'option')) {
      if (column.options) {
        list_options[column.key] = column.options;
      }
      if (column.getOptionData) {
        list_options[column.key] = await column.getOptionData();
      }
    }
    setListOptions({ ...list_options });
  }

  useEffect(() => {
    getInitialOptionData();
  }, []);

  return (
    <div className={`flex flex-col gap-[12px] p-[12px] bg-white w-[60vw]`}>
      <div className={`font-bold`}>
        { props.existing ? 'Ubah' : 'Tambah' } { props.title ?? 'Form' }
      </div>
      <div className={`flex flex-col gap-[8px]`}>
        {
          props.fields.map((tf: TableField, i: number) => {
            switch (tf.kind) {
              case "string": return (
                <Label key={i} label={tf.label}>
                  <InputText
                    value={props.data[tf.key] as string}
                    onChange={e => props.setData({ ...props.data, [tf.key]: e.target.value })}
                    placeholder={tf.label} />
                </Label>
              );
              case "option": return (
                <Label key={i} label={tf.label}>
                  <InputSelect
                    value={String(props.data[tf.key])}
                    onChange={e => {
                      let value: any = e.target.value;
                      switch (tf.type) {
                        case "string": break;
                        case "number": value = value ? Number(value) : ''; break;
                        case "boolean": value = value ? value === 'true' : ''; break;
                      }
                      props.setData({ ...props.data, [tf.key]: e.target.value as any });
                    }}>
                    <option value=''>Pilih { tf.label }</option>
                    {
                      list_options[tf.key].map((o: OptionItem, j: number) => (
                        <option 
                          key={`${i}-${j}`} 
                          value={String(o.value)}>
                          { o.label }
                        </option>
                      ))
                    }
                  </InputSelect>
                </Label>
              );
            }
          })
        }
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
