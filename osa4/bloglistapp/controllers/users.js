const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  // Check that password exists and is long enough
  if (!password || (password.length < 3)) {
    return response.status(400).json({
      error: 'Please choose a password of length 3 or longer'
    })
  }

  // Check that a username is given and it is long enough
  if (!username || (username.length < 3)) {
    return response.status(400).json({
      error: 'Please choose a username of length 3 or longer'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  
  response.json(users)
})

module.exports = usersRouter
