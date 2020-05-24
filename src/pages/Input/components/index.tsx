import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Col,
  Checkbox,
  InputNumber,
  DatePicker,
  Button,
  TimePicker,
  Switch,
} from 'antd';
import { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import { formPorps } from './input';
import RadioFields from './radio';

interface PropType {
  fields: any;
}

const FormList: React.FC<PropType> = props => {
  const { fields } = props;
  const _fields = fields ? fields.filter((item: any) => !!item && item.type) : [];

  const formDoms = (item: formPorps) => {
    const { type, ..._props } = item;
    console.log('---', _props);
    if (item.type === 'Input') {
      return <Input />;
    } else if (item.type === 'Radio') {
      return <RadioFields options={item.options}></RadioFields>;
    } else if (item.type === 'InputNumber') {
      return <InputNumber />;
    } else if (item.type === 'Input.TextArea') {
      return <Input.TextArea />;
    } else if (item.type === 'Input.Search') {
      return <Input.Search />;
    } else if (item.type === 'Select') {
      return (
        <Select>
          {item.options &&
            item.options.map((oitem: any) => {
              return (
                <Select.Option value={oitem.value} key={oitem.value} disabled={oitem.disabled}>
                  {oitem.label}
                </Select.Option>
              );
            })}
        </Select>
      );
    } else if (item.type === 'DatePicker') {
      return <DatePicker />;
    } else if (item.type === 'TimePicker') {
      return <TimePicker />;
    } else if (item.type === 'Checkbox') {
      return <Checkbox.Group options={item.options}></Checkbox.Group>;
    } else if (item.type === 'Cascader') {
      return <Cascader options={item.options} />;
    } else if (item.type === 'Switch') {
      return <Switch />;
    }
  };
  const handelFinish = (values: any) => {
    // console.log('---', values);
  };

  return (
    <Form onFinish={handelFinish}>
      {_fields &&
        _fields.map((item: any, index: number) => {
          return (
            <Col key={item.field} xs={24} sm={item.span > 12 ? item.span : 12} md={item.span || 8}>
              <Form.Item name={item.field} label={item.label}>
                {formDoms(item)}
              </Form.Item>
            </Col>
          );
        })}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormList;
