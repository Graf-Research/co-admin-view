import React, { useLayoutEffect, useRef, useState } from "react";
import './style.css';
import { PageHeader } from "../page-header/PageHeader";
import { CATable } from "../table/CATable";
import { CAForm } from "../form/CAForm";
import { CAInput } from "../tools/types";
import { ActiveForm } from "./types";

interface CAPageProps {
  title: string
  table: CAInput.TableStructure
  form?: CAInput.FormStructure
}

export function CAPage(props: CAPageProps) {
  const [active_form, setActiveForm] = useState<ActiveForm>({
    active: false,
    mode: 'new',
    data_key: ''
  });
  const [refresh_data_trigger, setRefreshDataTrigger] = useState<Date>(new Date());

  return (
    <div className={`co-admin`}>
      <PageHeader 
        title={props.title}
        onRefreshData={() => setRefreshDataTrigger(new Date())}
        onNew={
          props.form
          ? () => setActiveForm({
            active: true,
            mode: 'new',
            data_key: ''
          })
          : undefined
        } />
      <div className={'table-form-container'}>
        <div 
          style={{ display: active_form.active ? 'none' : 'block' }}
          className={'A-box'}>
          <CATable 
            refreshDataTrigger={refresh_data_trigger}
            onEdit={
              props.form 
              ? (key: any) => {
                setActiveForm({
                  active: true,
                  data_key: key,
                  mode: 'edit'
                })
              }
              : undefined
            }
            structure={props.table} />
        </div>
        { props.form && <div 
          style={{ display: active_form.active ? 'block' : 'none' }}
          className={'B-box'}>
          <CAForm 
            activeForm={active_form}
            onSubmissionSuccess={() => {
              setActiveForm({ ...active_form, active: false });
              setRefreshDataTrigger(new Date());
            }}
            onCloseForm={() => setActiveForm({ ...active_form, active: false })}
            structure={{
              table: props.table,
              form: props.form
            }} />
        </div> }
      </div>
    </div>
  );
}
