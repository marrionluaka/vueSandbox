export default function(axios: any) {
  return Object.freeze({
    getBooks
  })

  async function getBooks(search: string = ''): Promise<any[]> {
    try {
      //new RegExp("^(" + this.term + ")", "i")
      const { data } = await axios.get(`books?q=${search}`)
      return data
    } catch (e) {
      throw new Error('Cannot execute getBooks API')
    }
  }
}
