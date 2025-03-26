import React, { useEffect, useState } from "react";
import { CAInput, CAOutput } from "../../tools/types";
import { CATableMetaFilter, FilterData, FilterOptionsData, OptionDataItem } from "./CATableMetaFilter";
import { deepAccess } from "../../../utility";

interface CATableMetaActionProps {
  structure: CAOutput.TableStructure
  onSearchFilter(q: string, filter: FilterData): void
  setError(error: null | string): void
}

export function CATableMetaAction(props: CATableMetaActionProps) {
  const show_filters: boolean = Boolean(props.structure.filters && props.structure.filters?.length > 0);
  const show_export: boolean = Boolean(props.structure.urls.export_url);
  const show_search: boolean = Boolean(props.structure.search_query_key);

  const [filter_options_data, setFilterOptionsData] = useState<FilterOptionsData>({});
  const [q, setQ] = useState<string>('');
  const [filter_data, setFilterData] = useState<FilterData>({});
  const [show_filter, setShowFilter] = useState<boolean>(false);

  const total_filter = Object.keys(filter_data).filter(fkey => filter_data[fkey]).length;
  
  async function getAllOptionsData() {
    if (!props.structure.filter_options_data_source) {
      return;
    }
    try {
      for (const option_data_source of props.structure.filter_options_data_source) {
        const result = await fetch(option_data_source.source_url, props.structure.request_init?.options_data?.[option_data_source.query_keys[0]]);
        if (result.ok) {
          const json_value: {[key: string]: any}[] = await result.json();
          if (!Array.isArray(json_value)) {
            props.setError(`wrong data source type, url ${option_data_source.source_url} expected to return type array`);
            return;
          }
          setFilterOptionsData({
            ...filter_options_data,
            ...option_data_source.query_keys.reduce((acc: FilterOptionsData, query_key: string) => {
              acc[query_key] = json_value.map((option_item: {[key: string]: any}) => ({
                label: deepAccess(option_item, option_data_source.option_map_label),
                value: deepAccess(option_item, option_data_source.option_map_value),
              }));
              return acc;
            }, {})
          });
          props.setError(null);
        } else {
          props.setError(await result.text());
        }
      }
    } catch (err: any) {
      props.setError(err.toString());
    }
  }

  useEffect(() => {
    getAllOptionsData();
  }, [props.structure]);

  return (
    <div className={`meta-action`}>
      <div className={`title`}>
        { props.structure.title }
      </div>
      <div className={`actions`}>
        { show_filters && <div className="button-filter">
          <button 
            onMouseUp={e => e.stopPropagation()}
            onClick={() => setShowFilter(!show_filter)}
            className={'clean'}>
            <img className={''} src={'https://www.svgrepo.com/show/507302/filter.svg'} />
            Filters { total_filter > 0 ? `(${total_filter})` : '' }
          </button>
          { show_filter && <CATableMetaFilter
            structure={props.structure}
            data={filter_data}
            options={filter_options_data}
            onApply={(_filter_data: FilterData) => {
              setFilterData(_filter_data);
              props.onSearchFilter(q, _filter_data);
              setShowFilter(false)
            }}
            onClose={() => setShowFilter(false)} /> }
        </div> }
        { show_search && <div className={`input-img-container`}>
          <img src={'https://www.svgrepo.com/show/532554/search-alt.svg'} />
          <input 
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && props.onSearchFilter(q, filter_data)}
            placeholder={'Cari disini...'}
            type={'text'} />
        </div> }
        { show_export && <button className={'outline'}>
          <img src={'https://www.svgrepo.com/show/525324/download-minimalistic.svg'} />
          Export
        </button> }
      </div>
    </div>
  );
}
