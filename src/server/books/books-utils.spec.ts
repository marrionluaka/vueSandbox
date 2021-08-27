import { pluck, reverse } from 'ramda'
import { getBooks, sortBooks } from './books-utils'

const books = [
  {
    rank: 14,
    title: 'Da Vinci Code,The',
    rating: 5,
    author: 'Brown Dan',
    volume_sales: '1,787,118',
    editions_combined: 5,
    imprint: 'ATOM',
    publisher: 'Little, Brown Book Grp',
    publication_date: 'Saturday, May 24, 2008',
    genre: 'F2.1  Crime, Thriller and Adventure'
  },
  {
    rank: 13,
    rating: 5,
    title: 'Harry Potter and the Deathly Hallows',
    volume_sales: '1,787,118',
    editions_combined: 5,
    imprint: 'ATOM',
    publisher: 'Little, Brown Book Grp',
    publication_date: 'Saturday, May 24, 2008',
    author: 'Rowling J.K.',
    genre: "Y2.1  Children's Fiction"
  },
  {
    rank: 12,
    rating: 5,
    title: "Harry Potter and the Philosopher's Stone",
    volume_sales: '1,787,118',
    editions_combined: 5,
    imprint: 'ATOM',
    publisher: 'Little, Brown Book Grp',
    publication_date: 'Saturday, May 24, 2008',
    author: 'Rowling J.K.',
    genre: "Y2.1  Children's Fiction"
  }
]

describe('book utils', () => {
  it('finds books by title', () => {
    const expected = 'Da Vinci Code,The'
    const actual = getBooks({ q: 'da Vinci Co' }, books)

    expect(actual[0].title).toBe(expected)
  })

  it('finds books by genre', () => {
    const expected = 'Harry Potter and the Deathly Hallows'
    const actual = getBooks({ genre: 'Y2.1  Children' }, books)

    expect(actual[0].title).toBe(expected)
  })

  it('finds books for multiple authors', () => {
    const actual = getBooks({ author: 'Rowling J.K.|Brown Dan' }, books)

    expect(actual.find(x => x.author.includes('Brown Dan'))).toBeTruthy()
    expect(actual.find(x => x.author.includes('Rowling J.K.'))).toBeTruthy()
  })

  describe('sorting books', () => {
    const getRank = pluck<any>(['rank'])

    it('sorts a list by a given prop ASC', () => {
      const expected = reverse(getRank(books))
      const actual = sortBooks('rank', books)

      expect(getRank<any>(actual)).toEqual(expected)
    })

    it('sorts a list by a given prop DESC', () => {
      const expected = getRank(books)
      const actual = sortBooks('-rank', books)

      expect(getRank<any>(actual)).toEqual(expected)
    })
  })
})
