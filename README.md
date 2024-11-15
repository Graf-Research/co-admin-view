# Co-Admin View

Create easy Admin CRUD view in no time.

## Milestone

| Fitur | Deskripsi | Status |
|---|---|---|
| Basic CRUD data | Pengguna dapat menampilkan, mengubah, menambah, dan menghapus data secara lokal maupun menggunakan API | ✓ Selesai |
| Halaman & limit data | Pengguna dapat menampilkan data dengan konsep limit & offset seperti pada SQL | ✓ Selesai |
| Deep key row access | Data row dapat ditampilkan dengan string berupa akses object menggunakan dot `.`, misal: `group1.subgroup2.mydata` | ✓ Selesai |
| Custom Field | Saat ini field yang tersedia berupa teks dan pilihan (dropdown), pengguna seharusnya dapat menambahkan field custom yang bukan hanya teks dan pilihan | ✓ Selesai |
| Custom Row Action | Tambah icon aksi dengan fungsi khusus pada setiap baris data | ✓ Selesai |
| Static Field | Saat ini seluruh data yang ada pada form merupakan data isian, baiknya tidak seluruh data harus dapat diubah ketika form ubah data dilakukan. Pengguna dapat menampilkan data yang tidak dapat diubah pada form perubahan data | - |
| Custom Button | Saat ini terdapat tombol "Tambah" di bagian atas tabel untuk menambah data baru, pada kasus tertentu pengguna membutuhkan tombol custom yang berfungsi sesuai dengan kebutuhan pengguna | - |

## Installation

Install dependency
```bash
npm install --save co-admin-view
```

Update Tailwind config file
```js
const config: Config = {
  ...,
  content: [
    ...,
    "./node_modules/co-admin-view/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  ...
};
export default config;

```

## Example Usage

```typescript
import React from 'react';
import { useRef } from "react";
import { DataType, FieldDataType, FilterParam, OptionItem, PaginatedData, TableColumn, TableField } from './types';
import { Page } from './Page';

interface MyItemType extends DataType {
  id: number
  id_lokasi: number
  user: {
    name: string
  }
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
    user: {
      name: 'testing1'
    },
  }, {
    id: 2,
    id_lokasi: 3,
    user: {
      name: 'testing2'
    },
  }, {
    id: 3,
    id_lokasi: 2,
    user: {
      name: 'testing3'
    },
  }, {
    id: 5,
    id_lokasi: 1,
    user: {
      name: 'testing5'
    },
  }, {
    id: 7,
    id_lokasi: 1,
    user: {
      name: 'testing7'
    },
  }, {
    id: 10,
    id_lokasi: 3,
    user: {
      name: 'testing10'
    },
  }, {
    id: 15,
    id_lokasi: 2,
    user: {
      name: 'testing15'
    },
  }, {
    id: 23,
    id_lokasi: 1,
    user: {
      name: 'testing23'
    },
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
    key: 'user.name',
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

        if (param.fullname) {
          ok &&= row.user.name.includes(param.fullname as string);
        }

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
          user: {
            name: form.name
          },
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
    deleteDataLabel={r => r.user.name}
    form={{
      title: 'Data',
      fields: table_fields,
      mapRowToFields: (row: MyItemType) => ({ id: row.id, id_lokasi: row.id_lokasi, name: row.user.name }),
      onSubmit: submitData
    }} />
}
```
