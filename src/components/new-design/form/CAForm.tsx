import React, { useEffect, useRef, useState } from "react";
import './style.css';
import { CAInput, CAOutput } from "../tools/types";
import { CAReader } from "../tools/CAReader";
import { ActiveForm } from "../page/types";

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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form_data)
          });
          break;
        case "edit":
          result = await fetch(`${out_structure.current!.urls.update_data_url}?key=${props.activeForm.data_key}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form_data)
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
      case "TEXTAREA":
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
      case "RADIO":
      case "SELECT":
      case "CHECKBOX":
      default:undefined
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
      const result = await fetch(`${out_structure.current!.urls.get_detail_url}?key=${key}`);
      if (result.ok) {
        const json_value = await result.json();
        setFormData(out_structure.current!.form_items.reduce((acc: FormData, curr: CAOutput.FieldFormItem) => {
          acc[curr.data_key] = json_value[curr.source_key];
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

  useEffect(() => {
    setFormData({});
    if (props.activeForm.active) {
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
