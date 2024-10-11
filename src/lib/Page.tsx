import { useEffect, useRef, useState } from "react";
import { BaseModal, ModalAction } from "./components/general/BaseModal";
import { Button } from "./components/general/Button";
import { PageLimit } from "./components/general/PageLimit";
import { TableContainer } from "./components/general/TableContainer";
import { InputText } from "./components/general/input/InputText";
import { InputOptionModal } from "./components/general/input/InputOptionModal";
import { TableActionTD } from "./components/general/TableActionTD";
import { Template } from "./components/layout/Template";
import { DataType, FieldDataType, FilterParam, OptionItem, PaginatedData, SupportedDataType, TableColumn, TableField } from "./types";
import { FormModal } from "./components/form/FormModal";


export interface PageProps<T extends DataType, U extends FieldDataType> {
  columns: TableColumn[]
  getData(limit: number, offset: number, filter: FilterParam): Promise<PaginatedData<T>>
  onDelete?(row: T): Promise<void>
  deleteDataLabel?(row: T): string
  form?: {
    title?: string
    mapRowToFields(row: T): U
    fields: TableField[]
    onSubmit(form: U): Promise<void>
  }
}

export function Page<T extends DataType, U extends FieldDataType>(props: PageProps<T, U>) {
  const [data, setData] = useState<PaginatedData<T>>({ total: 0, data: [] });

  const [filter, setFilter] = useState<FilterParam>({});
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [list_options, setListOptions] = useState<{[key: string]: OptionItem[]}>(props.columns.reduce((acc: {[key: string]: OptionItem[]}, tc: TableColumn) => ({
    ...acc,
    [tc.key]: []
  }), {}));

  const [selected, setSelected] = useState<T>();
  const [form_data, setFormData] = useState<U>({} as U);
  const form_modal = useRef<ModalAction>(null);
  
  async function getInitialOptionData() {
    for (const column of props.columns.filter((tc: TableColumn) => tc.kind === 'option-filter')) {
      if (column.options) {
        list_options[column.key] = column.options;
      }
      if (column.getOptionData) {
        list_options[column.key] = await column.getOptionData();
      }
    }
    setListOptions({ ...list_options });
  }

  async function getData(_filter?: FilterParam) {
    const res = await props.getData(limit, offset, _filter ?? filter);
    setData(res);
  }

  async function submit(cb: () => void) {
    if (!props.form) {
      return;
    }

    await props.form.onSubmit(form_data);
    getData();
    cb();
    form_modal.current?.close();
  }

  async function deleteData(row: T) {
    if (confirm(`Hapus data ${props.deleteDataLabel ? props.deleteDataLabel(row) : 'ini'}?`)) {
      if (props.onDelete) {
        await props.onDelete(row);
        getData();
      }
    }
  }

  useEffect(() => {
    getInitialOptionData();
  }, []);

  useEffect(() => {
    getData();
  }, [offset, limit]);

  return (
    <div className={`p-[12px] flex flex-col gap-[12px]`}>
      { props.form && <Button
        onClick={() => {
          setFormData(props.form!.fields.reduce((acc: U, tf: TableField) => ({ ...acc, [tf.key]: '' }), {} as U));
          setSelected(undefined);
          form_modal.current?.open();
        }}
        className={`self-start`}>
        Tambah
      </Button> }
      <PageLimit limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} total={data.total} />
      <TableContainer>
        <table className={`t1`}>
          <thead>
            <tr>
              {
                props.columns.map((tc: TableColumn, i: number) => (
                  <th key={i}>
                    { tc.label }
                  </th>
                ))
              }
              <th />
            </tr>
          </thead>
          <tbody>
            <tr className={`filter`}>
              {
                props.columns.map((tc: TableColumn, i: number) => {
                  switch (tc.kind) {
                    case "basic": return <td key={i} />;
                    case "string-filter": return (
                      <td key={i}>
                        <InputText
                          value={String(filter[tc.key] ?? '')}
                          onChange={(e: any) => {
                            let value: any = e.target.value;
                            switch (tc.type) {
                              case "string": break;
                              case "number": value = value ? Number(value) : ''; break;
                              case "boolean": value = value ? value === 'true' : ''; break;
                            }
                            setFilter({ ...filter, [tc.key]: e.target.value as any });
                          }}
                          onKeyUp={(e: any) => e.key === 'Enter' && getData()}
                          placeholder={'ID'} />
                      </td>
                    );
                    case "option-filter": 
                      return (
                        <td key={i}>
                          <InputOptionModal
                            values={filter[tc.key] as SupportedDataType[]}
                            onValuesChange={(value: SupportedDataType[]) => {
                              setFilter({ ...filter, [tc.key]: value });
                              getData({ ...filter, [tc.key]: value });
                            }}
                            options={list_options[tc.key]}
                            placeholder={tc.label} />
                        </td>
                      );
                  }
                })
              }
              <td />
            </tr>
            {
              data.data.map((row: T, i: number) => (
                <tr key={i}>
                  {
                    props.columns.map((tc: TableColumn, j: number) => {
                      switch (tc.kind) {
                        case "basic": 
                        case "string-filter": return (
                          <td key={`${i}-${j}`}>
                            { row[tc.key] }
                          </td>
                        );
                        case "option-filter": return (
                          <td key={`${i}-${j}`}>
                            { list_options[tc.key].find((o: OptionItem) => o.value == row[tc.key])?.label }
                          </td>
                        );
                      }
                    })
                  }
                  <TableActionTD
                    onEdit={props.form ? () => {
                      setSelected(row);
                      setFormData(props.form!.mapRowToFields(row));
                      form_modal.current?.open();
                    } : undefined}
                    onDelete={() => deleteData(row)}
                    />
                </tr>
              ))
            }
          </tbody>
        </table>
      </TableContainer>
      <PageLimit limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} total={data.total} />
      { props.form && <BaseModal ref={form_modal}>
        <FormModal<T, U>
          title={props.form.title}
          existing={selected}
          data={form_data}
          fields={props.form.fields}
          onSubmit={submit}
          setData={setFormData} />
      </BaseModal> }
    </div>
  );
}
