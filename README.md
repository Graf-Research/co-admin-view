# Co Admin View

## Install

```bash
yarn add co-admin-view
```

```bash
npm install --save co-admin-view
```

## Usage Example


```tsx
// lokasi import css mungkin berbeda-beda tergantung framework yang digunakan
// pada NextJS, tambahkan import css di _app.tsx
// pada Create React App tambahkan di file yang sama
import 'co-admin-view/dist/index.css'

import { CAInput, CAPage } from "co-admin-view";

export function Minimal() {
  const table: CAInput.TableStructure = {
    title: 'List Order Data X',
    columns: [
      'id:ID',
      'nama:Nama',
      'email:Email',
      'phone_number:Nomor HP',
      'type:Jenis',
      'tanggal_lahir:Tgl. Lahir',
      'alamat:Alamat'
    ],
    column_key: 'id',
    urls: {
      get_url: 'http://localhost:3000/users'
    }
  };

  return (
    <CAPage
      title={'Users'}
      table={table} />
  );
}
```

```tsx
// lokasi import css mungkin berbeda-beda tergantung framework yang digunakan
// pada NextJS, tambahkan import css di _app.tsx
// pada Create React App tambahkan di file yang sama
import 'co-admin-view/dist/index.css'

import { CAInput, CAPage } from "co-admin-view";

export function Preview() {
  const table: CAInput.TableStructure = {
    title: 'List Order Data X',
    columns: [
      'id:ID',
      'nama:Nama',
      'email:Email',
      'phone_number:Nomor HP',
      'type:Jenis',
      'tanggal_lahir:Tgl. Lahir',
      'alamat:Alamat'
    ],
    column_key: 'id',
    search_query_key: 'q',
    urls: {
      get_url: 'http://localhost:3000/users',
      delete_url: 'http://localhost:3000/user'
    },
    request_init: {
      get: {
        headers: {
          'Authorization': 'Bearer XYZ'
        }
      }
    },
    custom_view: {
      nama(nama: string) {
        return (
          <div style={{ color: 'red', fontWeight: 'bold' }}>{ nama }</div>
        );
      }
    }
  };

  const form: CAInput.FormStructure = {
    title: 'User Data',
    items: [
      'Section A',
      'INPUT-TEXT:nama:nama:Nama',
      [
        'INPUT-TEXT:email:email:Email',
        'INPUT-TEXT:phone_number:phone_number:Nomor HP',
      ],
      [
        'INPUT-TEXT:type:type:Jenis',
        'INPUT-TEXT:tanggal_lahir:tanggal_lahir:Tanggal Lahir (YYYY-MM-DD)',
      ],
      'CUSTOM:alamat:alamat:Alamat',
    ],
    options_data_source: [
      'id_user,id_user_alternative@https://lalala.com/list-data-x'
    ],
    urls: {
      get_detail_url: 'http://localhost:3000/user',
      create_new_url: 'http://localhost:3000/user',
      update_data_url: 'http://localhost:3000/user'
    },
    custom_view: {
      alamat(value: string, setValue: (value: string) => void) {
        return (
          <textarea
            style={{ outline: 'none' }}
            value={value}
            onChange={e => setValue(e.target.value)} />
        );
      }
    }
  };

  return (
    <CAPage
      title={'Orders Data'}
      table={table}
      form={form} />
  );
}
```
