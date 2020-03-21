import React from "react"
import { Form, Button, Popconfirm } from "antd";
import { ButtonProps } from "antd/lib/button";

export interface ActionProps extends ButtonProps {
  label: string,
  /**
   * 按钮类型
   * default： 默认
   * batch： 批量操作按钮  多选时显示
   */
  btnType?: "default" | "batch",
  /**
   * 是否需要确认
   */
  confirm?: boolean,
  /**
   * 确认文案
   */
  confirmText?: String,
  /**
   * 批量按钮时的点击事件
   * @param e
   * @param selectedRows
   */
  onBatchClick?(e: any, selectedRows: any[]): void
}

interface PropTypes {
  actions: ActionProps[],
  selectedRows: any[]
}

const Actions: React.FC<PropTypes> = (props: PropTypes) => {
  const { actions, selectedRows } = props
  return (
    <Form layout="inline">
      {actions && actions.map((item, index: number) => {
        const btnProps = {
          ...item,
          btnType: undefined,
          onBatchClick: undefined,
        }

        const { confirm } = item;
        let btnDom;
        let batchBtnDisabled = false;

        if (item.btnType === "batch") {
          if (selectedRows.length > 0) {
            if (confirm) {
              btnDom = (
                <Button {...btnProps} type={item.type || "default"} onClick={() => { }} >{item.label}</Button>
              )
            } else {
              btnDom = (
                <Button type={item.type || "default"} onClick={
                  (e) => {
                    item.onBatchClick && item.onBatchClick(e, selectedRows);
                  }
                }>{item.label}</Button>
              )
            }

          } else {
            batchBtnDisabled = true;
            btnDom = (
              <Button {...btnProps} type={item.type || "default"} disabled>{item.label}</Button>
            )
          }
        } else {
          if (confirm) {
            btnDom = (
              <Button {...item} type={item.type || "default"} onClick={() => { }}>{item.label}</Button>
            )
          } else {
            btnDom = (
              <Button {...item} type={item.type || "default"}>{item.label}</Button>
            )
          }

        }

        if (btnDom) {
          if (confirm && !batchBtnDisabled) {
            return (
              <Form.Item key={index.toString()}>
                <Popconfirm
                  title={item.confirmText || "确定要批量操作吗?"}
                  onConfirm={(e) => {
                    if (item.btnType === "batch") {
                      item.onBatchClick && item.onBatchClick(e, selectedRows);
                    } else {
                      item.onClick && item.onClick(e!);
                    }
                  }}
                >
                  {btnDom}
                </Popconfirm>
              </Form.Item>
            )
          } else {
            return (
              <Form.Item key={index.toString()}>
                {btnDom}
              </Form.Item>
            )
          }
        }

        return null;

      })}
    </Form>
  )
}

export default Actions
