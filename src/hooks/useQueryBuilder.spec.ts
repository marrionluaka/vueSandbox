import { useQueryBuilder } from './useQueryBuilder'

describe('useUrlBuilder', () => {
  it('creates a url from a given object', () => {
    const expected = 'q=elon&author=Ashlee%20Vance'
    const actual = useQueryBuilder().buildQuery([
      { key: 'q', value: 'elon' },
      { key: 'author', value: 'Ashlee Vance' }
    ])

    expect(actual).toEqual(expected)
  })

  it('enables AND operator for a single key', () => {
    const expected = 'q=future&author=Ashlee%20Vance+Jk%20Rowling'
    const actual = useQueryBuilder().buildQuery([
      { key: 'q', value: 'future' },
      { key: 'author', value: 'Ashlee Vance' },
      { key: 'author', value: 'Jk Rowling' }
    ])

    expect(actual).toEqual(expected)
  })
})
