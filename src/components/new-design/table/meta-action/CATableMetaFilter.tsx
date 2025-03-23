import React, { useRef, useState } from "react";
import { useOutsideClick } from "../../tools/useOutsideClick";
import { CAOutput } from "../../tools/types";

interface CATableMetaFilterProps {
  structure: CAOutput.TableStructure
  data: FilterData
  options: FilterOptionsData
  onApply(data: FilterData): void
  onClose(): void
}

export interface OptionDataItem {
  label: string
  value: any
}

export type FilterData = {[key: string]: any}
export type FilterOptionsData = {[key: string]: OptionDataItem[]};

export function CATableMetaFilter(props: CATableMetaFilterProps) {
  const [filter_data, setFilterData] = useState<FilterData>(props.data);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => props.onClose());

  function renderFilterItem(filter: CAOutput.TableFilter, i: number): JSX.Element {
    switch (filter.type) {
      case "freetext":
        return (
          <div 
            key={i}
            className={'input-container'}>
            <label>
              { filter.label }
            </label>
            <input 
              type="text"
              value={filter_data?.[filter.query_key] ?? ''}
              onChange={e => setFilterData({ ...filter_data, [filter.query_key]: e.target.value })}
              onKeyUp={e => e.key === 'Enter' && applyFilter()}
              placeholder={filter.label} />
          </div>
        );
      case "checkbox":
        return (
          <div 
            key={i}
            className={'input-container'}>
            <label>
              { filter.label }
            </label>
            <div>
              NO IMPLEMENTATION
            </div>
          </div>
        );
      case "select":
        return (
          <div 
            key={i}
            className={'input-container'}>
            <label>
              { filter.label }
            </label>
            <select 
              value={filter_data?.[filter.query_key] ?? ''}
              onChange={e => setFilterData({ ...filter_data, [filter.query_key]: e.target.value })}>
              <option value={''} selected>
                All { filter.label }
              </option>
              {
                props.options[filter.query_key]?.map((o: OptionDataItem, i: number) => (
                  <option
                    key={i}
                    value={o.value}>
                    { o.label }
                  </option>
                ))
              }
            </select>
          </div>
        );
    }
    return (
      <div key={i} />
    );
  }

  function applyFilter() {
    props.onApply(filter_data);
  }

  return (
    <div 
      className={'filter-container'}
      ref={ref}>
      {/* <div className={`filter-title`}>
        Filter
      </div> */}
      <div className={'filter-items'}>
        {
          props.structure.filters?.map((filter: CAOutput.TableFilter, i: number) => renderFilterItem(filter, i))
        }
        <button 
          onClick={applyFilter}
          className={'normal'}>
          Apply
        </button>
      </div>
    </div>
  );
}
