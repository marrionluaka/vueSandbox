import { range } from 'ramda'
import { paginate } from './books-pagination'

describe('books pagination', () => {
  it.each`
    page | expected
    ${1} | ${{ count: 30, next: 2, prev: 0, results: range(5, 10) }}
    ${2} | ${{ count: 30, next: 3, prev: 1, results: range(10, 15) }}
    ${3} | ${{ count: 30, next: 4, prev: 2, results: range(15, 20) }}
    ${4} | ${{ count: 30, next: 5, prev: 3, results: range(20, 25) }}
    ${5} | ${{ count: 30, next: 6, prev: 4, results: range(25, 30) }}
  `('paginates a given list', ({ page, expected }) => {
    const items = range(0, 30)
    const limit = 5

    const actual = paginate(limit, page, items)

    expect(actual).toEqual(expected)
  })
})
