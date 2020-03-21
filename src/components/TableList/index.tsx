import React, { useState, useEffect, useCallback, useImperativeHandle } from "react"
import { Table, Button, Card, Alert } from "antd"
import { PaginationConfig } from "antd/lib/table";
import styles from "./index.less"
import { PaginationResponse } from "@/utils/response";
import SearchHeader from "./SearchHeader"
import { PropTypes, GetList, Query } from "./interface"
import Actions from "./Actions"

const defaultPageIndex = 1;
const defaultPageSize = 10;

interface PageType {
  pageIndex?: number,
  pageSize?: number
}

const TableList: React.FC<PropTypes> = (props: PropTypes) => {
  const { getList, searchQuery, tableProps, actions, queryPropsEx, childrenQuery, getCheckboxProps, sortParse } = props
  const [pageIndex, setPageIndex] = useState(defaultPageIndex)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState({} as Query)
  const [sloading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState<any>([])
  const [list, setList] = useState<any>([])
  useImperativeHandle(props.pRef, () => ({
    // 用于刷新数据，页码不重置等情况
    customRefresh: (_query: any) => {
      handleQuery({}, _query || query)
    },
    refresh: () => {
      handleSearch(query)
      setSelectedRows([])
    }
  }))

  useEffect(() => {
    handleQuery({
      pageIndex,
      pageSize,
    }, query);
    return () => {
      setPageIndex(defaultPageIndex);
    }
  }, [props.renderIndex])

  /**
   * 统一异步请求列表数据
   * @param page
   * @param query
   */
  const handleQuery = (page: PageType = {}, queryData?: any, orderData?: any) => {
    console.info("handleQuery queryData", orderData)
    setLoading(true);

    //  整理最新的模糊查询对象
    const postQuery = {
      ...query,
      ...queryData,
    }

    //  整理异步请求参数
    const postParams = {
      ...queryPropsEx,
      ...postQuery,
      ...orderData,
      current: page.pageIndex || pageIndex,
      pageSize: page.pageSize || pageSize
    }

    getList(postParams).then((res: PaginationResponse<any>) => {

      setPageIndex(postParams.current)
      setPageSize(postParams.pageSize)
      setQuery(postQuery)

      setSelectedRows([]);

      if (typeof (props.listFilter) === "function") {
        let list = props.listFilter(res)
        if (!tableProps.rowKey) {
          list = list.map((item, index: number) => {
            return {
              ...item,
              "_iIndex": index.toString()
            }
          })
        }

        setList(list);

        childrenQuery && childrenQuery(list, (arr: any[]) => {
          setList(arr);
        });

        //  如果当前页列表数据为空, 跳转前一页
        if (postParams.current > defaultPageIndex && list.length === 0) {
          handleQuery({
            pageIndex: postParams.current - 1
          })
        }
      } else {

        setList(res.page.list);

        childrenQuery && childrenQuery(res.page.list, (arr: any[]) => {
          setList(arr);
        });

        //  如果当前页列表数据为空, 跳转前一页
        if (postParams.current > defaultPageIndex && res.page.list.length === 0) {
          handleQuery({
            pageIndex: postParams.current - 1
          })
        }
      }

      if (typeof (props.totalParse) === "function") {
        const total = props.totalParse(res)
        setTotal(total)
      } else {
        setTotal(res.page.total)
      }
    }).catch((e: any) => {

    }).finally(() => {
      setLoading(false)
    })
  }

  const handleSearch = (query: { [key: string]: any }) => {
    handleQuery({
      pageIndex: defaultPageIndex
    }, query)
  }

  const rowSelection = {
    selectedRowKeys: selectedRows!.map((item: any, index: number) => tableProps.rowKey ? item[tableProps.rowKey!.toString()] : item._iIndex),
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      setSelectedRows(selectedRows)
      if (typeof (props.onSelectedRowsChange) === "function") {
        props.onSelectedRowsChange(selectedRowKeys, selectedRows)
      }
    },
    getCheckboxProps,
  };

  const paginationOptions: PaginationConfig = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize,
    pageSize: pageSize,
    current: pageIndex,
    pageSizeOptions: ["10", "20", "50", "100"],
    total: total,
    showTotal: (total: number) => {
      return `共${total}条记录`
    },
    // onChange: (page: number, size?: number) => {
    //   console.info("page onchage")
    //   handleQuery({
    //     pageIndex: page,
    //     pageSize: size
    //   })
    //   if (typeof (props.onPageChange) === "function") {
    //     props.onPageChange(page, size!)
    //   }
    // },
    onShowSizeChange: (current: number, size: number) => {
      handleQuery({
        pageIndex: current,
        pageSize: size
      })
      if (typeof (props.onPageChange) === "function") {
        props.onPageChange(current, size)
      }
    }
  }

  const columns = tableProps.columns!.map((item: any) => {
    if (!item) return {}

    return {
      ...item,
      render: (data: any, record: any, index: number) => {
        if (typeof (item.render) === "function") {
          return (
            <div style={{ minWidth: item.minWidth }}>
              {item.render(data, record, index)}
            </div>
          )
        } else {
          return (
            <div style={{ minWidth: item.minWidth }}>
              {data}
            </div>
          )
        }
      }
    }
  })

  const messageAlert = useCallback((total: number, selected: number) => {
    const clearSelect = () => {
      setSelectedRows([])
    }
    return (
      <>
        已选择 {selected} 条
        <Button type="link" onClick={clearSelect} size="small">清空</Button>
      </>
    )
  }, [])

  /**
   * table默认切换查询
   */
  const handleTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    const { current, pageSize } = pagination;
    let orderParamData;
    if (sortParse) {
      orderParamData = sortParse(sorter);
    }
    handleQuery({
      pageIndex: current,
      pageSize: pageSize
    }, undefined, orderParamData);
    if (typeof (props.onPageChange) === "function") {
      props.onPageChange(current, pageSize!)
    }

  }

  return (
    <Card>
      <SearchHeader handleSearch={handleSearch} searchQuery={searchQuery!} />
      {searchQuery && searchQuery.length > 0 &&
        <div style={{ height: "12px" }}></div>
      }
      <Actions actions={actions!} selectedRows={selectedRows} />
      {actions && actions.length > 0 &&
        <div style={{ height: "16px" }}></div>
      }
      {props.isShowRowSelection &&
        <>
          <Alert message={messageAlert(total, selectedRows.length)} type="info" showIcon />
          <div style={{ height: "16px" }}></div>
        </>
      }
      <Table
        {...tableProps}
        onChange={handleTableChange}
        className={styles.commonTableList}
        columns={columns}
        bordered={false}
        dataSource={list}
        rowSelection={props.isShowRowSelection ? rowSelection : undefined}
        rowKey={(record, index: number) => tableProps.rowKey ? record[tableProps.rowKey!.toString()] : record._iIndex}
        loading={sloading}
        pagination={paginationOptions}
        size={tableProps.size || "default"}
        scroll={{
          x: "100%"
        }}
      />
    </Card>
  )
}

export default TableList
