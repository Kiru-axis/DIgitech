import { IControlItem } from '@app/models';

export function transformToControl(arr: { name: string; code: string }[]) {
  const res: IControlItem[] = [];

  for (let i = 0; i < arr.length; i++) {
    const e = arr[i];
    res.push({ label: e.name, value: e.name });
  }

  return res;
}
