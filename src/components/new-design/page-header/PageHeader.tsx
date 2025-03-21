import React from "react";
import './style.css';

interface PageHeaderProps {
  title: string
  onNew?(): void
  onRefreshData(): void
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <div className={`header`}>
      <div className={`title`}>
        { props.title }
      </div>
      <div className={`actions`}>
        <button className={'clean'}>
          <img className={''} src={'https://www.svgrepo.com/show/522885/help.svg'} />
          Help
        </button>
        <button 
          onClick={props.onRefreshData}
          className={'outline'}>
          Refresh Data
        </button>
        { props.onNew && <button 
          onClick={() => props.onNew!()}
          className={'normal'}>
          New Data
        </button> }
      </div>
    </div>
  );
}
