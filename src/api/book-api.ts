export default function(axios: any) {
  return Object.freeze({
    getBooks
  })

  async function getBooks(search: string = ''): Promise<any[]> {
    try {
      const {
        data: { books }
      } = await axios.get(`books?q=${search}`)
      return books
    } catch (e) {
      throw new Error('Cannot execute getBooks API')
    }
  }
}
