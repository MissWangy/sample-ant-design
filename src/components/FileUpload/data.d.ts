import { UploadFile } from "antd/lib/upload/interface";

export interface FileUploadProps {
  value: FileType[];
  onChange: Function;

  /**
   * 是否可以预览
   */
  canShow?: boolean;

  /**
   * 是否可以移除
   */
  canRemove?: boolean;

  /**
   * 是否支持多选
   */
  multiple?: boolean;

  /**
   * 最大数量
   */
  maxLength?: number;

  /**
   * 文件上传最大限制 (单位M)
   */
  maxSize?: number;

  /**
   * 单个文件的样式
   */
  fileItemClass?: any;

  /**
   * 上传按钮
   */
  uploadBtn?: any;

  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 接受的文件类型
   */
  accept: string;
}

export interface FileType extends UploadFile {
  fileKey: string;
  fileName: string;
  fileSize: number;
  showPath: string;
  isMain?: boolean;
}
