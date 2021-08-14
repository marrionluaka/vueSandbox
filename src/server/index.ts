// @ts-ignore
import { createServer } from 'miragejs'
import booksServer from './books'
import intercomServer from './intercom'

export default function(environment = 'development') {
  const server = createServer({ environment })

  booksServer(server)
  intercomServer(server)

  return server
}
