export namespace CAInput {
  export type TableColumnKey = string;
  export type TableColumnLabel = string;
  export type TableColumn = `${TableColumnKey}` | `${TableColumnKey}:${TableColumnLabel}`;

  export type AvailableTableFilter = 'freetext' | 'checkbox' | 'select'
  export type TableFilterQueryKey = string;
  export type TableFilterSourceKey = string;
  export type TableFilterLabel = string;
  export type TableFilter = `${AvailableTableFilter}:${TableFilterQueryKey}:${TableFilterSourceKey}` | `${AvailableTableFilter}:${TableFilterQueryKey}:${TableFilterSourceKey}:${TableFilterLabel}`;

  export type FormItemSection = string;
  export type AvailableFormItemType = 'INPUT-TEXT' | 'TEXTAREA' | 'RADIO' | 'SELECT' | 'CHECKBOX' | 'CUSTOM';
  export type FormItemDataKey = string;
  export type FormItemSourceKey = string;
  export type FormItemLabel = string;
  export type L0_FormItem = FormItemSection | `${AvailableFormItemType}:${FormItemDataKey}:${FormItemSourceKey}` | `${AvailableFormItemType}:${FormItemDataKey}:${FormItemSourceKey}:${FormItemLabel}`;
  export type L1_FormItem = L0_FormItem | L0_FormItem[];
  export type L2_FormItem = L0_FormItem | L1_FormItem | L1_FormItem[];
  export type FormItem = L2_FormItem;

  export type CSVColumnKey = string;
  export type OptionsDataSourceURL = string;
  export type OptionsDataSource = `${CSVColumnKey}@${OptionsDataSourceURL}`;

  export interface TableStructure {
    title: string
    columns: TableColumn[]
    column_key: string
    search_query_key?: string
    filters?: TableFilter[]
    filter_options_data_source?: OptionsDataSource[]
    urls: {
      get_url: string
      delete_url?: string
      export_url?: string
    }
    request_init?: {
      get?: RequestInit
      delete?: RequestInit
      export?: RequestInit
    }
    custom_view?: {[key: string]: (value: any) => JSX.Element}
  }

  export interface FormStructure {
    title: string
    items: FormItem[]
    options_data_source?: OptionsDataSource[]
    urls: {
      get_detail_url: string
      create_new_url: string
      update_data_url: string
    }
    request_init?: {
      get?: RequestInit
      create?: RequestInit
      update?: RequestInit
    }
    custom_view?: {[key: FormItemDataKey]: (value: any, setValue: (value: any) => void) => JSX.Element}
  }
}

export namespace CAOutput {
  export interface TableColumn {
    key: CAInput.TableColumnKey
    label: CAInput.TableColumnLabel
  }

  export interface TableFilter {
    type: CAInput.AvailableTableFilter
    query_key: CAInput.TableFilterQueryKey
    source_key: CAInput.TableFilterSourceKey
    label: CAInput.TableFilterLabel
  }

  export interface OptionsDataSource {
    query_keys: string[]
    source_url: CAInput.OptionsDataSourceURL
  }

  export interface FieldFormItemCustom {
    type: 'CUSTOM'
    data_key: CAInput.FormItemDataKey
    source_key: CAInput.FormItemSourceKey
    label: CAInput.FormItemLabel
    view(value: any, setValue: (value: any) => void): JSX.Element
  }

  export interface FieldFormItem {
    type: CAInput.AvailableFormItemType
    data_key: CAInput.FormItemDataKey
    source_key: CAInput.FormItemSourceKey
    label: CAInput.FormItemLabel
  }

  export type L0_FormItem = CAInput.FormItemSection | FieldFormItem | FieldFormItemCustom;
  export type L1_FormItem = L0_FormItem | L0_FormItem[];
  export type L2_FormItem = L0_FormItem | L1_FormItem | L1_FormItem[];
  export type FormItem = L2_FormItem;

  export interface TableStructure {
    title: string
    columns: TableColumn[]
    column_key: string
    search_query_key?: string
    filters?: TableFilter[]
    filter_options_data_source?: OptionsDataSource[]
    urls: {
      get_url: string
      delete_url?: string
      export_url?: string
    }
    request_init?: {
      get?: RequestInit
      delete?: RequestInit
      export?: RequestInit
    }
    custom_view?: {[key: string]: (value: any) => JSX.Element}
  }

  export interface FormStructure {
    title: string
    items: FormItem[]
    form_items: (FieldFormItem | FieldFormItemCustom)[]
    options_data_source?: OptionsDataSource[]
    urls: {
      get_detail_url: string
      create_new_url: string
      update_data_url: string
    }
    request_init?: {
      get?: RequestInit
      create?: RequestInit
      update?: RequestInit
    }
  }
}
