const listHelper = require('../utils/list_helper')

const blogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when the list is empty equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('returns the sum of the blogs’ likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {
  
  test('when the list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  
  test('gracefully handles an empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })
  
  test('returns the blog with most likes', () => {
    const expected = blogs[2]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(expected)
  })
})

describe('mostBlogs', () => {

  test('when the list only has one blog, returns the blog’s author', () => {
    const expected = { author: listWithOneBlog[0].author, blogs: 1 }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('gracefully handles an empty list', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({ author: undefined, blogs: 0})
  })

  test('returns the author with the most blogs', () => {
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(expected)
  })
})

describe('mostLikes', () => {

  test('when list has only one blog returns the author and likes of that', () => {
    const blog = listWithOneBlog[0]
    const expected = { author: blog.author, likes: blog.likes }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('returns the author with the most likes in total', () => {
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(expected)
  })
})

describe('ldMostLikes', () => {
  test('when list has only one blog returns the author and likes of that', () => {
    const blog = listWithOneBlog[0]
    const expected = { author: blog.author, likes: blog.likes }
    const result = listHelper.ldMostLikes(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('returns the author with the most likes in total', () => {
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    const result = listHelper.ldMostLikes(blogs)
    expect(result).toEqual(expected)
  })

  test('handles an empty list', () => {
    const result = listHelper.ldMostLikes([])
    expect(result).toEqual(undefined)
  })
})