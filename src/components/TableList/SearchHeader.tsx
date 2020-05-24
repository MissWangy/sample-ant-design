import React, { useState, useEffect, Fragment } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  DatePicker,
  Cascader,
  Checkbox,
  Card,
  Button,
  TreeSelect,
} from 'antd';
import { SearchQuery } from './interface';
import { FormProps } from 'antd/lib/form/Form';
import { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { SelectProps } from 'antd/lib/select';
import { TimePickerProps } from 'antd/lib/time-picker';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import { CheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox';
import { CascaderProps } from 'antd/lib/cascader';
import { TreeSelectProps } from 'antd/lib/tree-select';
const { RangePicker } = DatePicker;
import styles from './index.less';

interface PropTypes extends FormProps {
  initialValues: any;
  searchQuery: SearchQuery[];
  handleSearch: any;
}

const SearchHeader: React.FC<PropTypes> = (props: PropTypes) => {
  const [form] = Form.useForm();
  const { searchQuery, initialValues, handleSearch } = props;

  const handleSubmit = (values: any) => {
    // e.preventDefault();
    handleSearch && handleSearch(values);
  };

  const _searchQuery = searchQuery ? searchQuery.filter(item => !!item && item.type) : [];

  const searchDoms =
    _searchQuery &&
    _searchQuery.map((item: SearchQuery) => {
      const { defaultValue, ..._props } = item.props! || { defaultValue: undefined };
      if (!!item.render) {
        return <>{item.render}</>;
      } else if (item.type === 'Input') {
        return <Input allowClear {...(_props as InputProps)} onPressEnter={handleSubmit} />;
      } else if (item.type === 'InputNumber') {
        return <InputNumber {...(_props as InputNumberProps)} onChange={handleSubmit} />;
      } else if (item.type === 'Input.TextArea') {
        return <Input.TextArea {...(_props as TextAreaProps)} onPressEnter={handleSubmit} />;
      } else if (item.type === 'Input.Search') {
        return <Input.Search {...(_props as SearchProps)} onSearch={handleSubmit} />;
      } else if (item.type === 'Select') {
        return (
          <Select {...(_props as SelectProps<any>)} onChange={handleSubmit}>
            {item.options &&
              item.options!.map(o => (
                <Select.Option value={o.value} key={o.value} disabled={o.disabled}>
                  {o.label}
                </Select.Option>
              ))}
          </Select>
        );
      } else if (item.type === 'TimePicker') {
        return <TimePicker {...(_props as TimePickerProps)} onChange={handleSubmit} />;
      } else if (item.type === 'RangePicker') {
        return <RangePicker {...(_props as RangePickerProps)} />;
      } else if (item.type === 'DatePicker') {
        return <DatePicker {...(_props as DatePickerProps)} onChange={handleSubmit} />;
      } else if (item.type === 'Checkbox') {
        return <Checkbox {...(_props as CheckboxProps)} onChange={handleSubmit} />;
      } else if (item.type === 'Checkbox.Group') {
        return <Checkbox.Group {...(_props as CheckboxGroupProps)} onChange={handleSubmit} />;
      } else if (item.type === 'Cascader') {
        return <Cascader {...(_props as CascaderProps)} onChange={handleSubmit} />;
      } else if (item.type === 'TreeSelect') {
        return <TreeSelect {...(_props as TreeSelectProps<any>)} onChange={handleSubmit} />;
      }
      return null;
    });

  return (
    <div className={styles.searchCont}>
      <Form
        form={form}
        initialValues={initialValues}
        layout="inline"
        onFinish={handleSubmit}
        className={styles.listSearchForm}
      >
        {searchDoms.map((item, index: number) => (
          <Form.Item
            className={styles.listSearchFormItem}
            name={_searchQuery[index].name}
            label={_searchQuery[index].label}
            key={index + '_'}
          >
            {item}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.searchFormBtn}>
            搜索
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              form.submit();
            }}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchHeader;
