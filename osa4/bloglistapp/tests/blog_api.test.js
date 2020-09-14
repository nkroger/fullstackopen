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

afterAll(() => {
  mongoose.connection.close()
})