const logger = require('./logger')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const summer = (sum, likes) => {
    return sum + likes
  }
  
  return blogs.map( blog => blog.likes ).reduce(summer, 0)
}

module.exports = {
  dummy,
  totalLikes
}