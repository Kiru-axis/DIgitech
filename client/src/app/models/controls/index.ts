// Standardize how the values are shown in checkboxes,radios and selects
export type ControlItemValueType = number | boolean | string;

export interface IControlItem {
  label: string;
  value: ControlItemValueType;
}
