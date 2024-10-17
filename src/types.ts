export type SupportedDataType = number | string | boolean;

export interface OptionItem {
  label: string
  value: SupportedDataType
}

export type DataType = {[key: string]: SupportedDataType | DataType | any}

export type FieldDataType = {[key: string]: SupportedDataType | FieldDataType | any | undefined}
export type SupportedDataTypeLabel = 'number' | 'string' | 'boolean'

export interface TableColumnBasic {
  kind: 'basic'
  label: string
  key: string
  type: SupportedDataTypeLabel
}

export interface TableColumnStringFilter {
  kind: 'string-filter'
  label: string
  key: string
  type: SupportedDataTypeLabel
}

export interface TableColumnOptionFilter {
  kind: 'option-filter'
  label: string
  key: string
  type: SupportedDataTypeLabel
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
  array?: boolean
}

export interface TableFieldNumber {
  kind: 'number'
  label: string
  key: string
  array?: boolean
}

export interface TableFieldOption {
  kind: 'option'
  label: string
  key: string
  type: SupportedDataTypeLabel
  options?: OptionItem[]
  getOptionData?(): Promise<OptionItem[]>
  array?: boolean
}

export interface TableFieldObject {
  kind: 'object'
  label: string
  key: string
  fields: TableField[]
  array?: boolean
}

export interface TableFieldCustom {
  kind: 'custom'
  label: string
  key: string
  view<T>(value: T, onValueChange: (t: Partial<T> | T) => void, i: number): JSX.Element
  array?: boolean
}

export type TableField = TableFieldString
  | TableFieldNumber
  | TableFieldOption
  | TableFieldObject
  | TableFieldCustom;
