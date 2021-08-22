import { getBooks } from './books-utils'

describe('book utils', () => {
  it('finds books by title', () => {
    const expected = 'Da Vinci Code,The'
    const actual = fetchBooks(getBooks({ q: 'da Vinci Co' }))

    expect(actual[0].title).toBe(expected)
  })

  it('finds books by genre', () => {
    const expected = 'Harry Potter and the Deathly Hallows'
    const actual = fetchBooks(getBooks({ genre: 'Y2.1  Children' }))

    expect(actual[0].title).toBe(expected)
  })

  it('finds books for multiple authors', () => {
    const actual = fetchBooks(getBooks({ author: 'Rowling J.K.|Brown Dan' }))

    expect(actual.find(x => x.author.includes('Brown Dan'))).toBeTruthy()
    expect(actual.find(x => x.author.includes('Rowling J.K.'))).toBeTruthy()
  })
})

function fetchBooks(fn: any) {
  const books = [
    {
      title: 'Da Vinci Code,The',
      author: 'Brown Dan',
      genre: 'F2.1  Crime, Thriller and Adventure'
    },
    {
      title: 'Harry Potter and the Deathly Hallows',
      author: 'Rowling J.K.',
      genre: "Y2.1  Children's Fiction"
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: 'Rowling J.K.',
      genre: "Y2.1  Children's Fiction"
    }
  ]

  return books.filter(fn)
}
