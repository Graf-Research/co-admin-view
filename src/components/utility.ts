export function deepAccess(obj: {[key: string]: any}, key: string): any | undefined {
  return deepAccessExec(obj, key.trim().split('.'));
}

function deepAccessExec(obj: {[key: string]: any}, keys: string[]): any | undefined {
  if (keys.length === 0) {
    return undefined;
  }

  const current_key = keys[0];
  const value: any | {[key: string]: any} | undefined = obj[current_key];
  if (keys.length === 1) {
    return value as any | undefined;
  }

  if (typeof value === 'undefined') {
    return undefined;
  }

  return deepAccessExec(value as {[key: string]: any}, keys.slice(1))
}
