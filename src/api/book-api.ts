import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getAllBooks = async () => {
  try {
    const { data } = await axios.get('books')
    return data
  } catch (e) {
    throw new Error('Cannot execute getAllBooks API')
  }
}
