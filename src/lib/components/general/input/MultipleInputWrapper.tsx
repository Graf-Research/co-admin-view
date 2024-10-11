import { Button } from "../Button";

interface MultipleInputWrapperProps<T> {
  data: T[]
  setData(data: T[]): void
  renderItem(value: T, onValueChange: (t: Partial<T>) => void, i: number): JSX.Element
  newItemValue: T
  prefixTitle?: string
  v2?: boolean
  v3?: boolean
}

export function MultipleInputWrapper<T>(props: MultipleInputWrapperProps<T>) {
  const is_native_type = typeof props.newItemValue !== 'object';

  function getTitle(i: number) {
    return `${props.prefixTitle ?? ''}${i + 1}`;
  }

  function addItemBefore(i: number) {
    props.setData([
      ...props.data.slice(0, i),
      props.newItemValue,
      ...props.data.slice(i),
    ]);
  }

  function addItem() {
    props.setData([
      ...props.data,
      props.newItemValue
    ]);
  }

  function removeItem(i: number) {
    if (!confirm(`Hapus item ${getTitle(i)}?`)) {
      return;
    }
    props.setData([
      ...props.data.slice(0, i),
      ...props.data.slice(i + 1),
    ]);
  }

  function updateItem(value: T, partial_value: Partial<T>, i: number) {
    props.setData([
      ...props.data.slice(0, i),
      is_native_type ? partial_value as T : {
        ...value,
        ...partial_value
      },
      ...props.data.slice(i + 1),
    ]);
  }

  if (props.v2) {
    return (
      <div className={`flex gap-[4px] flex-wrap`}>
        {
          props.data.map((value: T, i: number) => (
            <div 
              key={i}
              className={`relative`}>
              <img 
                onClick={e => {
                  e.stopPropagation();
                  removeItem(i);
                }}
                className={`z-[99] absolute right-[12px] top-[12px] cursor-pointer w-[17px] h-[17px] object-contain`}
                src={'/delete.svg'} />
              { props.renderItem(value, (t: Partial<T>) => updateItem(value, t, i), i) }
            </div>
          ))
        }
        <Button 
          outline
          className={`h-fill`}
          onClick={() => addItem()}>
          Tambah {props.prefixTitle}
        </Button>
      </div>
    );
  }

  if (props.v3) {
    return (
      <div className={`flex flex-col gap-[4px]`}>
        {
          props.data.map((value: T, i: number) => (
            <div 
              key={i}
              className={`relative flex items-center`}>
              <img 
                onClick={e => {
                  e.stopPropagation();
                  removeItem(i);
                }}
                className={`z-[99] absolute right-[12px] cursor-pointer w-[17px] h-[17px] object-contain`}
                src={'/delete.svg'} />
              { props.renderItem(value, (t: Partial<T>) => updateItem(value, t, i), i) }
            </div>
          ))
        }
        <Button 
          outline
          className={`self-start`}
          onClick={() => addItem()}>
          Tambah {props.prefixTitle}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-[2px]`}>
      {
        props.data.map((value: T, i: number) => (
          <div 
            key={i}
            className={`flex items-center gap-[8px] p-[4px_12px] bg-white rounded-[8px] bg-zinc-50`}>
            <div>
              { getTitle(i) }
            </div>
            <div 
              className={`!py-[6px] bg-zinc-200 px-[8px] rounded-[4px] text-[12px] cursor-pointer`}
              onClick={() => addItemBefore(i)}>
              add ↑
            </div>
            <div className={`flex-1 w-full`}>
              { props.renderItem(value, (t: Partial<T>) => updateItem(value, t, i), i) }
            </div>
            <img 
              onClick={() => removeItem(i)}
              className={`cursor-pointer w-[17px] h-[17px] object-contain`}
              src={'/delete.svg'} />
          </div>
        ))
      }
      <Button 
        outline
        className={`self-start mt-[7px]`}
        onClick={() => addItem()}>
        Tambah {props.prefixTitle}
      </Button>
    </div>
  );
}
