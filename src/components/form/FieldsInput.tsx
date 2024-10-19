import { useEffect, useState } from "react";
import { FieldDataType, OptionItem, SupportedDataType, TableField, TableFieldOption } from "../../types";
import { FieldInputNumber } from "./fields/FieldInputNumber";
import { FieldInputOption } from "./fields/FieldInputOption";
import { FieldInputString } from "./fields/FieldInputString";
import { FieldInputObject } from "./fields/FieldInputObject";
import { MultipleInputWrapper } from "../general/input/MultipleInputWrapper";
import { Label } from "../general/Label";

interface FieldsInputProps<U> {
  fields: TableField[]
  data: U
  setData(data: U): void
}

export function FieldsInput<U extends FieldDataType>(props: FieldsInputProps<U>) {
  const [list_options, setListOptions] = useState<{[key: string]: OptionItem[]}>(props.fields.reduce((acc: {[key: string]: OptionItem[]}, tc: TableField) => ({
    ...acc,
    [tc.key]: []
  }), {}));

  async function getInitialOptionData() {
    for (const column of props.fields.filter((tc: TableField) => tc.kind === 'option')) {
      if ((column as TableFieldOption).options) {
        list_options[column.key] = (column as TableFieldOption).options!;
      }
      if ((column as TableFieldOption).getOptionData) {
        list_options[column.key] = await (column as TableFieldOption).getOptionData!();
      }
    }
    setListOptions({ ...list_options });
  }

  useEffect(() => {
    getInitialOptionData();
  }, []);

  return (
    <div className={`flex flex-col gap-[8px]`}>
      {
        props.fields.map((tf: TableField, i: number) => {
          switch (tf.kind) {
            case "string": 
              if (tf.array) {
                return (
                  <Label 
                    key={i}
                    label={tf.label}>
                    <MultipleInputWrapper<string>
                      v3
                      data={(props.data?.[tf.key] as any[]) ?? []}
                      setData={(data: any[]) => props.setData({ ...props.data, [tf.key]: data })}
                      renderItem={(value: string, onValueChange: (t: string) => void, j: number) => (
                        <FieldInputString
                          key={j}
                          value={value}
                          onChange={onValueChange}
                          label={`${tf.label} ${j + 1}`} />
                      )}
                      newItemValue={''}
                      prefixTitle={tf.label} />
                  </Label>
                );
              }
              return (
                <FieldInputString
                  key={i}
                  value={props.data[tf.key] as string}
                  onChange={value => props.setData({ ...props.data, [tf.key]: value })}
                  label={tf.label} />
              );
            case "number": 
              if (tf.array) {
                return (
                  <Label 
                    key={i}
                    label={tf.label}>
                    <MultipleInputWrapper<number>
                      v3
                      data={(props.data?.[tf.key] as any[]) ?? []}
                      setData={(data: any[]) => props.setData({ ...props.data, [tf.key]: data })}
                      renderItem={(value: number, onValueChange: (t: number) => void, j: number) => (
                        <FieldInputNumber
                          key={j}
                          value={value}
                          onChange={onValueChange}
                          label={`${tf.label} ${j + 1}`} />
                      )}
                      newItemValue={'' as any}
                      prefixTitle={tf.label} />
                  </Label>
                );
              }
              return (
                <FieldInputNumber
                  key={i}
                  value={props.data[tf.key]}
                  onChange={value => props.setData({ ...props.data, [tf.key]: value })}
                  label={tf.label} />
              );
            case "option": 
              if (tf.array) {
                return (
                  <Label 
                    key={i}
                    label={tf.label}>
                    <MultipleInputWrapper<SupportedDataType>
                      v3
                      data={(props.data?.[tf.key] as any[]) ?? []}
                      setData={(data: any[]) => props.setData({ ...props.data, [tf.key]: data })}
                      renderItem={(value: number, onValueChange: (t: number) => void, j: number) => (
                        <FieldInputOption
                          key={j}
                          value={value}
                          type={tf.type}
                          onChange={onValueChange}
                          options={list_options[tf.key]}
                          label={`${tf.label} ${j + 1}`} />
                      )}
                      newItemValue={'' as any}
                      prefixTitle={tf.label} />
                  </Label>
                );
              }
              return (
                <FieldInputOption
                  key={i}
                  label={tf.label}
                  type={tf.type}
                  value={String(props.data[tf.key])}
                  onChange={value => props.setData({ ...props.data, [tf.key]: value })}
                  options={list_options[tf.key]} />
              );
            case "object": 
              if (tf.array) {
                return (
                  <Label 
                    key={i}
                    label={tf.label}>
                    <MultipleInputWrapper<FieldDataType>
                      v3
                      data={(props.data?.[tf.key] as any[]) ?? []}
                      setData={(data: any[]) => props.setData({ ...props.data, [tf.key]: data })}
                      renderItem={(value: FieldDataType, onValueChange: (t: FieldDataType) => void, j: number) => (
                        <FieldInputObject
                          key={j}
                          value={value}
                          onChange={onValueChange}
                          label={`${tf.label} ${j + 1}`}
                          fields={tf.fields} />
                      )}
                      newItemValue={'' as any}
                      prefixTitle={tf.label} />
                  </Label>
                );
              }
              return (
                <FieldInputObject
                  key={i}
                  label={tf.label}
                  value={props.data[tf.key]}
                  onChange={value => props.setData({ ...props.data, [tf.key]: value })}
                  fields={tf.fields} />
              );
            case "custom":
              if (tf.array) {
                return (
                  <Label 
                    key={i}
                    label={tf.label}>
                    <MultipleInputWrapper<FieldDataType>
                      v3
                      data={(props.data?.[tf.key] as any[]) ?? []}
                      setData={(data: any[]) => props.setData({ ...props.data, [tf.key]: data })}
                      renderItem={(value: FieldDataType, onValueChange: (t: FieldDataType) => void, j: number) => (
                        <Label 
                          key={j}
                          label={tf.label}>
                          { tf.view(value, onValueChange, j) }
                        </Label>
                      )}
                      newItemValue={'' as any}
                      prefixTitle={tf.label} />
                  </Label>
                );
              }
              return (
                <Label 
                  key={i}
                  label={`${tf.label} ${i + 1}`}>
                  { tf.view(props.data[tf.key], v => props.setData({ ...props.data, [tf.key]: v}), 0) }
                </Label>
              );
          }
        })
      }
    </div>
  );
}
