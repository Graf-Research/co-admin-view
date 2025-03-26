import React, { useEffect, useRef, useState } from "react";
import { CAInput, CAOutput } from "../tools/types";
import { CAReader } from "../tools/CAReader";
import { ActiveForm } from "../page/types";
import { deepAccess } from "../../utility";

interface CAFormProps {
  activeForm: ActiveForm
  onCloseForm(): void
  onSubmissionSuccess(): void
  structure: {
    table: CAInput.TableStructure
    form: CAInput.FormStructure
  }
}

type FormData = {[key: string]: any}
interface OptionDataItem {
  label: string
  value: any
}

export function CAForm(props: CAFormProps) {
  const out_structure = useRef<CAOutput.FormStructure>();
  if (!out_structure.current) {
    try {
      const reader = new CAReader();
      const table_structure = reader.getTableStructure(props.structure.table);
      out_structure.current = reader.getFormStructure(table_structure, props.structure.form);
    } catch (err: any) {
      return (
        <div className="table-container" style={{ background: '#FFEDD5' }}>
          <pre style={{ whiteSpace: 'normal' }}>{ err.toString() }</pre>
          <button onClick={() => props.onCloseForm()}>Back</button>
        </div>
      );
    }
  }

  const [form_data, setFormData] = useState<FormData>({});
  const [options_data, setOptionsData] = useState<{[key: string]: OptionDataItem[]}>({});
  const [loading_submit, setLoadingSubmit] = useState<boolean>(false);
  const [loading_get_data, setLoadingGetData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const loading = loading_submit || loading_get_data;

  async function submit() {
    setLoadingSubmit(true);
    try {
      let result: Response | null = null;
      switch (props.activeForm.mode) {
        case "new":
          result = await fetch(`${out_structure.current!.urls.create_new_url}`, {
            method: 'post',
            body: JSON.stringify(form_data),
            ...out_structure.current?.request_init?.create,
            headers: { 'Content-Type': 'application/json', ...out_structure.current?.request_init?.create?.headers },
          });
          break;
        case "edit":
          result = await fetch(`${out_structure.current!.urls.update_data_url}?key=${props.activeForm.data_key}`, {
            method: 'put',
            body: JSON.stringify(form_data),
            ...out_structure.current?.request_init?.update,
            headers: { 'Content-Type': 'application/json', ...out_structure.current?.request_init?.update?.headers },
          });
          break;
      }
      if (result.ok) {
        props.onSubmissionSuccess();
        setFormData({});
      } else {
        setError(await result.text());
      }
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoadingSubmit(false);
    }
  }

  function renderItem(item: CAOutput.L2_FormItem, key: string, mode_row: boolean = true): JSX.Element {
    if (typeof item === 'string') {
      return (
        <div 
          key={key}
          className={'subtitle'}>
          { item }
        </div>
      );
    }

    if (Array.isArray(item)) {
      return (
        <div 
          key={key}
          className={mode_row ? 'row' : 'column'}>
          { item.map((subitem: CAOutput.L2_FormItem, i: number) => renderItem(subitem, `${key}-${i}`, !mode_row)) }
        </div>
      );
    }

    if (item.type === 'CUSTOM') {
      return (
        <div 
          key={key}
          className={'input-container'}>
          <label>
            { item.label }
          </label>
          { (item as CAOutput.FieldFormItemCustom).view(form_data[item.data_key], (value: any) => setFormData({ ...form_data, [item.data_key]: value })) }
        </div>
      );
    }

    const l0_item = item as CAOutput.FieldFormItem;
    switch (l0_item.type) {
      case "INPUT-TEXT":
        return (
          <div 
            key={key}
            className={'input-container'}>
            <label>
              { l0_item.label }
            </label>
            <input 
              value={form_data[l0_item.data_key] ?? ''}
              onChange={e => setFormData({ ...form_data, [l0_item.data_key]: e.target.value })}
              placeholder={l0_item.label}
              type={'text'} />
          </div>
        );
      case "INPUT-NUMBER":
        return (
          <div 
            key={key}
            className={'input-container'}>
            <label>
              { l0_item.label }
            </label>
            <input 
              value={form_data[l0_item.data_key] ?? ''}
              onChange={e => setFormData({ ...form_data, [l0_item.data_key]: e.target.value })}
              placeholder={l0_item.label}
              type={'number'} />
          </div>
        );
      case "TEXTAREA":
        return (
          <div 
            key={key}
            className={'input-container'}>
            <label>
              { l0_item.label }
            </label>
            <textarea 
              value={form_data[l0_item.data_key] ?? ''}
              onChange={e => setFormData({ ...form_data, [l0_item.data_key]: e.target.value })}
              placeholder={l0_item.label} />
          </div>
        );
      case "SELECT":
        return (
          <div 
            key={key}
            className={'input-container'}>
            <label>
              { l0_item.label }
            </label>
            <select 
              value={form_data[l0_item.data_key] ?? ''}
              onChange={e => setFormData({ ...form_data, [l0_item.data_key]: e.target.value })}>
              <option value={''} selected>
                Choose { l0_item.label }
              </option>
              {
                options_data[l0_item.data_key]?.map((o: OptionDataItem, i: number) => (
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
      case "CHECKBOX":
        return (
          <div 
            key={key}
            className={'input-container'}>
            <label>
              { l0_item.label }
            </label>
            <input 
              type={'checkbox'}
              checked={form_data[l0_item.data_key] ?? ''}
              onChange={e => setFormData({ ...form_data, [l0_item.data_key]: e.target.checked })} />
          </div>
        );
      case "RADIO":
      default:
        return (
          <div
            key={key}>
            Item { item.type }
          </div>
        )
    }
  }

  async function getDetailDataAndFillForm(key: any) {
    setLoadingGetData(true);
    try {
      const result = await fetch(`${out_structure.current!.urls.get_detail_url}?key=${key}`, out_structure.current?.request_init?.get);
      if (result.ok) {
        const json_value = await result.json();
        setFormData(out_structure.current!.form_items.reduce((acc: FormData, curr: (CAOutput.FieldFormItem | CAOutput.FieldFormItemCustom)) => {
          acc[curr.data_key] = deepAccess(json_value, curr.source_key);
          return acc;
        }, {}));
        setError(null);
      } else {
        setError(await result.text());
      }
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoadingGetData(false);
    }
  }

  async function getAllOptionsData() {
    if (!out_structure.current?.options_data_source) {
      return;
    }
    try {
      let option_data_accumulator = {};
      for (const option_data_source of out_structure.current.options_data_source) {
        const result = await fetch(option_data_source.source_url, out_structure.current.request_init?.options_data?.[option_data_source.query_keys[0]]);
        if (result.ok) {
          const json_value: {[key: string]: any}[] = await result.json();
          if (!Array.isArray(json_value)) {
            setError(`wrong data source type, url ${option_data_source.source_url} expected to return type array`);
            return;
          }
          option_data_accumulator = {
            ...option_data_accumulator,
            ...option_data_source.query_keys.reduce((acc: {[key: string]: OptionDataItem[]}, query_key: string) => {
              acc[query_key] = json_value.map((option_item: {[key: string]: any}) => ({
                label: deepAccess(option_item, option_data_source.option_map_label),
                value: deepAccess(option_item, option_data_source.option_map_value),
              }));
              return acc;
            }, {})
          }
        } else {
          setError(await result.text());
        }
      }

      setOptionsData(option_data_accumulator);
    } catch (err: any) {
      setError(err.toString());
    }
  }

  useEffect(() => {
    setFormData({});
    if (props.activeForm.active) {
      getAllOptionsData();
      if (props.activeForm.mode === 'edit') {
        getDetailDataAndFillForm(props.activeForm.data_key);
      } else {
        setFormData({});
      }
    }
  }, [props.activeForm]);

  return (
    <div className={'form-container'}>
      { loading && <div className={'loading'}>
        <div className={'loader'} />
      </div> }
      { error && <pre style={{ fontSize: 12, whiteSpace: 'normal', background: '#FECACA' }}>{ new Date().toLocaleString() }<br/>{ error }</pre> }
      <div className={'title'}>
        { out_structure.current.title }
      </div>
      { out_structure.current.items.map((item: CAOutput.L2_FormItem, i: number) => renderItem(item, String(i))) }
      <div className={'buttons'}>
        <button 
          className="normal"
          onClick={submit}>
          Submit
        </button>
        <button 
          onClick={() => props.onCloseForm()}
          className="outline">
          Batal
        </button>
      </div>
    </div>
  );
}
