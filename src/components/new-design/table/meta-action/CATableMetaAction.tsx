import React, { useState } from "react";
import { CAInput, CAOutput } from "../../tools/types";

interface CATableMetaActionProps {
  structure: CAOutput.TableStructure
  onSearch(q: string): void
}

export function CATableMetaAction(props: CATableMetaActionProps) {
  const show_filters: boolean = Boolean(props.structure.filters && props.structure.filters?.length > 0);
  const show_export: boolean = Boolean(props.structure.urls.export_url);
  const show_search: boolean = Boolean(props.structure.search_query_key);
  const [q, setQ] = useState<string>('');

  return (
    <div className={`meta-action`}>
      <div className={`title`}>
        { props.structure.title }
      </div>
      <div className={`actions`}>
        { show_filters && <button className={'clean'}>
          <img className={''} src={'https://www.svgrepo.com/show/507302/filter.svg'} />
          Filters
        </button> }
        { show_search && <div className={`input-img-container`}>
          <img src={'https://www.svgrepo.com/show/532554/search-alt.svg'} />
          <input 
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && props.onSearch(q)}
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
