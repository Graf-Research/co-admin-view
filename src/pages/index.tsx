import { Page } from "@/lib/Page";
import { DataType, FieldDataType, FilterParam, OptionItem, PaginatedData, TableColumn, TableField } from "@/lib/types";
import { useRef } from "react";

interface MyItemType extends DataType {
  id: number
  id_lokasi: number
  fullname: string
}
interface MyFieldType extends FieldDataType {
  id?: number
  id_lokasi: number
  name: string
}

export default function() {
  const list_data = useRef<MyItemType[]>([{
    id: 1,
    id_lokasi: 1,
    fullname: 'testing1',
  }, {
    id: 2,
    id_lokasi: 3,
    fullname: 'testing2',
  }, {
    id: 3,
    id_lokasi: 2,
    fullname: 'testing3',
  }, {
    id: 5,
    id_lokasi: 1,
    fullname: 'testing5',
  }, {
    id: 7,
    id_lokasi: 1,
    fullname: 'testing7',
  }, {
    id: 10,
    id_lokasi: 3,
    fullname: 'testing10',
  }, {
    id: 15,
    id_lokasi: 2,
    fullname: 'testing15',
  }, {
    id: 23,
    id_lokasi: 1,
    fullname: 'testing23',
  }].reverse());

  const options_lokasi: OptionItem[] = [{
    label: 'Jakarta',
    value: 1
  }, {
    label: 'Bandung',
    value: 2
  }, {
    label: 'Semarang',
    value: 3
  }];

  const table_columns: TableColumn[] = [{
    kind: 'string-filter',
    label: 'ID',
    key: 'id',
    type: 'number'
  }, {
    kind: 'string-filter',
    label: 'Nama',
    key: 'fullname',
    type: 'string'
  }, {
    kind: 'option-filter',
    label: 'Lokasi',
    key: 'id_lokasi',
    type: 'number',
    options: options_lokasi
  }];

  const table_fields: TableField[] = [{
    kind: 'string',
    label: 'Nama',
    key: 'name'
  }, {
    kind: 'option',
    label: 'Lokasi',
    key: 'id_lokasi',
    type: 'number',
    options: options_lokasi
  }];

  async function getData(limit: number, offset: number, param: FilterParam): Promise<PaginatedData<any>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      total: list_data.current.length,
      data: list_data.current.slice(offset, offset + limit).filter(row => {
        let ok = true;

        if (param.id) {
          ok &&= row.id == param.id;
        }
        
        if (param.id_lokasi && Array.isArray(param.id_lokasi) && param.id_lokasi.length > 0) {
          ok &&= param.id_lokasi.includes(row.id_lokasi);
        }

        return ok;
      })
    }
  }

  async function submitData(form: MyFieldType) {
    await new Promise(resolve => setTimeout(resolve, 200));
    if (form.id) {
      list_data.current = list_data.current.map(r => {
        if (r.id == form.id) {
          return {
            ...r,
            id_lokasi: form.id_lokasi,
            fullname: form.name
          };
        }
        return r;
      });
    } else {
      list_data.current = [
        {
          id_lokasi: form.id_lokasi,
          fullname: form.name,
          id: new Date().getTime()
        },
        ...list_data.current
      ];
    }
  }

  async function deleteData(item: MyItemType) {
    await new Promise(resolve => setTimeout(resolve, 200));
    list_data.current = list_data.current.filter(r => r.id != item.id);
  }

  return <Page<MyItemType, MyFieldType>
    getData={getData}
    columns={table_columns}
    onDelete={deleteData}
    deleteDataLabel={r => r.fullname}
    form={{
      title: 'Data',
      fields: table_fields,
      mapRowToFields: (row: MyItemType) => ({ id: row.id, id_lokasi: row.id_lokasi, name: row.fullname }),
      onSubmit: submitData
    }} />
}
