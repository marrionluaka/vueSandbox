import bookApi from './book-api'

describe('bookApi specs', () => {
  it('throws an error when get all books fails.', async () => {
    const api = bookApi({ get: jest.fn().mockRejectedValue(null) })
    await expect(api.getAllBooks()).rejects.toThrow('Cannot execute getAllBooks API')
  })

  it('returns books', async () => {
    const books = [{ title: 'some-book' }]
    const api = bookApi({ get: jest.fn().mockResolvedValue({ data: books }) })

    const data = await api.getAllBooks()

    expect(data).toEqual(books)
  })
})
