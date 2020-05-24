interface option {
  label: string | number;
  value?: string;
  disabled?: boolean;
}

export interface formPorps {
  field: string;
  label: string;
  rules: any;
  type:
    | 'Input'
    | 'InputNumber'
    | 'Input.Search'
    | 'Input.TextArea'
    | 'Input.Group'
    | 'Switch'
    | 'Select'
    | 'TimePicker'
    | 'DatePicker'
    | 'Cascader'
    | 'Checkbox'
    | 'Checkbox.Group'
    | 'AutoComplete'
    | 'Mentions'
    | 'Radio'
    | 'TreeSelect';
  options: option[];
}
