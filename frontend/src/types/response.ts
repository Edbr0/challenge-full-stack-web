export type ResponseApi<T = any> = {
  status: string
  statusCode: number
  message: string
  data: T
}
