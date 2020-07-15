/**
 * 组织架构成员选择组件的属性配置
 */
export interface MemberSelectProps {
  /**
   * 选择按钮的文案
   */
  selectBtnText?: string;

  /**
   * 自定义传入显示按钮
   */
  button?: React.ReactNode;

  /**
   * 选择对话框的标题
   */
  modalTitle?: string;

  /**
   * 是否显示模糊过滤功能
   */
  showSearch?: boolean;
  /**
   * 是否显示选中结果
   */
  showResult?: boolean;

  value?: MemberSelectValue[];
  onChange?: Function;

  /**
   * 成员查询过滤属性
   */
  memberFilter?: any;
  /**
   * 部门查询过滤属性
   */
  deptFilter?: any;

  /**
   * 按钮类型
   */
  type?: any;

  /**
   * 可选择的交互方式
   */
  selectType?: any[];

  /**
   * 查询成员的接口地址
   */
  memberAction?: string;
  /**
   * 查询部门的接口地址
   */
  deptAction?: string;

  /**
   * 是否支持多选
   */
  multiple?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 成员树的标题
   */
  memberTreeTitle?: string;

  /**
   * 部门树的标题
   */
  deptTreeTitle?: string;
}

/**
 * 组织架构选择的Value配置
 */
export interface MemberSelectValue {
  id: string;
  name: string;
  isDept: boolean;
}
export const MEMBER_SELECT_TYPE_MEMBER: string = 'member';
export const MEMBER_SELECT_TYPE_DEPT: string = 'dept';
