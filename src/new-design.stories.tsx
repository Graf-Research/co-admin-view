import React from 'react';
import { CAPage } from './components/new-design/page/CAPage';
import { CAInput } from './components/new-design/tools/types';
import './main.css';

export default {
   title: 'New Design',
};

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
