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

export function SampleProduk() {
  const table: CAInput.TableStructure = {
    title: 'List Order Data X',
    columns: [
      'id:ID',
      'name:Nama Produk',
      'description:Deskripsi',
      'id_province:ID Provinsi',
      'id_city:ID City'
    ],
    column_key: 'id',
    urls: {
      get_url: 'http://localhost:3008/product',
      delete_url: 'http://localhost:3008/product'
    },
    search_query_key: 'q',
    request_init: {
      get: {
        headers: {
          'Authorization': 'Bearer XYZ'
        }
      }
    },
    custom_view: {
      name(value: string) {
        return (
          <div style={{ fontWeight: 'bold' }}>{ value }</div>
        );
      }
    }
  };

  const form: CAInput.FormStructure = {
    title: 'User Data',
    items: [
      'Data',
      'INPUT-TEXT:name:name:Nama',
      'TEXTAREA:description:description:Deskripsi',
      'Lokasi',
      [
        'SELECT:id_province:id_province:Provinsi',
        'SELECT:id_city:id_city:Kota/Kabupaten',
      ],
    ],
    options_data_source: [
      'id_province@http://localhost:3008/province{name:id}',
      'id_city@http://localhost:3008/city{name:id:?id_province}'
    ],
    urls: {
      get_detail_url: 'http://localhost:3008/product-detail',
      create_new_url: 'http://localhost:3008/product',
      update_data_url: 'http://localhost:3008/product'
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
