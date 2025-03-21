import React, { useEffect, useState } from "react";
import './style.css';

interface CATableLimitOffsetProps {
  total: number
  limit: number
  loading: boolean
  offset: number
  setLimit(limit: number): void
  setOffset(offset: number): void
}

export function CATableLimitOffset(props: CATableLimitOffsetProps) {
  const [temp_page, setTempPage] = useState<number>(props.offset);

  useEffect(() => {
    setTempPage(Math.floor(props.offset / props.limit));
  }, [props.offset]);

  return (
    <div className={'limit-offset'}>
      <div className={'offset'}>
        <button 
          onClick={() => props.setOffset(Math.max(0, temp_page - 1) * props.limit)}
          style={{ padding: 7 }} 
          className={'outline'}>
          <img src={'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+DQo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgaWQ9IkFycm93IC8gQ2hldnJvbl9MZWZ0Ij4NCjxwYXRoIGlkPSJWZWN0b3IiIGQ9Ik0xNSAxOUw4IDEyTDE1IDUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjwvZz4NCjwvc3ZnPg=='} />
        </button>
        <input 
          placeholder={'Page'}
          value={String(temp_page).length > 0 ? (+temp_page + 1) : temp_page}
          onChange={e => (e.target.value.length > 0 && (+e.target.value > 0)) ? setTempPage(+e.target.value - 1) : setTempPage(e.target.value as any)}
          onKeyUp={e => e.key === 'Enter' && props.setOffset(temp_page * props.limit)}
          style={{ width: 70, textAlign: 'center' }}
          type={'number'} />
        <button 
          onClick={() => props.setOffset((temp_page + 1) * props.limit)}
          style={{ padding: 7 }} 
          className={'outline'}>
          <img src={'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+DQo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgaWQ9IkFycm93IC8gQ2hldnJvbl9SaWdodCI+DQo8cGF0aCBpZD0iVmVjdG9yIiBkPSJNOSA1TDE2IDEyTDkgMTkiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjwvZz4NCjwvc3ZnPg=='} />
        </button>
        <div className={'total-data'}>
          { props.loading ? <i>Loading...</i> : `Total ${props.total}` }
        </div>
      </div>
      <div className={'limit'}>
        <div className={'label'}>
          Items per page
        </div>
        <select
          value={props.limit}
          onChange={e => props.setLimit(+e.target.value)}>
          {
            [2, 5, 10, 25, 50, 100, 200].map((n: number) => (
              <option
                key={n}
                value={n}>
                { n }
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
}
