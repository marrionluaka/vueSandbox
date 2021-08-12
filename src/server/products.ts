// @ts-ignore
import { Factory, Model, RestSerializer, hasMany, belongsTo } from 'miragejs'

export default function(server: any) {
  server.config({
    serializers: {
      product: RestSerializer.extend({
        include: ['categories'],
        embed: true
      })
    },

    models: {
      category: Model.extend({
        products: hasMany()
      }),
      product: Model.extend({
        categories: belongsTo()
      })
    },

    factories: {
      category: Factory.extend({
        name(i: any) {
          return `Category ${i}`
        },

        afterCreate(categories: any, server: { createList: any }) {
          if (!categories.products.length) {
            server.createList('product', 5, { categories })
          }
        }
      }),
      product: Factory.extend({
        sku: 'qw03i1',
        type: 'Air Max'
      })
    },

    seeds() {
      server.create('category')
      // server.createList('product', 100)
      // const clothes = server.create('category', { name: 'Clothes' })
      // server.create('product', { sku: 'qw03i3', type: 'MontClaire', categories: clothes })
    },

    routes() {
      this.get('/api/products', (schema: any) => {
        return schema.products.all()
      })
      this.post('/api/products', (schema: any, request: any) => {
        const attrs = JSON.parse(request.requestBody)
        return schema.products.create(attrs)
      })
      this.delete('/api/products/:id', (schema: any, request: any) => {
        const id = request.params.id
        return schema.products.find(id).destroy()
      })
      this.get('/api/categories', (schema: any) => {
        return schema.categories.all()
      })
      this.get('/api/categories/:id/products', (schema: any, request: any) => {
        const categoryId = request.params.id
        const categories = schema.categories.find(categoryId)

        return categories.products
      })
    }
  })
}
