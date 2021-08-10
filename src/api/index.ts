import defaultAxios from 'axios'
import bookApi from './book-api'

const axios = defaultAxios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const bookService = bookApi(axios)
