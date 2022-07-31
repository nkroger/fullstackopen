const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const _ = require('lodash')
const User = require('../models/user')

const api = supertest(app)

describe('When there are some initial users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('Users are returned as json',  async () => {
    await api 
      .get('/api/users')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('Api returns the correct amount of users', async () => {
    const numberOfUsers = helper.initialUsers.length
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(numberOfUsers)
  })

  test('A specific user is among the returned users', async () => {
    const expectedUser = _.sample(helper.initialUsers)
    const response = await api.get('/api/users')
    
    const contents = response.body.map( r => r.name )
    expect(contents).toContain(expectedUser.name)
  })

  test('Users should have an id field', async () => {
    const response = await api.get('/api/users')

    expect(response.body[0].id).toBeDefined()
  })
})

// Testi olemassaolevan käyttäjänimen lisäämiselle, huonolle salasanalle, korrektille käyttäjälle yms
// TODO test username length limit, sensible error messages as well as statuses
describe('Adding a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('should work as expected with valid data', async () => {
    // maybe not bulletproof, could add helper function that gives a nonexisting username
    const newUser = {
      name: 'New user',
      username: 'newuser123',
      password: 'areallybadpassword'
    }

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const expectedSize = helper.initialUsers.length + 1
    const usersNow = await helper.usersInDb()
    const usernamesNow = usersNow.map( u => u.username )

    expect(usersNow).toHaveLength(expectedSize)
    expect(usernamesNow).toContain(newUser.username)
  })

  test('should fail if the username is already taken', async () => {
    const existingUsername = _.sample(helper.initialUsers).username
    
    const newUser = {
      name: 'New User',
      username: existingUsername,
      password: 'notagreatpassword'
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersNow = await helper.usersInDb()
    expect(usersNow).toHaveLength(helper.initialUsers.length)
  })

  test('should fail if the password given is too short', async () => {
    const newUser = {
      username: 'newuserbob',
      name: 'My Name is BOBB',
      password: 'bb'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersNow = await helper.usersInDb()
    expect(usersNow).toHaveLength(helper.initialUsers.length)
  })
})
  
afterAll(() => {
  mongoose.connection.close()
})
