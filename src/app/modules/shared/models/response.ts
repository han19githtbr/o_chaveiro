export interface Response<P> {
  result: {
    page: number,
    total: number,
    registros: P[]
  }
}
