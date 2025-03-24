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
      'type:Jenis',
      // 'phone_number:Nomor HP',
      // 'tanggal_lahir:Tgl. Lahir',
      // 'alamat:Alamat'
    ],
    column_key: 'id',
    urls: {
      get_url: 'http://localhost:3000/users',
      delete_url: 'http://localhost:3000/user'
    },
    search_query_key: 'q',
    filters: [
      'freetext:nama:Nama Lengkap',
      'select:type:User Type',
      'select:fb:F-B'
    ],
    filter_options_data_source: [
      'type,fb@http://localhost:3000/user/types'
    ],
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
          <div style={{ fontWeight: 'bold' }}>{ value }</div>
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
      'Section B',
      'TEXTAREA:alamat:alamat:Alamat',
    ],
    options_data_source: [
      'type@http://localhost:3000/user/types'
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
