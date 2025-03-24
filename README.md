# Co Admin View

## Install

```bash
yarn add co-admin-view
```

```bash
npm install --save co-admin-view
```

## How to Use

### General Table

![](images/1.png)

### Table Search & Filter

![](images/2.png)

### Form Data

![](images/3.png)

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
import 'co-admin-view/dist/index.css'

import { CAInput, CAPage } from "co-admin-view";

export function Preview() {
  const table: CAInput.TableStructure = {

    // General
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
      get_url: 'http://localhost:3000/users',
      delete_url: 'http://localhost:3000/user'
    },

    // Search & Filter
    search_query_key: 'q',
    filters: [
      'freetext:nama:Nama Lengkap',
      'select:type:User Type',
      'select:fb:F-B'
    ],
    filter_options_data_source: [
      'type,fb@http://localhost:3000/user/types'
    ],

    // Advanced Features
    request_init: {
      get: {
        headers: {
          'Authorization': 'Bearer XYZ'
        }
      }
    },
    custom_view: {
      nama(value: string) {
        return (
          <div style={{ color: 'red', fontWeight: 'bold' }}>{ value }</div>
        );
      },
      type(value: string) {
        return (
          <div style={{ display: 'flex' }}>
            <div 
              style={{
                borderRadius: 8,
                padding: '6px 12px',
                background: '#AAA',
                color: 'white'
              }}>
              { value }
            </div>
          </div>
        );
      }
    }
  };

  const form: CAInput.FormStructure = {
    
    // General
    title: 'User Data',
    items: [
      'Section A',
      'INPUT-TEXT:nama:nama:Nama',
      [
        'INPUT-TEXT:email:email:Email',
        'INPUT-TEXT:phone_number:phone_number:Nomor HP',
      ],
      [
        'SELECT:type:type:Jenis',
        'INPUT-TEXT:tanggal_lahir:tanggal_lahir:Tanggal Lahir (YYYY-MM-DD)',
      ],
      'TEXTAREA:alamat:alamat:Alamat',
      'INPUT-NUMBER:n:n:N',
    ],
    options_data_source: [
      'type@http://localhost:3000/user/types'
    ],
    urls: {
      get_detail_url: 'http://localhost:3000/user',
      create_new_url: 'http://localhost:3000/user',
      update_data_url: 'http://localhost:3000/user'
    },

    // Advanced Features
    custom_view: {
      alamat(value: string, setValue: (value: string) => void) {
        return (
          <textarea
            style={{ outline: 'none' }}
            value={value}
            onChange={e => setValue(e.target.value)} />
        );
      }
    },
    allow_anonymous_data_key: true
  };

  return (
    <CAPage
      title={'Orders Data'}
      table={table}
      form={form} />
  );
}
```
