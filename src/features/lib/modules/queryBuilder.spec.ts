import { buildQuery } from './queryBuilder'

describe('useUrlBuilder', () => {
  it('creates a url from a given object', () => {
    const expected = 'q=elon&author=Ashlee%20Vance'
    const actual = buildQuery([
      { key: 'q', value: 'elon' },
      { key: 'author', value: 'Ashlee Vance' }
    ])

    expect(actual).toEqual(expected)
  })

  it('enables AND operator for a single key', () => {
    const expected = 'q=future&author=Ashlee%20Vance%7CJk%20Rowling'
    const actual = buildQuery([
      { key: 'q', value: 'future' },
      { key: 'author', value: 'Ashlee Vance' },
      { key: 'author', value: 'Jk Rowling' }
    ])

    expect(actual).toEqual(expected)
  })
})
