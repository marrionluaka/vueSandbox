import bookApi from './book-api'

describe('bookApi specs', () => {
  it('throws an error when get all books fails.', async () => {
    const api = bookApi({ get: jest.fn().mockRejectedValue(null) })
    await expect(api.getBooks()).rejects.toThrow('Cannot execute getBooks API')
  })

  it('returns books', async () => {
    const books = [{ title: 'some-book' }]
    const api = bookApi({ get: jest.fn().mockResolvedValue({ data: books }) })

    const data = await api.getBooks()

    expect(data).toEqual(books)
  })

  it('returns books for a specified search term', async () => {
    const books = [{ title: 'Elon Tesla...' }]
    const api = bookApi({ get: jest.fn().mockResolvedValue({ data: books }) })

    const data = await api.getBooks('Elon')

    expect(data).toEqual(books)
  })
})
