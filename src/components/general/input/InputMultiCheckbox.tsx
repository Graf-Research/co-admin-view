import { useState } from "react";
import { OptionItem } from "./InputOptionModal";
import { InputText } from "./InputText";

interface InputMultiCheckboxProps {
  options: OptionItem[]
  values: any[]
  setValues(values: any[]): void
}

export function InputMultiCheckbox(props: InputMultiCheckboxProps) {
  const [q, setQ] = useState<string>('');

  const filtered_options = (props.options ?? []).filter(o => o.label.toLowerCase().includes(q.toLowerCase()));
  const all_selected = props.values.length === props.options.length;

  function toggleSelectAll() {
    if (all_selected) {
      props.setValues([]);
    } else {
      props.setValues(props.options.map(x => x.value));
    }
  }

  function checked(o: OptionItem) {
    if (props.values.includes(o.value)) {
      props.setValues(props.values.filter(v => v != o.value));
    } else {
      props.setValues([
        ...props.values,
        o.value
      ]);
    }
  }

  return (
    <div className={`flex flex-col gap-[4px] bg-white w-full flex-1`}>
      <InputText
        placeholder={`Filter`}
        value={q}
        className={`w-full`}
        onChange={e => setQ(e.target.value)} />
      <div className={`flex items-center justify-between`}>
        <div 
          onClick={toggleSelectAll}
          className={`cursor-pointer flex items-center gap-[4px]`}>
          <input 
            type={'checkbox'}
            checked={all_selected} />
          <div>
            Pilih Semua ({ props.options.length })
          </div>
        </div>
        <div className={``}>
          { props.values.length } Terpilih
        </div>
      </div>
      <div className={`flex flex-col gap-[4px] text-[1.1em] overflow-y-auto max-h-[250px] bg-slate-50 flex-1 p-[8px]`}>
        {
          filtered_options.map((o: OptionItem) => (
            <div 
              key={o.value}
              onClick={() => checked(o)}
              className={`cursor-pointer flex items-center gap-[4px]`}>
              <input 
                type={'checkbox'}
                checked={props.values.includes(o.value)} />
              <div>
                { o.label }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
