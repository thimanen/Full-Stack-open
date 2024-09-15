const logger = require('./logger')
const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  let freq = _.countBy(blogs, 'author')
  let author = _.maxBy(Object.keys(freq))
  let numOfBlogs = freq[author]

  return { author: author, blogs: numOfBlogs }
}

const mostLikes = (blogs) => {
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

