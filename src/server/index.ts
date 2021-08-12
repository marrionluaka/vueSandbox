// @ts-ignore
import { createServer } from 'miragejs'
import productsServer from './products'
import intercomServer from './intercom'

export default function(environment = 'development') {
  const server = createServer({ environment })

  productsServer(server)
  intercomServer(server)

  return server
}
