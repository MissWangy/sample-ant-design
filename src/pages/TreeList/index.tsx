import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Modal, Tabs, Input, Tree, List, Select, Row, Col } from 'antd';
import { UserOutlined, CloseCircleFilled, GatewayOutlined } from '@ant-design/icons';
import {
  MemberSelectProps,
  // MEMBER_SELECT_TYPE_MEMBER,
  // MEMBER_SELECT_TYPE_DEPT,
  MemberSelectValue,
} from './data.d';
import { queryMemberListService, queryDeptListService } from './service';
import { loopTreeToArr } from './arr-utils';
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

export const MEMBER_SELECT_TYPE_MEMBER: string = 'member';
export const MEMBER_SELECT_TYPE_DEPT: string = 'dept';

/**
 * 默认属性配置
 */
const defaultProps: MemberSelectProps = {
  selectBtnText: '选择成员',
  type: undefined,
  button: null,
  modalTitle: '选择成员',
  showSearch: true,
  showResult: true,
  selectType: [MEMBER_SELECT_TYPE_MEMBER, MEMBER_SELECT_TYPE_DEPT],
  multiple: true,
  disabled: false,
  memberFilter: {},
  deptFilter: {},
  memberAction: '/org/query/member',
  deptAction: '/hzyw-light/api/auth/dept/getTree',
  memberTreeTitle: '选择成员',
  deptTreeTitle: '选择部门',
};

const TreeList: React.FC<any> = (props: any) => {
  //弹框
  const [selectVisible, setSelectVisible] = useState(false);
  const treeDataInit: any = {};
  const memberCheckKeysInit: any[] = [];
  const deptSelectKeysInit: any[] = [];
  const memberSelectKeysInit: any[] = [];
  //选中的数据keys
  const [memberCheckKeys, setMemberCheckKeys] = useState(memberCheckKeysInit);
  //选中的数据对象
  const [memberCheckObjArr, setMemberCheckObjArr] = useState(memberCheckKeysInit);
  //展开的数据keys
  const [memberExpandeKeys, setMemberExpandeKeys] = useState(memberSelectKeysInit);
  //  成员选择的树形数据
  const [memberTreeData, setMemberTreeData] = useState(treeDataInit);
  const [baseMemberTreeData, setBaseMemberTreeData] = useState(treeDataInit);
  const searchKeywordInit: any = undefined;
  const [searchKeyword, setSearchKeyword] = useState(searchKeywordInit);
  const [deptExpandeKeys, setDeptExpandeKeys] = useState(deptSelectKeysInit);

  //存放选中数据
  const [checkedData, setCheckedData] = useState<MemberSelectValue[]>([]);

  //  解析后的属性配置
  const parseProps = useMemo(() => {
    return {
      ...defaultProps,
      ...props,
    };
  }, [props]);

  //  筛选关键字时更新树 数据
  useEffect(() => {
    const newExpandKeyArr: string[] = [];
    const loopTreeData = (loopArr: any[]) => {
      const newArr: any[] = [];
      loopArr &&
        loopArr.map((loopObj: any) => {
          //  是否搜索模糊匹配到
          let searchFlg = false;
          if (loopObj.title && loopObj.title.indexOf(searchKeyword) > -1) {
            searchFlg = true;
          }

          const newChildren = loopTreeData(loopObj.children);
          if (newChildren && newChildren.length > 0) {
            searchFlg = true;
          }

          if (searchFlg) {
            newExpandKeyArr.push(loopObj.id);
            newArr.push({
              ...loopObj,
              children: newChildren,
            });
          }
        });
      return newArr;
    };

    loopTreeData([baseMemberTreeData]);

    setMemberExpandeKeys(newExpandKeyArr);
    setDeptExpandeKeys(newExpandKeyArr);
  }, [searchKeyword]);

  useEffect(() => {
    // 查询成员下拉列表数据
    queryMemberCom(parseProps.memberFilter);
  }, [parseProps.memberFilter]);

  /**
   * 异步查询成员下拉列表
   * @param memberFilter
   */
  const queryMemberCom = (memberFilter: any) => {
    queryMemberListService({
      memberAction: parseProps.memberAction,
      ...memberFilter,
    }).then((res: any) => {
      if (res && res.code === '000000') {
        const pageData = res.data || {};
        const parseData = parseMemberResponseData(pageData);
        setMemberTreeData(parseData);
        setBaseMemberTreeData(parseData);
        setMemberExpandeKeys([parseData.id]);
      }
    });
  };

  /**
   * 解析服务端返回的成员树形数据
   * @param itemData
   */
  const parseMemberResponseData = (itemData: any) => {
    itemData.key = itemData.id;
    if (itemData.attributes && itemData.attributes.mType === 'dept') {
      //部门
      itemData.icon = <GatewayOutlined />;
      if (!parseProps.multiple) {
        itemData.checkable = false;
      }
      if (!(itemData.children && itemData.children.length > 0)) {
        itemData.checkable = false;
      } else {
        //把树对象变成数组
        const loopArr = loopTreeToArr(itemData);
        //  判断当前节点及以下子节点是否存在人员
        let hasMember = false;
        loopArr &&
          loopArr.map((li: any) => {
            if (li.attributes && li.attributes.mType === 'user') {
              hasMember = true;
            }
          });
        itemData.checkable = hasMember;
      }
    } else {
      //成员
      itemData.icon = itemData.icon = <UserOutlined />;
    }
    const childrenArr: any = [];
    if (itemData.children && itemData.children.length > 0) {
      itemData.children.map((citem: any) => {
        childrenArr.push(parseMemberResponseData(citem));
      });
    }
    itemData.children = childrenArr;
    return itemData;
  };

  const handleMemberCheck = (checkedKeys: any, e: any) => {
    let currentKeys = checkedKeys;
    if (!parseProps.multiple && checkedKeys && checkedKeys.length > 0) {
      currentKeys = [checkedKeys[checkedKeys.length - 1]];
    } else {
      //多选
      const loopArr = loopTreeToArr(e.node);
      const keyArr = loopArr && loopArr.map((item: any) => item.id);

      //去重
      const currentKeysMap = {};
      currentKeys &&
        currentKeys.map((keyItem: any) => {
          currentKeysMap[keyItem] = keyItem;
        });

      if (e.checked) {
        keyArr &&
          keyArr.map((keyItem: any) => {
            currentKeysMap[keyItem] = keyItem;
          });
      } else {
        keyArr &&
          keyArr.map((keyItem: any) => {
            currentKeys[keyItem] = undefined;
          });
      }
      const newKeys = Object.keys(currentKeysMap);
      const newKeyArr: any = [];
      newKeys &&
        newKeys.map((nk: string) => {
          if (currentKeysMap[nk] !== undefined) {
            newKeyArr.push(nk);
          }
        });
      currentKeys = newKeyArr;
    }

    const newcheckedKeys: any[] = [];
    const memberObjArr: any[] = [];
    currentKeys &&
      currentKeys.map((key: any) => {
        const memberObj = memberLoopDataMapMemo[key];
        //判断是否是成员
        if (memberObj && !memberObj.isDept) {
          newcheckedKeys.push(key);
          memberObjArr.push({ ...memberObj });
        }
      });
    setMemberCheckKeys(newcheckedKeys);
    setMemberCheckObjArr(memberObjArr);
  };

  const memberLoopDataMapMemo = useMemo(() => {
    const dataMap: any = {};
    //  递归循环获取用户
    const loopArr = loopTreeToArr(memberTreeData);
    loopArr &&
      loopArr.map((li: any) => {
        if (li && li.key) {
          dataMap[li.key] = li;
        }
      });
    return dataMap;
  }, [memberTreeData]);

  const handleOnSubmit = () => {
    const idmap = {};
    const newValue: MemberSelectValue[] = [];
    selectObjListMemo &&
      selectObjListMemo.map((vi: any) => {
        const { attributes } = vi;
        const isUser = attributes.mType === 'user';
        const isDept = attributes.mType === 'dept';
        let objId = vi.id;
        if (isUser) {
          objId = attributes.userId;
        }
        if (idmap[objId] === undefined) {
          newValue.push({
            id: objId,
            name: vi.title,
            isDept,
          });
          idmap[objId] = objId;
        }
      });

    setCheckedData(newValue);
    setSelectVisible(false);
  };
  //  展示操作选中的对象列表
  const selectObjListMemo = useMemo(() => {
    const dataList: any[] = [];
    //  用于去重
    const dataListMap: any = {};
    memberCheckObjArr &&
      memberCheckObjArr.map((mi: any) => {
        const bizId = (mi.attributes && mi.attributes.userId) || mi.id;
        if (dataListMap[bizId] === undefined) {
          if (props.disabledKeys && props.disabledKeys.indexOf(bizId) > -1) {
            mi.disabled = true;
          }
          dataList.push(mi);
          dataListMap[bizId] = bizId;
        }
      });

    return dataList;
  }, [memberCheckObjArr]);

  const handleRemoveItem = (record: any) => {
    //  更新选中的成员keys
    const newMemberCheckKeys: any[] = [];
    const newMemberCheckObjs: any[] = [];
    memberCheckKeys &&
      memberCheckKeys.map((item: any) => {
        if (item !== record.id) {
          const obj = memberLoopDataMapMemo[item];
          newMemberCheckKeys.push(item);
          newMemberCheckObjs.push({
            ...obj,
          });
        }
      });
    setMemberCheckKeys(newMemberCheckKeys);
    setMemberCheckObjArr(newMemberCheckObjs);
  };

  return (
    <div className={styles.content}>
      <Button
        onClick={() => {
          setSelectVisible(true);
        }}
      >
        选择成员
      </Button>

      <div style={{ height: 20 }}></div>
      {/* 展示选中的成员 */}
      <Row gutter={[24, 24]}>
        {checkedData &&
          checkedData.map((item: MemberSelectValue) => {
            return (
              <Col key={item.id}>
                <Button>{item.name}</Button>
              </Col>
            );
          })}
      </Row>

      <Modal
        title="选择成员"
        visible={selectVisible}
        width={660}
        className={styles.memberSelectModal}
        onCancel={() => {
          setSelectVisible(false);
        }}
        onOk={handleOnSubmit}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalLeftCont}>
            <div className={styles.modalLeftContent}>
              {!!(parseProps.showSearch && selectVisible) && (
                <div className={styles.contentHeader}>
                  <Search
                    allowClear
                    placeholder="请输入名称过滤"
                    className={styles.headerSearch}
                    onSearch={value => setSearchKeyword(value && value.trim())}
                  />
                </div>
              )}
              <Tabs className={styles.leftTab}>
                {parseProps.selectType &&
                  parseProps.selectType.map((sti: any) => {
                    if (sti === MEMBER_SELECT_TYPE_MEMBER) {
                      return (
                        <TabPane tab="选择成员" key="member" className={styles.treeTabpane}>
                          <Tree
                            selectable={false}
                            showIcon
                            checkable
                            multiple
                            checkedKeys={memberCheckKeys}
                            treeData={[memberTreeData]}
                            onCheck={handleMemberCheck}
                            expandedKeys={memberExpandeKeys}
                            filterTreeNode={(node: any) => {
                              if (
                                searchKeyword &&
                                searchKeyword.length > 0 &&
                                node.title &&
                                node.title.indexOf(searchKeyword) > -1
                              ) {
                                node.filterTreeNode = true;
                                return true;
                              } else {
                                node.filterTreeNode = false;
                                return false;
                              }
                            }}
                            onExpand={expandedKeys => {
                              setMemberExpandeKeys(expandedKeys);
                            }}
                          />
                        </TabPane>
                      );
                    }
                    return null;
                  })}
              </Tabs>
            </div>
          </div>

          <div className={styles.modalRightCont}>
            <div className={styles.modalRightContent}>
              <List
                header={<div>已选择</div>}
                footer={null}
                className={styles.selectObjectList}
                dataSource={selectObjListMemo}
                renderItem={(item: any) => {
                  let itemIcon = <UserOutlined className={styles.selectObjectListItemIcon} />;
                  // if (item.isDept) {
                  //   itemIcon = <CloseCircleFilled />;
                  // }
                  return (
                    <List.Item className={styles.selectObjectListItem}>
                      {itemIcon} {item.title}
                      {!item.disabled && (
                        <CloseCircleFilled
                          className={styles.selectObjectListItemClose}
                          onClick={() => handleRemoveItem(item)}
                        />
                      )}
                    </List.Item>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TreeList;
