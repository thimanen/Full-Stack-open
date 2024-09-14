const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((blog) => {
    sum += blog.likes
  })

  return sum
}


const favoriteBlog = (blogs) => {
  let max = 0
  let favourite = null
  blogs.forEach((blog) => {
    if (blog.likes > max) {
      max = blog.likes
      favourite = blog
    }
  })
  return favourite.title
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

