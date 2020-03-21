import React, { useEffect, useState } from 'react';

import styles from './index.less';
import { Icon, Upload, message, Button, Modal } from 'antd';
import { FileUploadProps, FileType } from './data';
// import { uploadFile } from '@/services/api';

// import { getToken } from "@/utils/token";

const initFileList: FileType[] = [];

/**
 * 图片上传组件
 * @param props
 */
const FileUpload: React.FC<any> = (props: FileUploadProps) => {

  const [fileList, setFileList] = useState(initFileList);

  useEffect(() => {
    parseValueToFileList();
  }, [props.value])

  const parseValueToFileList = () => {
    setFileList(props.value);
  }

  /**
   * 上传数据变更时事件
   */
  const handleChangeUpload = (info: any) => {
    const { fileList } = info;

    let uploading = false;

    //  最大上传数量限制
    const { maxLength = -1 } = props;

    const afterList: FileType[] = [];
    fileList && fileList.map((fitem: FileType) => {

      if (maxLength < 0 || afterList.length < maxLength) {

        if (fitem.status === 'uploading') {
          uploading = true;
          afterList.push(fitem);
        }
        if (fitem.status === 'done') {
          const resData = (fitem.response && fitem.response.data) || fitem;
          afterList.push({
            ...fitem,
            fileKey: resData.id,
            fileName: resData.fileName,
            fileSize: resData.fileSize,
            showPath: resData.showPath,
            url: resData.showPath,
          })
        }
      }
    })

    setFileList(afterList);

    if (!uploading) {
      const { onChange } = props;
      onChange && onChange(afterList);
    }

  }

  const hanndleBeforeUpload = (file: any, fileList: any) => {
    const maxSize = props.maxSize || 20;
    if (file.size > maxSize * 1024 * 1024) {
      message.warn(`文件大小不能超过${maxSize}M`);
      return false;
    }
    return true;
  }

  const uploadBtn = props.uploadBtn || (
    <Button>
      <Icon type="upload" /> 上传
    </Button>
  )

  let AuthorizationStr = "";
  try {
    // AuthorizationStr = `Bearer ${JSON.parse(getToken()).access_token}`;
  } catch (e) {

  }

  const uploadProps = {
    name: "multipartFile",
    // action: uploadFile(),
    fileList: fileList,
    onChange: handleChangeUpload,
    beforeUpload: hanndleBeforeUpload,
    multiple: props.multiple || false,
    headers: {
      Authorization: AuthorizationStr
    },
    accept: props.accept,
    onRemove: (file: any) => {
      const { id } = file;
      Modal.confirm({
        title: '确定要删除该文件吗?',
        okText: '是',
        cancelText: '否',
        onOk() {
          const afterList: any[] = [];
          fileList && fileList.map((fitem: any) => {
            if (fitem.id !== id) {
              afterList.push(fitem)
            }
          })

          handleChangeUpload({
            fileList: afterList
          })
        }
      });
      return false;
    }
  };

  const { maxLength = -1, width } = props;

  return (
    <div className={styles.imageUploadCont}>
      <div className={styles.imageUploadWrap} style={{
        width
      }}>
        <Upload
          {...uploadProps}
          listType="text"
          className={styles.imageUpload}
        >
          {!!(maxLength < 0 || fileList === undefined || fileList.length < maxLength) && <div>{uploadBtn}</div>}
        </Upload>
      </div>
    </div>
  )
}

export default FileUpload;
