// @ts-ignore
import { createServer, Factory, Model, RestSerializer, hasMany, belongsTo } from 'miragejs'

export default function(environment = 'development') {
  return createServer({
    environment,

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

    seeds(server: any) {
      server.create('category')
      // server.createList('product', 100)
      // const clothes = server.create('category', { name: 'Clothes' })
      // server.create('product', { sku: 'qw03i3', type: 'MontClaire', categories: clothes })

      server.db.loadData({
        messages: [
          {
            id: 1,
            isActive: false,
            name: 'Richard Watson',
            profileImagePath:
              'https://images.unsplash.com/photo-1513152697235-fe74c283646a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.35&w=144&h=144&q=80',
            location: 'Stantam',
            timeStamp: '16m',
            excerpt: "I'm looking for a new project management tool. Do you guys do demos? aldklskdlakd"
          },
          {
            id: 2,
            isActive: true,
            name: 'Steve Dunn',
            profileImagePath:
              'https://images.unsplash.com/photo-1571512599285-9ac4fdf3dba9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.35&w=144&h=144&q=80',
            location: 'Sydney',
            timeStamp: '35m',
            excerpt: "I'm looking for a new project management tool. Do you guys do demos? aldklskdlakd"
          }
        ],

        segments: [
          {
            name: 'Slipping Away',
            status: 'Default Segment',
            isVisible: true
          },
          {
            name: 'Active users',
            status: 'Created by William 2 years ago',
            isVisible: true
          },
          {
            name: 'New',
            status: 'Default Segment',
            isVisible: false
          },
          {
            name: 'Active',
            status: 'Default Segment',
            isVisible: false
          },
          {
            name: 'Callback',
            status: 'Created by William 2 years ago',
            isVisible: false
          }
        ]
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

    routes() {
      this.get('/api/messages', (schema: any) => {
        return schema.db.messages
      })
      this.get('/api/segments', (schema: any) => {
        return schema.db.segments
      })
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
