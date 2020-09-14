const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const _ = require('lodash')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('api returns the correct amount of blogs', async () => {
  const numberOfBlogs = helper.initialBlogs.length
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(numberOfBlogs)
})

test('a specific blog is among the returned blogs', async () => {
  const expectedBlog = _.sample(helper.initialBlogs)
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(expectedBlog.title)
})

test('blogs should have an id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'A new blog post for testing',
    author: 'Test Author Please Ignore',
    url: 'https://www.notarealblog.post/atall'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const expectedSize = helper.initialBlogs.length + 1
  const blogsNow = await api.get('/api/blogs')
  const titlesNow = blogsNow.body.map(b => b.title)
  
  expect(blogsNow.body).toHaveLength(expectedSize)
  expect(titlesNow).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})