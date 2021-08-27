export const bookServiceMock = {
  getBooks: (searchTerm: string) =>
    new Promise((resolve, _) => {
      const books = [
        {
          id: 1,
          author: 'James Clear',
          title: 'Atomic Habits',
          description: 'Lorem ipsum dolor sit amet.',
          rating: 9.7,
          src: 'http://atomic-habits.com'
        },
        {
          id: 2,
          author: 'Ashlee Vance',
          title: 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future',
          description: 'Lorem ipsum dolor sit amet.',
          rating: 8.5,
          src: 'http://elon-musk.com'
        },
        {
          id: 3,
          author: 'some dude',
          title: 'Effortless: Make it Easier to Do What Matters Most',
          description: 'Lorem ipsum dolor sit amet.',
          rating: 8.1,
          src: 'http://effortless.com'
        },
        {
          id: 4,
          author: 'some other dude',
          title: 'The Wright Brothers',
          description: 'Lorem ipsum dolor sit amet.',
          rating: 9.0,
          src: 'http://the-wright-brothers.com'
        }
      ]
      const getBooks = (searchTerm: string) => {
        const search = RegExp('^(' + sanitize(searchTerm) + ')', 'i')
        const filterBooks = (item: any): boolean => item.title.match(search) || item.author.match(search)

        return filterBooks
      }

      const sanitize = (str: string): string => {
        if (!str.split('=')[1]) return ''

        if (!str.split('&')[1]) return str.split('=')[1]

        return decodeURI(str.split('&')[1].split('=')[1])
      }

      return resolve({
        count: books.length,
        next: 2,
        prev: 0,
        results: books.filter(getBooks(searchTerm))
      })
    }),

  getCategories: () =>
    new Promise((resolve, _) => {
      const categories = [
        {
          id: 1,
          name: 'genre',
          options: ['Romance']
        },
        {
          id: 2,
          name: 'author',
          options: ['Ashlee Vance']
        }
      ]
      return resolve(categories)
    })
}
