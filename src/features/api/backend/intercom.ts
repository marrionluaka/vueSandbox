export default function(server: any) {
  server.config({
    seeds(server: any) {
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

    routes() {
      this.get('/api/messages', (schema: any) => {
        return schema.db.messages
      })
      this.get('/api/segments', (schema: any) => {
        return schema.db.segments
      })
    }
  })
}
