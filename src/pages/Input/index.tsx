import React, { useState } from 'react';
import styles from './index.less';
import { Card, Row, Col, Form, Input } from 'antd';
import FormList from './components/index';
import DeptTree from '../Form/Tree/DeptTree/DeptTree';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const treeData = [
  {
    key: 1,
    title: '集团总部',
    children: [
      {
        key: 11,
        title: '集团总部-人事部',
        isLeaf: true,
      },
      {
        key: 12,
        title: '集团总部-开发部',
        isLeaf: true,
      },
    ],
  },
  {
    key: 2,
    title: '上海分公司',
    isLeaf: true,
  },
];

const InputPage: React.FC<any> = (props: any) => {
  const [form] = Form.useForm();
  const [personalIds, setPersonalIds] = useState<string[]>(() => {
    return [];
  });
  const [personalList, setPersonalList] = useState<Array<{}>>(() => {
    return [];
  });
  const handleTransferChange = (showPersonalIds: string[], showPersonalList: Array<{}>): void => {
    form.setFieldsValue({ personal: showPersonalIds });
    setPersonalIds(showPersonalIds);
    setPersonalList(showPersonalList);
  };
  const onValuesChange = (allValues: any) => {
    console.log(allValues);
  };
  return (
    <>
      <Card>
        <Row gutter={24}>
          <Col span={24}>
            <Form name="basicForm" form={form} layout="vertical" onValuesChange={onValuesChange}>
              <Form.Item name="input">
                <Input />
              </Form.Item>
              <DeptTree
                treeDataSource={treeData}
                transferDataSource={[]}
                handleTransferChange={handleTransferChange}
                transferIdKey="id"
                transferNameKey="name"
                transferShowPersonalList={personalList}
              />
            </Form>

            {/* <FormList
              fields={[
                {
                  field: 'name',
                  label: '员工姓名',
                  type: 'Input',
                  span: 12,
                  placholder: '请输入姓名',
                },
                {
                  field: 'school',
                  label: '毕业院校',
                  type: 'Select',
                  options: [
                    { value: '清华大学', label: '清华大学' },
                    { value: '北京大学', label: '北京大学' },
                    { value: '郑州大学', label: '郑州大学' },
                  ],
                  span: 12,
                },
                {
                  field: 'homeName',
                  label: '所属地区',
                  options: [
                    {
                      value: '河南',
                      label: '河南',
                      children: [
                        { value: '郑州', label: '郑州' },
                        { value: '开封', label: '开封' },
                        { value: '周口', label: '周口' },
                      ],
                    },
                    { value: '上海', label: '上海' },
                  ],
                  type: 'Cascader',
                  span: 12,
                },
                {
                  field: 'likes',
                  label: '兴趣爱好',
                  type: 'Checkbox',
                  options: [
                    { value: '爬山', label: '爬山' },
                    { value: '游泳', label: '游泳' },
                    { value: '读书', label: '读书' },
                    { value: '打豆豆', label: '打豆豆' },
                  ],
                  span: 24,
                },
                {
                  field: 'datatimer',
                  label: 'DatePicker',
                  type: 'DatePicker',
                  span: 24,
                },
                {
                  field: 'advantage',
                  label: '自身优势',
                  type: 'Radio',
                  options: [
                    { value: '自学能力强', label: '自学能力强' },
                    { value: '沟通能力强', label: '沟通能力强' },
                    { value: '工作负责任', label: '工作负责任' },
                  ],
                  span: 24,
                },
                {
                  field: 'switch',
                  label: 'switch',
                  type: 'Switch',
                  span: 24,
                },
                {
                  field: 'inputNumber',
                  label: 'inputNumber',
                  type: 'InputNumber',
                  span: 24,
                },
              ]}
            ></FormList> */}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default InputPage;
