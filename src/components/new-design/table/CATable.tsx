import React, { useEffect, useRef, useState } from "react";
import { CATableMetaAction } from "./meta-action/CATableMetaAction";
import { CATableLimitOffset } from "./limit-offset/CATableLimitOffset";
import { CAInput, CAOutput } from "../tools/types";
import { CAReader } from "../tools/CAReader";
import { CATableContextMenu } from "./context-menu/CATableContextMenu";

interface CATableProps {
  refreshDataTrigger: Date
  structure: CAInput.TableStructure
  onEdit?(key: any): void
}

type Row = {[key: string]: any}
interface PaginationData {
  total: number
  data: Row[]
}

export function CATable(props: CATableProps) {
  const out_structure = useRef<CAOutput.TableStructure>();
  if (!out_structure.current) {
    try {
      out_structure.current = new CAReader().getTableStructure(props.structure);
    } catch (err: any) {
      return (
        <div className="table-container" style={{ background: '#FFEDD5' }}>
          <pre style={{ whiteSpace: 'normal' }}>{ err.toString() }</pre>
        </div>
      );
    }
  }

  const [loading_fetch_data, setLoadingFetchData] = useState<boolean>(false);
  const [loading_delete_data, setLoadingDeleteData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaginationData>({ total: 0, data: [] });
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [list_selected_key, setListSelectedKey] = useState<any[]>([]);
  const [active_context_menu_key, setActiveContextMenuKey] = useState<any | null>(null);
  const [fetch_params, setFetchParams] = useState<{[key: string]: any}>({});
  const all_selected = data.data.reduce((acc: boolean, curr: Row) => acc && list_selected_key.includes(curr[out_structure.current!.column_key]), true);
  const with_delete_feature = Boolean(out_structure.current.urls.delete_url);

  function toggleSelectAll() {
    if (list_selected_key.length == 0 || !all_selected) {
      setListSelectedKey(data.data.map(c => c[out_structure.current!.column_key]));
    } else {
      setListSelectedKey([]);
    }
  }

  async function fetchData() {
    setLoadingFetchData(true);
    try {
      const query = new URLSearchParams({
        limit,
        offset,
        ...fetch_params
      } as any).toString();
      const result: PaginationData = await (await fetch(`${out_structure.current!.urls.get_url}?${query}`)).json();
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoadingFetchData(false);
    }
  }

  async function deleteData() {
    if (!with_delete_feature) {
      return;
    }
    if (!confirm(`Delete ${list_selected_key.length} item(s)?`)) {
      return;
    }
    setLoadingDeleteData(true);
    try {
      const delete_query = new URLSearchParams({ keys: list_selected_key.join(',') } as any).toString();
      const res = await fetch(`${out_structure.current!.urls.delete_url}?${delete_query}`, { method: 'delete' });

      if (res.ok) {
        const fetch_data_query = new URLSearchParams({
          limit,
          offset
        } as any).toString();
        const fetch_data_result: PaginationData = await (await fetch(`${out_structure.current!.urls.get_url}?${fetch_data_query}`)).json();
        setData(fetch_data_result);
        setListSelectedKey([]);
        setError(null);
      } else {
        setError(await res.text());
      }
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoadingDeleteData(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [limit, offset, props.refreshDataTrigger, fetch_params]);

  return (
    <div className="table-container">
      { error && <pre style={{ fontSize: 12, whiteSpace: 'normal', background: '#FECACA' }}>{ new Date().toLocaleString() }<br/>{ error }</pre> }
      <CATableMetaAction 
        onSearch={(q: string) => {
          if (out_structure.current?.search_query_key) {
            setFetchParams({ ...fetch_params, [out_structure.current.search_query_key]: q });
          }
        }}
        structure={out_structure.current} />
      { (list_selected_key.length > 0 && with_delete_feature) && <div className={'delete'}>
        <button onClick={deleteData}>
          Delete { list_selected_key.length } item(s)
        </button>
      </div>}
      <table>
        <thead>
          <tr>
            { with_delete_feature && <th>
              <input 
                checked={all_selected}
                onChange={() => toggleSelectAll()}
                type={'checkbox'} />
            </th> }
            {
              out_structure.current.columns.map((tc: CAOutput.TableColumn, i: number) => (
                <th key={i}>
                  { tc.label ?? tc.key }
                </th>
              ))
            }
            { props.onEdit && <th /> }
          </tr>
        </thead>
        <tbody>
          {
            data.data.map((row: Row, i: number) => (
              <tr key={i}>
                { with_delete_feature && <td>
                  <input 
                    checked={list_selected_key.includes(row[out_structure.current!.column_key])}
                    onChange={() => {
                      const pk = row[out_structure.current!.column_key];
                      if (list_selected_key.includes(pk)) {
                        setListSelectedKey(list_selected_key.filter(c => c !== pk));
                      } else {
                        setListSelectedKey([ ...list_selected_key, pk ]);
                      }
                    }}
                    type={'checkbox'} />
                </td> }
                {
                  out_structure.current!.columns.map((tc: CAOutput.TableColumn, j: number) => (
                    <td key={`${i}-${j}`}>
                      { (loading_fetch_data || (list_selected_key.includes(row[out_structure.current!.column_key]) && loading_delete_data)) && <div className={'skeleton'} /> }
                      { (!loading_fetch_data && !(list_selected_key.includes(row[out_structure.current!.column_key]) && loading_delete_data)) && row[tc.key] }
                    </td>
                  ))
                }
                { props.onEdit && <td className={`td-context-menu`}>
                  <div className="context-menu">
                    <img 
                      onClick={() => setActiveContextMenuKey(row[out_structure.current!.column_key])}
                      className={'three-dots'}
                      src={'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDE2IDE2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiMwMDAwMDAiIGNsYXNzPSJiaSBiaS10aHJlZS1kb3RzLXZlcnRpY2FsIj4KICA8cGF0aCBkPSJNOS41IDEzYTEuNSAxLjUgMCAxIDEtMyAwIDEuNSAxLjUgMCAwIDEgMyAwem0wLTVhMS41IDEuNSAwIDEgMS0zIDAgMS41IDEuNSAwIDAgMSAzIDB6bTAtNWExLjUgMS41IDAgMSAxLTMgMCAxLjUgMS41IDAgMCAxIDMgMHoiLz4KPC9zdmc+'} />
                    { row[out_structure.current!.column_key] == active_context_menu_key && <CATableContextMenu
                      onEdit={() => props.onEdit!(row[out_structure.current!.column_key])} 
                      onClose={() => setActiveContextMenuKey(null)} /> }
                  </div>
                </td> }
              </tr>
            ))
          }
        </tbody>
      </table>
      <CATableLimitOffset
        loading={loading_fetch_data}
        limit={limit}
        offset={offset}
        total={data.total}
        setLimit={setLimit}
        setOffset={setOffset} />
    </div>
  );
}
