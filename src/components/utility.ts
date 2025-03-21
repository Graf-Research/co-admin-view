import { DataType, SupportedDataType } from "../../types";

export function deepAccess(obj: DataType, key: string): SupportedDataType | undefined {
  return deepAccessExec(obj, key.trim().split('.'));
}

function deepAccessExec(obj: DataType, keys: string[]): SupportedDataType | undefined {
  if (keys.length === 0) {
    return undefined;
  }

  const current_key = keys[0];
  const value: SupportedDataType | DataType | undefined = obj[current_key];
  if (keys.length === 1) {
    return value as SupportedDataType | undefined;
  }

  if (typeof value === 'undefined') {
    return undefined;
  }

  return deepAccessExec(value as DataType, keys.slice(1))
}
