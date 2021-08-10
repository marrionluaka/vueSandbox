export default function(axios: any) {
  return Object.freeze({
    getAllBooks
  })

  async function getAllBooks() {
    try {
      const { data } = await axios.get('books')
      return data
    } catch (e) {
      throw new Error('Cannot execute getAllBooks API')
    }
  }
}
