/**
 * 搜索树组件
 * @author SPY
 * @date 2020/03/31
 */
import React, { useState, memo } from 'react';
import { Tree, Card, Input } from 'antd';
import treeUtils from '@/utils/treeUtils';

export interface SearchTreeProps {
  idKey?: string; // 树节点对应的id名称
  nameKey?: string; // 树节点对应的name名称
  hasChildKey?: string; // 树节点是否有子级的id名称,即判断树节点是否为叶子节点,默认为:isLeaf
  childListKey?: string; // 树节点的子集列表的id名称,默认为:children

  searchPlaceholder?: string; // 搜索的placeholder提示语
  showSearchPoint?: boolean; // 是否显示"<="指向

  isBindSelectAndExpand?: boolean; // 是否将"选中"、"展开"绑定,--展开即绑定,绑定即展开

  handleSelect?: (data: any) => void;

  dataSource: Array<ItemProps>; // 格式：[{ title: '河南', key: 'A100', children: [{ title: '郑州', key: 'A1001' }] }]
  [x: string]: any; // 兼容antd组件默认参数传入
}

export interface ItemProps {
  [key: string]: any; // 定义对象的下标为string类型
}

const { TreeNode } = Tree;
const { Search } = Input;

const SearchTree: React.FC<SearchTreeProps> = props => {
  const {
    idKey = 'key',
    nameKey = 'title',
    hasChildKey = 'isLeaf',
    childListKey = 'children',
    searchPlaceholder = '请输入关键字',
    showSearchPoint = true,
    isBindSelectAndExpand = true,
    handleSelect,
    dataSource = [],
    ...restProps
  } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  /**
   * 实时搜索功能函数
   * @param value -- 输入框的关键字
   */
  const onChange = (value: string): void => {
    const expandedKeys: React.ReactText[] = [];
    treeUtils.forEach(dataSource, childListKey, node => {
      if (value && node[nameKey].indexOf(value) >= 0) {
        expandedKeys.push(node[idKey]);
      }
    });
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true); // 搜索时autoExpandParent设置为true,手动展开时autoExpandParent设置为false
  };

  /**
   * 展开树节点执行函数
   * @param expandedKeys -- 展开的树节点的idKey,格式:['xxx','yyy']
   * @param expanded -- 是否展开,格式:bool
   * @param node -- 当前选中的【唯一】节点信息,可以通过node.props.data取值
   */
  const onExpand = (expandedKeys: React.ReactText[], { expanded, node }: any): void => {
    const nodeData = node.data;
    const expandedKey = nodeData[idKey];

    // 如果有handleOnSelect回调函数传入,则执行它
    if (typeof handleSelect === 'function') {
      handleSelect(nodeData);
    }

    //是否绑定"选中"和"展开"
    if (isBindSelectAndExpand) {
      setExpandedKeys(expandedKeys);
      setSelectedKeys([expandedKey]);
    } else {
      setExpandedKeys(expandedKeys);
    }
    setAutoExpandParent(false);
  };

  /**
   * 选中树节点执行函数
   * @param selectedKeys -- 选中的树节点的idKey,格式:['xxx','yyy']
   * @param selected  -- 是否选中,格式:bool
   * @param selectedNodes  -- 选中的节点的node,格式:['xxx','yyy'],可以通过selectedNodes[0].props.data取值
   * @param node -- 当前选中的【唯一】节点信息,可以通过node.props.data取值
   */
  const onSelect = (
    selectedKeys: React.ReactText[],
    { selected, selectedNodes, node }: any,
  ): void => {
    const nodeData = node.data;
    // 如果有handleSelect回调函数传入,则执行它
    if (typeof handleSelect === 'function') {
      handleSelect(nodeData);
    }

    // 是否绑定"选中"和"展开"
    if (isBindSelectAndExpand) {
      const selectedKey: string = nodeData[idKey];
      if (expandedKeys.indexOf(selectedKey) === -1) {
        // 已经展开的expandedKeys中,如果没有该节点,则插入selectedKeys、expandedKeys
        setSelectedKeys(selectedKeys);
        setExpandedKeys([...selectedKeys, ...expandedKeys]);
        setAutoExpandParent(false);
      } else {
        // 已经展开的expandedKeys中,如果有该节点,则只插入selectedKeys
        setSelectedKeys(selectedKeys);
      }
    } else {
      setSelectedKeys(selectedKeys);
    }
  };

  /**
   * 渲染树节点NodeName函数
   * @param key -- 树节点的idKey对应的值
   * @param title -- 树节点的nameKey对应的值
   * @param currentNodeData -- 当前选中的树节点的数据信息
   */
  const renderTitle = (
    key: React.ReactText,
    title: string,
    currentNodeData: Array<ItemProps>,
  ): React.ReactNode => {
    let index: number = -1;
    if (searchValue) {
      index = title.indexOf(searchValue);
    }
    return (
      <div>
        {index >= 0 ? (
          <>
            {title.substr(0, index)}
            <span style={{ color: 'red' }}>{searchValue}</span>
            {title.substr(index + searchValue.length)}
            {showSearchPoint && <span style={{ color: 'blue' }}>{' <='}</span>}
          </>
        ) : (
          <span>{title}</span>
        )}
      </div>
    );
  };

  /**
   * 逐级渲染树节点函数
   * @param data -- 树节点要展示的数据
   * @description -- 当前树节点中如果有“children”字段,会调用自身函数,直到仅有叶子结束
   */
  const renderTreeNodes = (data: Array<ItemProps>): React.ReactNode => {
    return data.map((item: any) => {
      if (item[childListKey]) {
        return (
          <TreeNode
            title={renderTitle(item[idKey], item[nameKey], item)}
            key={item[idKey]}
            data={item}
          >
            {renderTreeNodes(item[childListKey])}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={renderTitle(item[idKey], item[nameKey], item)}
          key={item[idKey]}
          data={item}
          isLeaf={item[hasChildKey] !== undefined ? item[hasChildKey] : true} // 是否为可以展开,是否是叶子节点
        />
      );
    });
  };

  return (
    <Card
      // title={title}
      style={{
        maxWidth: 300,
        maxHeight: 300,
        border: '1px solid #d9d9d9',
        overflow: 'auto',
      }}
      size="small"
    >
      <Search
        placeholder={searchPlaceholder}
        style={{ marginBottom: 6 }}
        onChange={e => onChange(e.target.value)}
        allowClear
      />
      <Tree
        // loadData={this.loadData}
        onSelect={onSelect}
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        {...restProps}
      >
        {renderTreeNodes(dataSource)}
      </Tree>
    </Card>
  );
};

export default memo(SearchTree);
