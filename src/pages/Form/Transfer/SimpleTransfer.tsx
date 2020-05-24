/**
 * 穿梭框组件
 * @author SPY
 * @date 2020/04/04
 */
import React, { useState, memo } from 'react';
import _ from 'lodash';
import { Transfer } from 'antd';

export interface SimpleTransferProps {
  idKey?: string; // 穿梭框对应对应的id名称
  nameKey?: string; // 穿梭框对应的name名称

  dataSource: Array<TransferItem>; // 穿梭框左侧的总数据
  targetKeys?: string[]; // 穿梭框右侧对应的id集合

  selectedList?: Array<TransferItem>; // 被选中的数据列表,格式：[{key:1,title:'测试'}]

  handleChange?: (targetKeys: string[]) => void; // 选择后的回调函数

  [x: string]: any; // 兼容antd组件默认参数传入
}

export interface TransferItem {
  key: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  [name: string]: any;
}

export interface ItemProps {
  [key: string]: any; // 定义对象的下标为string类型
}

const SimpleTransfer: React.FC<SimpleTransferProps> = props => {
  const {
    idKey = 'key',
    nameKey = 'title',
    dataSource = [],
    targetKeys = [],
    selectedList = [],
    handleChange,
  } = props;

  const [newTargetKeys, setNewTargetKeys] = useState<string[]>(() => {
    return targetKeys;
  });

  // 选项在两栏之间转移时的回调函数
  const onChange = (targetKeys: string[]) => {
    setNewTargetKeys(targetKeys);
    if (typeof handleChange === 'function') handleChange(targetKeys);
  };

  const onSearch = (dir: any, value: any) => {
    // console.log('search:', dir, value);
  };

  return (
    <Transfer
      rowKey={(item: any) => item[idKey]}
      dataSource={_.uniqBy([...dataSource, ...selectedList], nameKey)}
      showSearch
      listStyle={{
        width: '45%',
        height: 300,
      }}
      locale={{
        itemUnit: '位员工',
        itemsUnit: '位员工',
        searchPlaceholder: '请输入员工姓名',
      }}
      titles={['待选区', '已选区']}
      targetKeys={newTargetKeys}
      onChange={onChange}
      onSearch={onSearch}
      render={(item: any) => item[nameKey]}
    />
  );
};

export default memo(SimpleTransfer);
