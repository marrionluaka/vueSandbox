import { curry } from 'ramda'

export const paginate = curry((limit: number = 5, page: number = 0, list: any[]) => {
  const start = page * limit
  const end = start + limit
  const count = list.length
  const next = Math.round(count / limit) <= page + 1 ? 0 : page + 1

  return {
    count,
    next,
    prev: Math.max(0, page - 1),
    results: list.slice(start, end)
  }
})
