import { isNil, not, pipe, toPairs, join, reduce, last, ifElse, curry, map } from 'ramda'

export const useQueryBuilder = () => {
  const isNotNill = pipe(isNil, not)
  const sanitizeSearch = (acc: any, val: any) => {
    ifElse(
      isNotNill,
      () => (acc[val.key] = `${acc[val.key]}+${val.value}`),
      () => (acc[val.key] = val.value)
    )(acc[val.key])

    return acc
  }
  const addAmpersand = curry((list: string[], acc: any, val: any) => {
    return last(list) !== val ? acc.concat(val.concat('&')) : acc.concat(val)
  })
  const toQuery = (list: string[]) => reduce(addAmpersand(list) as any, '', list)
  const buildQuery = (list: any[]): string => pipe(reduce(sanitizeSearch, {}), toPairs, map(join('=')), toQuery, encodeURI)(list)

  return { buildQuery }
}
