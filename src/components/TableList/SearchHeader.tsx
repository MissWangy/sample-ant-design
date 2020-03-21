import React, { useState, useEffect, Fragment } from "react"
import { Form, Input, InputNumber, Select, TimePicker, DatePicker, Cascader, Checkbox, Card, TreeSelect } from "antd";
import { SearchQuery } from "./interface";
import { FormComponentProps } from "antd/lib/form/Form";
import { InputProps, TextAreaProps, SearchProps } from "antd/lib/input";
import { InputNumberProps } from "antd/lib/input-number";
import { SelectProps } from "antd/lib/select";
import { TimePickerProps } from "antd/lib/time-picker";
import { DatePickerProps } from "antd/lib/date-picker/interface";
import { CheckboxProps, CheckboxGroupProps } from "antd/lib/checkbox";
import { CascaderProps } from "antd/lib/cascader";
import { TreeSelectProps } from "antd/lib/tree-select";


interface PropTypes extends FormComponentProps<any> {
  searchQuery: SearchQuery[]
  form: any
  handleSearch: any
}


const SearchHeader: React.FC<PropTypes> = (props: PropTypes) => {
  const { searchQuery, form, handleSearch } = props
  const { getFieldDecorator, validateFields, getFieldError, isFieldTouched } = form;

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    if (e && typeof (e.preventDefault) === "function") {
      e.preventDefault()
    }
    setTimeout(() => {
      validateFields((err: any, values: any) => {
        if (!err) {
          console.log('Received values of form: ', values);
          handleSearch(values)
        }
      });
    }, 0)

  };


  const _searchQuery = searchQuery ? searchQuery.filter(item => !!item && item.type) : []


  const searchDoms = _searchQuery && _searchQuery.map((item: SearchQuery) => {
    const { defaultValue, ..._props } = item.props! || { defaultValue: undefined }
    if (!!item.render) {
      return <>{item.render}</>
    } else if (item.type === "Input") {
      return <Input allowClear {...(_props as InputProps)} onPressEnter={handleSubmit} />
    } else if (item.type === "InputNumber") {
      return <InputNumber {...(_props as InputNumberProps)} onChange={handleSubmit} />
    } else if (item.type === "Input.TextArea") {
      return <Input.TextArea {...(_props as TextAreaProps)} onPressEnter={handleSubmit} />
    } else if (item.type === "Input.Search") {
      return <Input.Search {...(_props as SearchProps)} onSearch={handleSubmit} />
    } else if (item.type === "Select") {
      return (
        <Select {...(_props as SelectProps)} onChange={handleSubmit}>
          {item.options && item.options!.map(o => (
            <Select.Option value={o.value} key={o.value} disabled={o.disabled}>{o.label}</Select.Option>
          ))}
        </Select>
      )
    } else if (item.type === "TimePicker") {
      return (
        <TimePicker {...(_props as TimePickerProps)} onChange={handleSubmit} />
      )
    } else if (item.type === "DatePicker") {
      return (
        <DatePicker {...(_props as DatePickerProps)} onChange={handleSubmit} />
      )
    } else if (item.type === "Checkbox") {
      return (
        <Checkbox {...(_props as CheckboxProps)} onChange={handleSubmit} />
      )
    } else if (item.type === "Checkbox.Group") {
      return (
        <Checkbox.Group {...(_props as CheckboxGroupProps)} onChange={handleSubmit} />
      )
    } else if (item.type === "Cascader") {
      return (
        <Cascader {...(_props as CascaderProps)} onChange={handleSubmit} />
      )
    } else if (item.type === "TreeSelect") {
      return (
        <TreeSelect {...(_props as TreeSelectProps<any>)} onChange={handleSubmit} />
      )
    }
    return null
  })

  return (
    <Form layout="inline" onSubmit={handleSubmit}>

      {searchDoms.map((item, index: number) => (
        <Form.Item label={_searchQuery[index].label} key={index + "_"}>
          {
            getFieldDecorator(_searchQuery[index].key, {
              initialValue: _searchQuery[index].props && (_searchQuery[index] as any).props.defaultValue
            })(item)
          }
        </Form.Item>
      ))
      }
    </Form >
  )
}

export default Form.create<PropTypes>()(SearchHeader)
