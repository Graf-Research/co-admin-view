import { useEffect, useState } from "react";
import { InputText } from "./input/InputText";
import { InputSelect } from "./input/InputSelect";

interface PageLimitProps {
  limit: number
  offset: number
  setLimit(limit: number): void
  setOffset(offset: number): void
  disableLimit?: boolean
  total?: number
}

export function PageLimit(props: PageLimitProps) {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setPage(Math.floor(props.offset / props.limit) + 1)
  }, [props.offset]);

  return (
    <div className={`flex items-center gap-[4px]`}>
      <button 
        onClick={() => props.setOffset(props.limit * Math.max(0, page - 2))}
        className={`w-[27px] h-[27px] rounded-[4px] flex items-center justify-center text-[15px] border border-px border-blue-500 text-blue-500`}>
        ‹
      </button>
      <InputText 
        value={page}
        onChange={e => setPage((e.target.value as string).replace(/\D/g,'') as any)}
        onKeyUp={e => e.key === 'Enter' && props.setOffset(props.limit * (page - 1))}
        className={`!w-[45px] text-center`} />
      <button 
        onClick={() => props.setOffset(props.limit * page)}
        className={`w-[27px] h-[27px] rounded-[4px] flex items-center justify-center text-[15px] border border-px border-blue-500 text-blue-500`}>
        ›
      </button>
      <div className={`mx-[12px] text-zinc-500`}>
        Total { Math.ceil((props.total ?? 0) / props.limit) } Halaman ({ props.total ?? 0 } data)
      </div>
      <InputSelect
        disabled={props.disableLimit}
        className={`!w-[55px]`}
        value={props.limit}
        onChange={e => props.setLimit(e.target.value as any)}>
        {
          [10, 25, 50, 100, 200, 500].map((limit: number) => (
            <option key={limit} value={limit}>{ limit }</option>
          ))
        }
      </InputSelect>
    </div>
  );
}
