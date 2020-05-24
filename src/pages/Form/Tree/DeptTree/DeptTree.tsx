/**
 * 部门成员组件
 * @author SPY
 * @date 2020/04/04
 */
import React, { useState, useRef, memo, useCallback } from 'react';
import { Row, Col, Modal, Select, Form } from 'antd';
import _ from 'lodash';
import SearchTree from '../SearchTree/SearchTree';
import SimpleTransfer, { TransferItem } from '../../Transfer/SimpleTransfer';

export interface DeptTreeProps {
  treeIdKey?: string; // 树节点对应的id名称
  treeNameKey?: string; // 树节点对应的name名称
  treeChildListKey?: string; // 树节点的子集的id名称
  treeHasChildKey?: string; // 树节点是否有子级的id名称,即判断树节点是否为叶子节点,默认为:isLeaf
  treeSearchPlaceholder?: string; // 树节点的提示信息
  treeDataSource: Array<ItemProps>; // 树节点要展示的数组列表

  transferIdKey?: string; // 穿梭框对应的id名称
  transferNameKey?: string; // 穿梭框对应的name名称
  transferDataSource: Array<TransferItem>; // 穿梭框左侧的总数据
  transferShowPersonalList?: any; // 穿梭框默认右侧选中,格式：[{key:1,title:'测试'}]

  handleTransferChange?: (showPersonalIds: string[], showPersonalList: Array<{}>) => void; // 穿梭框发生改变

  label?: string; // label 标签的文本
  name?: string | number | (string | number)[]; // 字段名
  placeholder?: string; // 下拉框的提示
}

export interface ItemProps {
  [key: string]: any; // 定义对象的下标为string类型
}

const { Option } = Select;

const DeptTree: React.FC<DeptTreeProps> = props => {
  const {
    treeIdKey = 'key',
    treeNameKey = 'title',
    treeChildListKey = 'children',
    treeSearchPlaceholder = '请输入关键字',
    treeDataSource = [],
    treeHasChildKey = 'isLeaf',

    // transferTargetKeys = [],
    transferDataSource = [],
    transferIdKey = 'key',
    transferNameKey = 'title',
    transferShowPersonalList = [],

    handleTransferChange,

    label = '上级领导',
    name = 'personal',
    placeholder = '请选择员工',
  } = props;
  console.log(name);

  const [visible, setVisible] = useState<boolean>(false); //模态框是否出现
  const [selectDept, setSelectDept] = useState<any>([]); //选中部门之后的员工数据
  const [showPersonalIds, setShowPersonalIds] = useState<string[]>(() => {
    return transferShowPersonalList.map((item: ItemProps) => item[transferIdKey]);
  });

  const [cachePersonalIs, setCachePersonalIds] = useState<string[]>(() => {
    return transferShowPersonalList.map((item: ItemProps) => item[transferIdKey]);
  });

  const allData = [
    { id: '1', name: '马云' },
    { id: '2', name: '马化腾' },
    { id: '3', name: '李嘉诚' },
    { id: '4', name: '刘亦菲' },
    { id: '5', name: '赵丽颖' },
    { id: '6', name: '杨 幂' },
    { id: '7', name: '王洋' },
  ];

  const selectRef = useRef<any>();

  const handleSelect = (data: any): void => {
    switch (data.key) {
      case 1:
        setSelectDept([
          { id: '1', name: '马云' },
          { id: '2', name: '马化腾' },
          { id: '3', name: '李嘉诚' },
          { id: '4', name: '刘亦菲' },
          { id: '5', name: '赵丽颖' },
          { id: '6', name: '杨 幂' },
        ]);
        break;
      case 11:
        setSelectDept([
          { id: '1', name: '马云' },
          { id: '2', name: '马化腾' },
          { id: '3', name: '李嘉诚' },
        ]);
        break;
      case 12:
        setSelectDept([
          { id: '4', name: '刘亦菲' },
          { id: '5', name: '赵丽颖' },
          { id: '6', name: '杨 幂' },
        ]);
        break;
      case 2:
        setSelectDept([{ id: '7', name: '王洋' }]);
        break;
      default:
        setSelectDept([{ id: '7', name: '王洋' }]);
    }
  };

  // 打开弹窗
  const handleOpenModal = (): void => {
    setVisible(true);
    selectRef.current.blur();
  };

  // 关闭弹窗
  const handleCloseModal = (): void => {
    setVisible(false);
  };

  // targetKeys发生改变，给父组件的回调函数
  const handleNoticeTargetKeysChange = useCallback(
    (cacheBool: boolean, targetKeys: string[]) => {
      const showPersonalList = allData.filter((item: any) => {
        if (targetKeys.indexOf(item[transferIdKey]) >= 0) return item;
      });
      if (typeof handleTransferChange === 'function') {
        const initShowPersonalIds = transferShowPersonalList.map(
          (item: ItemProps) => item[transferIdKey],
        );
        cacheBool
          ? handleTransferChange(initShowPersonalIds, showPersonalList)
          : handleTransferChange(showPersonalIds, showPersonalList);
      }
    },
    [showPersonalIds],
  );

  // 提交
  const handleSubmit = (): void => {
    handleNoticeTargetKeysChange(false, showPersonalIds);
    setVisible(false);
  };

  // 穿梭框发生改变
  const transferChange = (targetKeys: string[]): void => {
    setShowPersonalIds(targetKeys);
    setCachePersonalIds(targetKeys);
    handleNoticeTargetKeysChange(true, targetKeys);
  };

  return (
    <div>
      <Form.Item label={label} name={name}>
        <Select
          removeIcon={<div></div>}
          placeholder={placeholder}
          open={false}
          ref={selectRef}
          mode="multiple"
          onFocus={handleOpenModal}
        >
          {allData.map((item: ItemProps) => {
            return (
              <Option key={item[transferIdKey]} value={item[transferIdKey]}>
                {item[transferNameKey]}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Modal
        title="企业员工"
        visible={visible}
        width={1000}
        destroyOnClose
        maskClosable={false}
        okText="确定"
        cancelText="取消"
        onCancel={handleCloseModal}
        onOk={handleSubmit}
      >
        <Row gutter={{ xs: 4, sm: 8, md: 16 }}>
          <Col xs={24} sm={24} md={8}>
            <SearchTree
              idKey={treeIdKey}
              nameKey={treeNameKey}
              dataSource={treeDataSource}
              hasChildKey={treeHasChildKey}
              childListKey={treeChildListKey}
              searchPlaceholder={treeSearchPlaceholder}
              handleSelect={handleSelect}
            />
          </Col>
          <Col xs={24} sm={24} md={16}>
            <SimpleTransfer
              idKey="id"
              nameKey="name"
              targetKeys={cachePersonalIs}
              dataSource={selectDept}
              selectedList={transferShowPersonalList}
              handleChange={transferChange}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default memo(DeptTree);
