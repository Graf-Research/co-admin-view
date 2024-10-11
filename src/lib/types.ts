export type SupportedDataType = number | string | boolean;

export interface OptionItem {
  label: string
  value: SupportedDataType
}

export type DataType = {[key: string]: SupportedDataType}

export type FieldDataType = {[key: string]: SupportedDataType | undefined}

export interface TableColumnBasic {
  kind: 'basic'
  label: string
  key: string
  type: 'number' | 'string' | 'boolean'
}

export interface TableColumnStringFilter {
  kind: 'string-filter'
  label: string
  key: string
  type: 'number' | 'string' | 'boolean'
}

export interface TableColumnOptionFilter {
  kind: 'option-filter'
  label: string
  key: string
  type: 'number' | 'string' | 'boolean'
  options?: OptionItem[]
  getOptionData?(): Promise<OptionItem[]>
}

export type TableColumn = TableColumnBasic
  | TableColumnStringFilter
  | TableColumnOptionFilter;

export type FilterParam = {[key: string]: SupportedDataType | SupportedDataType[]}

export interface PaginatedData<T> {
  total: number
  data: T[]
}

export interface TableFieldString {
  kind: 'string'
  label: string
  key: string
}

export interface TableFieldNumber {
  kind: 'number'
  label: string
  key: string
}

export interface TableFieldOption {
  kind: 'option'
  label: string
  key: string
  type: 'number' | 'string' | 'boolean'
  options?: OptionItem[]
  getOptionData?(): Promise<OptionItem[]>
}

export type TableField = TableFieldString
  | TableFieldNumber
  | TableFieldOption;
