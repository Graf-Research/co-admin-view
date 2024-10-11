import { HTMLAttributes, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { BaseModal, ModalAction } from "../BaseModal";
import { InputText } from "./InputText";
import { Button } from "../Button";

export interface OptionItem {
  label: string
  value: any
}

interface InputOptionModalProps extends InputHTMLAttributes<HTMLInputElement> {
  options?: OptionItem[]
  values?: any[]
  onValuesChange?(values: any[]): void
}

export function InputOptionModal(props: InputOptionModalProps) {
  const modal = useRef<ModalAction>(null);
  const [q, setQ] = useState<string>('');
  const [values, setValues] = useState<any[]>([]);

  const filtered_options = (props.options ?? []).filter(o => o.label.toLowerCase().includes(q.toLowerCase()));

  function checked(o: OptionItem) {
    if (values.includes(o.value)) {
      setValues(values.filter(v => v != o.value));
    } else {
      setValues([
        ...values,
        o.value
      ]);
    }
  }

  useEffect(() => {
    setValues(props.values ?? []);
  }, [props.values]);

  return (
    <div>
      <input 
        {...props}
        onClick={() => modal.current?.open()}
        readOnly
        value={`${(props.values ?? []).map(val => (props.options ?? []).find(o => o.value == val)?.label).join(', ')}`}
        className={`${props.className || ''} bg-zinc-50 text-zinc-500 cursor-pointer border border-[1.5px] border-zinc-200 focus:border-blue-500 p-[4px_6px] rounded-[3px] outline-none w-full`} />
      <BaseModal ref={modal}>
        <div className={`flex flex-col gap-[8px] bg-white p-[12px] md:w-[40vw]`}>
          <InputText
            placeholder={`Filter`}
            value={q}
            onChange={e => setQ(e.target.value)} />
          <div className={`flex flex-col gap-[4px] text-[1.1em]`}>
            {
              filtered_options.map((o: OptionItem) => (
                <div 
                  key={o.value}
                  onClick={() => checked(o)}
                  className={`cursor-pointer flex items-center gap-[4px]`}>
                  <input 
                    type={'checkbox'}
                    checked={values.includes(o.value)} />
                  <div>
                    { o.label }
                  </div>
                </div>
              ))
            }
          </div>
          <Button
            onClick={() => {
              modal.current?.close();
              props.onValuesChange && props.onValuesChange(values);
            }}>
            Apply
          </Button>
        </div>
      </BaseModal>
    </div>
  );
}
