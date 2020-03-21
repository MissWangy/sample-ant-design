import { PaginationResponse } from "@/utils/response";
import { SelectProps } from "antd/lib/select/index"
import { TimePickerProps } from "antd/lib/time-picker";
import { DatePickerProps } from "antd/lib/date-picker/interface";
import { InputProps, TextAreaProps } from "antd/lib/input";
import { InputNumberProps } from "antd/lib/input-number";
import { SwitchProps } from "antd/lib/switch";
import { CascaderProps } from "antd/lib/cascader";
import { CheckboxProps, CheckboxGroupProps } from "antd/lib/checkbox";
import { AutoCompleteProps } from "antd/lib/auto-complete";
import { MentionProps } from "antd/lib/mentions";
import { RadioProps } from "antd/lib/radio";
import { ColumnProps, TableProps } from "antd/lib/table";
import { ButtonProps } from "antd/lib/button";
import { ActionProps } from "./Actions";
import { TreeSelectProps } from "antd/lib/tree-select";

export interface SearchQuery {
  key: string
  label?: string
  type: "Input" | "InputNumber" | "Input.Search" | "Input.TextArea" | "Input.Group" | "Switch" | "Select" | "TimePicker" | "DatePicker" | "Cascader" | "Checkbox" | "Checkbox.Group" | "AutoComplete" | "Mentions" | "Radio" | "TreeSelect"
  render?: RenderSearchQuery
  options?: Option[]
  optionsJson?: any[]
  props?: (SelectProps | TimePickerProps | DatePickerProps | InputProps | InputNumberProps | TextAreaProps | SwitchProps | CascaderProps | CheckboxProps | CheckboxGroupProps | AutoCompleteProps | MentionProps | RadioProps | TreeSelectProps<any>) & {
    defaultValue?: any
  }
}



export interface Option {
  label?: string | number
  value?: any
  disabled?: boolean
}


export interface GetList {
  <T, U>(query?: T): Promise<PaginationResponse<U>>
}


export interface Query {
  [key: string]: any
}

interface RenderSearchQuery {
  (): JSX.Element
}

interface ListFilter<T, U> {
  (res: any | T): any[] | U[]
}

interface TotalParse<T> {
  (res: any | T): number
}


export interface PropTypes {
  renderIndex?: number,
  loading?: boolean,
  searchQuery?: SearchQuery[]
  getList: Function
  /**
   * 额外的数据查询参数
   */
  queryPropsEx?: any

  /**
   * 查询行对应子列表
   */
  childrenQuery?: Function
  /**
   * 行选择勾选框属性
   */
  getCheckboxProps?: Function
  listFilter?: ListFilter<any, any>
  totalParse?: TotalParse<any>
  tableProps: TableProps<any>
  actions?: ActionProps[]
  isShowRowSelection?: boolean
  onPageChange?(page: number, size: number): void
  onSelectedRowsChange?(selectedRowKeys: any[], selectedRows: any[]): void
  scroll?: {
    x?: number
    y?: number
  },
  pRef?: any
}


