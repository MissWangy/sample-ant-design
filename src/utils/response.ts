export interface Response<T> {
  code: string
  msg: string
  data: T
  page: {
    current: number
    pageSize: number
    total: number
    list: any[]
  }
}


export interface Pagination<T> {
  list: T
  pagination: {
    total: number
    pageNum: number
    pageSize: number
  }
}

export interface PaginationResponse<T> extends Response<Pagination<T>> {

}